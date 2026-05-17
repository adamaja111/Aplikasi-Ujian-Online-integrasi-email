'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Clock, ChevronLeft, ChevronRight, Send, AlertCircle } from 'lucide-react'

interface Question {
  id: number
  question: string
  options: {
    a: string
    b: string
    c: string
    d: string
  }
}

interface ExamClientProps {
  questions: Question[]
  subjectName: string
  studentName: string
  subjectId: number
}

export function ExamClient({ questions, subjectName, studentName, subjectId }: ExamClientProps) {
  const router = useRouter()
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [warningCount, setWarningCount] = useState(0)

  // Load saved answers and timer
  useEffect(() => {
    const savedAnswers = localStorage.getItem(`answers_${subjectId}`)
    const savedTime = localStorage.getItem(`time_${subjectId}`)
    if (savedAnswers) setAnswers(JSON.parse(savedAnswers))
    if (savedTime) setTimeLeft(parseInt(savedTime))
  }, [subjectId])

  // Save answers and timer
  useEffect(() => {
    localStorage.setItem(`answers_${subjectId}`, JSON.stringify(answers))
  }, [answers, subjectId])

  useEffect(() => {
    localStorage.setItem(`time_${subjectId}`, timeLeft.toString())
  }, [timeLeft, subjectId])

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit()
      return
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  // Anti-cheat: Tab switch detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setWarningCount((prev) => prev + 1)
        alert('Peringatan: Dilarang meninggalkan halaman ujian!')
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // Anti-cheat: Disable copy-paste
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault()
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v')) {
        e.preventDefault()
        alert('Copy-paste dilarang!')
      }
    }
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/exam/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId,
          answers,
          duration: 1800 - timeLeft,
          warningCount,
        }),
      })

      if (res.ok) {
        const result = await res.json()
        localStorage.removeItem(`answers_${subjectId}`)
        localStorage.removeItem(`time_${subjectId}`)
        router.push(`/result/${result.examId}`)
      } else {
        alert('Gagal mengirim jawaban. Silahkan coba lagi.')
      }
    } catch (error) {
      console.error(error)
      alert('Terjadi kesalahan jaringan.')
    } finally {
      setIsSubmitting(false)
    }
  }, [answers, isSubmitting, router, subjectId, timeLeft, warningCount])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const currentQuestion = questions[currentIdx]
  const progress = ((Object.keys(answers).length / questions.length) * 100).toFixed(0)

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Soal {currentIdx + 1} dari {questions.length}
            </span>
            <div className="flex items-center gap-2 text-red-600 font-mono font-bold bg-red-50 px-4 py-2 rounded-lg border border-red-100">
              <Clock size={20} />
              {formatTime(timeLeft)}
            </div>
          </div>

          <h2 className="text-xl font-medium text-gray-800 leading-relaxed mb-8">
            {currentQuestion.question}
          </h2>

          <div className="space-y-4">
            {Object.entries(currentQuestion.options).map(([key, value]) => (
              <label
                key={key}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  answers[currentQuestion.id] === key
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  className="hidden"
                  checked={answers[currentQuestion.id] === key}
                  onChange={() => setAnswers((prev) => ({ ...prev, [currentQuestion.id]: key }))}
                />
                <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold border-2 ${
                  answers[currentQuestion.id] === key
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {key.toUpperCase()}
                </span>
                <span className="text-gray-700">{value}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <button
            onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
            className="flex items-center gap-2 px-6 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={20} /> Sebelumnya
          </button>
          
          <button
            onClick={() => {
              if (currentIdx === questions.length - 1) {
                if (confirm('Apakah Anda yakin ingin mengumpulkan ujian?')) {
                  handleSubmit()
                }
              } else {
                setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))
              }
            }}
            className={`flex items-center gap-2 px-8 py-2 rounded-lg text-white font-semibold transition-all ${
              currentIdx === questions.length - 1
                ? 'bg-green-600 hover:bg-green-700 shadow-green-100 shadow-lg'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {currentIdx === questions.length - 1 ? (
              <>Kumpulkan <Send size={18} /></>
            ) : (
              <>Selanjutnya <ChevronRight size={20} /></>
            )}
          </button>
        </div>
      </div>

      {/* Sidebar / Navigation Panel */}
      <div className="w-full md:w-80 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-8">
          <div className="mb-6">
            <h3 className="font-bold text-gray-800">{studentName}</h3>
            <p className="text-sm text-gray-500">{subjectName}</p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-xs font-medium mb-1">
              <span>Progres Pengerjaan</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-500 h-full transition-all duration-500" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <h4 className="text-sm font-semibold text-gray-700 mb-4">Navigasi Soal</h4>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-all border-2 ${
                  currentIdx === idx
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : answers[questions[idx].id]
                    ? 'border-green-500 bg-green-50 text-green-600'
                    : 'border-gray-100 bg-gray-50 text-gray-400'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-100 flex gap-3">
            <AlertCircle className="text-amber-500 shrink-0" size={20} />
            <p className="text-[10px] text-amber-700 leading-tight">
              Jawaban tersimpan otomatis. Jangan tutup tab atau browser saat ujian berlangsung.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
