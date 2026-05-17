import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { CheckCircle2, XCircle, Trophy } from 'lucide-react'
import { ResultActions } from '@/components/result-actions'

export default async function ResultPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const examId = parseInt(id)

  const exam = await prisma.exam.findUnique({
    where: { id: examId },
    include: {
      student: true,
      subject: true,
    },
  })

  if (!exam) {
    notFound()
  }

  const isPassed = exam.score >= 75

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Header Section */}
        <div className={`p-8 text-center text-white ${isPassed ? 'bg-green-600' : 'bg-red-600'}`}>
          <div className="flex justify-center mb-4">
            {isPassed ? (
              <Trophy size={64} className="animate-bounce" />
            ) : (
              <XCircle size={64} />
            )}
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {isPassed ? 'Selamat, Anda Lulus!' : 'Maaf, Anda Belum Lulus'}
          </h1>
          <p className="opacity-90">Ujian {exam.subject.subject_name}</p>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-8">
          <div className="flex justify-around items-center py-6 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="text-center">
              <p className="text-gray-500 text-sm mb-1">Nilai Akhir</p>
              <p className={`text-5xl font-black ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
                {exam.score}
              </p>
            </div>
            <div className="h-12 w-px bg-gray-200" />
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-green-600 font-bold">
                <CheckCircle2 size={20} />
                <span>{exam.total_correct} Benar</span>
              </div>
              <div className="flex items-center gap-3 text-red-500 font-bold">
                <XCircle size={20} />
                <span>{exam.total_wrong} Salah</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Nama Lengkap</span>
              <span className="font-semibold text-gray-800">{exam.student.full_name}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Kelas</span>
              <span className="font-semibold text-gray-800">{exam.student.class_name || '-'}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Durasi Pengerjaan</span>
              <span className="font-semibold text-gray-800">
                {Math.floor(exam.duration / 60)} menit {exam.duration % 60} detik
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tanggal Selesai</span>
              <span className="font-semibold text-gray-800">
                {new Date(exam.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>

          <ResultActions />
        </div>
      </div>
    </main>
  )
}
