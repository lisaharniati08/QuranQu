import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function Tafsir() {
  const { id } = useParams()
  const [tafsir, setTafsir] = useState(null)
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`https://equran.id/api/v2/tafsir/${id}`)
      .then(r => r.json())
      .then(data => {
        setTafsir(data.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
    window.scrollTo(0, 0)
  }, [id])

  if (loading) return (
    <div className="flex justify-center items-center py-32">
      <div className="w-10 h-10 rounded-full border-4 border-[#2d9e72] border-t-transparent animate-spin" />
    </div>
  )

  if (!tafsir) return (
    <div className="text-center py-20 text-[#9ab0a0]"><p>Tafsir tidak ditemukan</p></div>
  )

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link to={`/quran/${id}`} className="inline-flex items-center gap-2 text-[#2d9e72] font-700 text-sm mb-6 hover:gap-3 transition-all">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Kembali ke Surah
      </Link>

      {/* Header */}
      <div className="rounded-2xl p-6 mb-8" style={{ background: 'linear-gradient(135deg, #4a1a6b, #8a4dbf)' }}>
        <div className="text-white/60 text-sm font-600 mb-1">Tafsir Surah ke-{tafsir.nomor}</div>
        <div className="text-yellow-300 font-900 text-2xl mb-1">{tafsir.namaLatin}</div>
        <div className="text-white/70 text-sm">"{tafsir.arti}" — {tafsir.jumlahAyat} Ayat</div>
      </div>

      {/* Tafsir Ayat */}
      <div className="space-y-3">
        {(tafsir.tafsir || []).map(t => (
          <div key={t.ayat} className="bg-white rounded-2xl border border-[#e8f0eb] overflow-hidden shadow-sm">
            <button
              onClick={() => setExpanded(expanded === t.ayat ? null : t.ayat)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#f8fffe] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-700 text-xs" style={{ background: 'linear-gradient(135deg, #4a1a6b, #8a4dbf)' }}>
                  {t.ayat}
                </div>
                <span className="text-[#1a3a2a] font-700 text-sm">Ayat {t.ayat}</span>
              </div>
              <svg
                className={`w-5 h-5 text-[#9ab0a0] transition-transform ${expanded === t.ayat ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expanded === t.ayat && (
              <div className="px-5 pb-5 border-t border-[#e8f0eb]">
                <p className="text-[#4a5568] text-sm leading-relaxed pt-4">{t.teks}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}