import prisma from '@/lib/prisma'
import { GraduationCap, BookOpen, Clock, BarChart3, Search } from 'lucide-react'

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminResultsPage() {
  const exams = await prisma.exam.findMany({
    include: {
      student: true,
      subject: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
            <p className="text-gray-500">Monitoring hasil ujian siswa secara real-time</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 flex items-center gap-2 text-sm text-gray-600">
            <BarChart3 size={18} className="text-blue-500" />
            Total Peserta: <span className="font-bold text-gray-900">{exams.length}</span>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Siswa</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Mata Pelajaran</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Nilai</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Durasi</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {exams.map((exam) => (
                  <tr key={exam.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <GraduationCap size={16} />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{exam.student.full_name}</div>
                          <div className="text-xs text-gray-500">{exam.student.class_name || 'Tanpa Kelas'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <BookOpen size={14} className="text-gray-400" />
                        {exam.subject.subject_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-lg font-bold ${exam.score >= 75 ? 'text-green-600' : 'text-red-600'}`}>
                        {exam.score}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {Math.floor(exam.duration / 60)}m {exam.duration % 60}s
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        exam.score >= 75 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {exam.score >= 75 ? 'Lulus' : 'Tidak Lulus'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-xs text-gray-500">
                      {new Date(exam.created_at).toLocaleString('id-ID', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
                {exams.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400 italic">
                      Belum ada data ujian yang masuk.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
