'use client'

import Link from 'next/link'
import { Home, Printer } from 'lucide-react'

export function ResultActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-4">
      <Link 
        href="/"
        className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 rounded-xl transition-all"
      >
        <Home size={20} /> Kembali ke Beranda
      </Link>
      <button 
        onClick={() => window.print()}
        className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-xl transition-all"
      >
        <Printer size={20} /> Cetak Hasil
      </button>
    </div>
  )
}
