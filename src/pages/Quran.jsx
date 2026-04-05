import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import MountainCard from '../components/MountainCard'

const QARIS = [
  { key: '01', name: 'Abdullah Al-Juhany' },
  { key: '02', name: 'Abdul Muhsin Al-Qasim' },
  { key: '03', name: 'Abdurrahman as-Sudais' },
  { key: '04', name: 'Ibrahim Al-Dossari' },
  { key: '05', name: 'Misyari Rasyid Al-Afasi' },
  { key: '06', name: 'Yasser Al-Dosari' },
]

// ─── Mapping nilai API → filter key ──────────────────────────────────────────
// API mengembalikan: "Mekah" atau "Madinah"
const TEMPAT_MAP = {
  makkiyah: 'Mekah',
  madaniyah: 'Madinah',
}
// ─────────────────────────────────────────────────────────────────────────────

function AudioPlayer({ audioFull }) {
  const [selectedQari, setSelectedQari] = useState('05')
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const audioRef = useRef(null)

  const audioUrl = audioFull?.[selectedQari]

  const togglePlay = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      setLoading(true)
      audioRef.current.play()
    }
  }

  const handleQariChange = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedQari(e.target.value)
    setPlaying(false)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.load()
    }
  }

  return (
    <div className="mt-3 flex items-center gap-2 flex-wrap" onClick={e => e.preventDefault()}>
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onCanPlay={() => setLoading(false)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          preload="none"
        />
      )}
      <button
        onClick={togglePlay}
        disabled={!audioUrl}
        className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-90 disabled:opacity-40 shadow-md"
        style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9e72)' }}
      >
        {loading ? (
          <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
          </svg>
        ) : playing ? (
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" rx="1"/>
            <rect x="14" y="4" width="4" height="16" rx="1"/>
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>
      <select
        value={selectedQari}
        onChange={handleQariChange}
        onClick={e => e.stopPropagation()}
        className="text-xs border border-[#d1e5d8] rounded-lg px-2 py-1 text-[#1a3a2a] bg-white focus:outline-none focus:ring-1 focus:ring-[#2d9e72] max-w-[130px] truncate"
      >
        {QARIS.map(q => <option key={q.key} value={q.key}>{q.name}</option>)}
      </select>
    </div>
  )
}

export default function Quran() {
  const [surahs, setSurahs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetch('https://equran.id/api/v2/surat')
      .then(r => r.json())
      .then(data => { setSurahs(data.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = surahs.filter(s => {
    const matchSearch =
      s.namaLatin.toLowerCase().includes(search.toLowerCase()) ||
      s.nama.includes(search) ||
      String(s.nomor).includes(search)

    // ← Fix: bandingkan dengan nilai asli dari API ("Mekah"/"Madinah")
    const matchFilter =
      filter === 'all' ||
      s.tempatTurun === TEMPAT_MAP[filter]

    return matchSearch && matchFilter
  })

  const cardBg = (nomor) => {
    if (nomor <= 28) return 'linear-gradient(135deg, #1a6b4a, #2d9e72)'
    if (nomor <= 56) return 'linear-gradient(135deg, #1a4b6b, #2d72a0)'
    if (nomor <= 85) return 'linear-gradient(135deg, #6b3a1a, #c2703b)'
    return 'linear-gradient(135deg, #4a1a6b, #8a4dbf)'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes staggerIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .anim-fade-up { animation: fadeUp 0.5s ease both; }
        .card-stagger { animation: staggerIn 0.45s ease both; }
        .card-hover { transition: transform 0.28s ease, box-shadow 0.28s ease; }
        .card-hover:hover { transform: translateY(-5px); box-shadow: 0 16px 36px rgba(0,0,0,0.13); }
      `}</style>

      <div className="mb-8 anim-fade-up">
        <h1 className="text-3xl font-black text-[#1a3a2a] mb-1">Al-Quran Al-Karim</h1>
        <div className="w-12 h-1 rounded-full bg-[#2d9e72] mb-3" />
        <p className="text-[#4a5568]">114 Surah — Lengkap dengan audio murottal</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8 anim-fade-up" style={{ animationDelay: '0.1s' }}>
        <input
          type="text"
          placeholder="Cari surah..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border border-[#d1e5d8] bg-white text-[#1a3a2a] placeholder-[#9ab0a0] focus:outline-none focus:ring-2 focus:ring-[#2d9e72] text-sm transition-shadow"
        />
        <div className="flex gap-2">
          {[
            { key: 'all', label: 'Semua' },
            { key: 'makkiyah', label: 'Makkiyah' },
            { key: 'madaniyah', label: 'Madaniyah' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
                filter === f.key
                  ? 'bg-[#1a6b4a] text-white shadow-md'
                  : 'bg-white border border-[#d1e5d8] text-[#4a5568] hover:border-[#2d9e72]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex flex-col justify-center items-center py-24 gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-[#2d9e72] border-t-transparent animate-spin" />
          <p className="text-[#9ab0a0] text-sm font-semibold">Memuat surah...</p>
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((surah, i) => (
            <div
              key={surah.nomor}
              className="card-stagger card-hover"
              style={{ animationDelay: `${Math.min(i * 0.04, 0.6)}s` }}
            >
              <MountainCard
                headerBg={cardBg(surah.nomor)}
                headerContent={
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-white/60 text-xs font-semibold mb-1">Surah ke-{surah.nomor}</div>
                      <div className="text-white font-black text-lg leading-tight">{surah.namaLatin}</div>
                      <div className="text-white/70 text-xs mt-1">{surah.arti}</div>
                    </div>
                    <div className="text-white font-bold text-2xl" style={{ fontFamily: "'Amiri', serif" }}>{surah.nama}</div>
                  </div>
                }
              >
                <div className="flex items-center justify-between text-xs text-[#4a5568] font-semibold pt-1 mb-1">
                  <span className="flex items-center gap-1">
                    <span className="text-[#2d9e72]">📍</span>
                    {surah.tempatTurun}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-[#2d9e72]">📜</span>
                    {surah.jumlahAyat} Ayat
                  </span>
                </div>

                <AudioPlayer audioFull={surah.audioFull} surahNomor={surah.nomor} />

                <Link
                  to={`/quran/${surah.nomor}`}
                  className="mt-3 flex items-center justify-center gap-1 w-full py-2 rounded-xl bg-[#e8f5ee] text-[#1a6b4a] text-xs font-bold hover:bg-[#d1ede0] transition-colors active:scale-95"
                >
                  Baca Surah
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </MountainCard>
            </div>
          ))}
        </div>
      )}

      {!loading &&filtered.length === 0 && (
        <div className="text-center py-20 text-[#9ab0a0] anim-fade-up">
          <p className="text-5xl mb-4">🔍</p>
          <p className="font-semibold">Surah tidak ditemukan</p>
        </div>
      )}
    </div>
  )
}