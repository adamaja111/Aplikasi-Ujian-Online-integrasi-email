import prisma from '@/lib/prisma'
import { LandingForm } from '@/components/landing-form'

export const dynamic = 'force-dynamic'

export default async function Home() {
  let subjects: { id: number; subject_name: string }[] = []
  try {
    subjects = await prisma.subject.findMany()
  } catch (error) {
    console.error('Database fetch error:', error)
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-blue-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-900 tracking-tight">Ujian Sekolah Online</h1>
          <p className="mt-2 text-blue-600">Selamat datang! Silahkan isi data diri untuk memulai ujian.</p>
        </div>
        
        <LandingForm subjects={subjects} />

        <div className="pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Sistem Ujian Sekolah Berbasis Web
        </div>
      </div>
    </main>
  )
}
