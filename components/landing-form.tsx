'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next'
import { User, BookOpen, GraduationCap } from 'lucide-react'

const formSchema = z.object({
  fullName: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
  className: z.string().optional(),
  subjectId: z.string().min(1, 'Pilih mata pelajaran'),
})

type FormData = z.infer<typeof formSchema>

export function LandingForm() {
  const router = useRouter()
  const [subjects, setSubjects] = useState<{ id: number; subject_name: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/subjects')
      .then(res => res.json())
      .then(data => {
        setSubjects(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to load subjects:", err)
        setLoading(false)
      })
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    setCookie('student_name', data.fullName)
    setCookie('student_class', data.className || '')
    setCookie('exam_subject_id', data.subjectId)
    router.push(`/exam/${data.subjectId}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <User size={16} className="text-blue-500" /> Nama Lengkap
        </label>
        <input
          {...register('fullName')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          placeholder="Masukkan nama lengkap"
        />
        {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <GraduationCap size={16} className="text-blue-500" /> Kelas (Opsional)
        </label>
        <input
          {...register('className')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          placeholder="Contoh: XII TKJ 1"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <BookOpen size={16} className="text-blue-500" /> Mata Pelajaran
        </label>
        <select
          {...register('subjectId')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white"
        >
          <option value="">{loading ? 'Memuat mata pelajaran...' : 'Pilih Mata Pelajaran'}</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id.toString()}>
              {s.subject_name}
            </option>
          ))}
        </select>
        {errors.subjectId && <p className="text-red-500 text-xs">{errors.subjectId.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all disabled:opacity-50"
      >
        {isSubmitting ? 'Memproses...' : 'Mulai Ujian'}
      </button>
    </form>
  )
}
