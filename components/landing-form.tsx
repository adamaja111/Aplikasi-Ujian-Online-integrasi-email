'use client'

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

interface LandingFormProps {
  subjects: { id: number; subject_name: string }[]
}

export function LandingForm({ subjects }: LandingFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    // Save student info in cookies for "session"
    setCookie('student_name', data.fullName)
    setCookie('student_class', data.className || '')
    setCookie('exam_subject_id', data.subjectId)
    
    // Redirect to exam page
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          placeholder="Masukkan nama lengkap"
        />
        {errors.fullName && (
          <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <GraduationCap size={16} className="text-blue-500" /> Kelas (Opsional)
        </label>
        <input
          {...register('className')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          placeholder="Contoh: XII TKJ 1"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <BookOpen size={16} className="text-blue-500" /> Mata Pelajaran
        </label>
        <select
          {...register('subjectId')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
        >
          <option value="">Pilih Mata Pelajaran</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id.toString()}>
              {s.subject_name}
            </option>
          ))}
        </select>
        {errors.subjectId && (
          <p className="text-red-500 text-xs mt-1">{errors.subjectId.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Memproses...' : 'Mulai Ujian'}
      </button>
    </form>
  )
}
