import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'

const QARIS = [
  { key: '01', name: 'Abdullah Al-Juhany' },
  { key: '02', name: 'Abdul Muhsin Al-Qasim' },
  { key: '03', name: 'Abdurrahman as-Sudais' },
  { key: '04', name: 'Ibrahim Al-Dossari' },
  { key: '05', name: 'Misyari Rasyid Al-Afasi' },
  { key: '06', name: 'Yasser Al-Dosari' },
]

// ─── Toggle switch yang benar ─────────────────────────────────
function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      role="switch"
      aria-checked={value}
      className="relative inline-flex items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#2d9e72] focus:ring-offset-1"
      style={{
        width: '44px',
        height: '24px',
        background: value ? '#2d9e72' : '#d1d5db',
        flexShrink: 0,
      }}
    >
      <span
        className="inline-block rounded-full bg-white shadow-sm transition-transform duration-300"
        style={{
          width: '18px',
          height: '18px',
          transform: value ? 'translateX(23px)' : 'translateX(3px)',
        }}
      />
    </button>
  )
}

// ─── Tombol play per ayat ─────────────────────────────────────
function AyatAudioButton({ audioUrl, qari, onPlay, activeAyatRef }) {
  const audioRef = useRef(null)
  const [state, setState] = useState('idle') // idle | loading | playing

  // Stop jika ayat lain diputar
  useEffect(() => {
    const stop = () => {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0 }
      setState('idle')
    }
    activeAyatRef.current.listeners = activeAyatRef.current.listeners || []
    activeAyatRef.current.listeners.push(stop)
    return () => {
      activeAyatRef.current.listeners = (activeAyatRef.current.listeners || []).filter(l => l !== stop)
    }
  }, [])

  const handleClick = () => {
    if (state === 'playing' || state === 'loading') {
      audioRef.current?.pause()
      setState('idle')
      return
    }
    // Hentikan semua ayat lain
    ;(activeAyatRef.current.listeners || []).forEach(l => l())
    setState('loading')
    onPlay()
    if (audioRef.current) {
      audioRef.current.src = audioUrl
      audioRef.current.play().catch(() => setState('idle'))
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        onCanPlay={() => setState('playing')}
        onEnded={() => setState('idle')}
        onError={() => setState('idle')}
        preload="none"
      />
      <button
        onClick={handleClick}
        title="Putar ayat ini"
        className="flex items-center justify-center w-8 h-8 rounded-full transition-all active:scale-90 focus:outline-none focus:ring-2 focus:ring-[#2d9e72]"
        style={{
          background: state === 'idle' ? '#e8f5ee' : 'linear-gradient(135deg, #1a6b4a, #2d9e72)',
          color: state === 'idle' ? '#1a6b4a' : 'white',
        }}
      >
        {state === 'loading' ? (
          <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
          </svg>
        ) : state === 'playing' ? (
          // Pause icon
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          // Play icon
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </>
  )
}

// ─── Halaman utama ────────────────────────────────────────────
export default function SuratDetail() {
  const { id } = useParams()
  const [surah, setSurah] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showTranslation, setShowTranslation] = useState(true)
  const [fontSize, setFontSize] = useState(28)
  const [selectedQari, setSelectedQari] = useState('05')
  const [playing, setPlaying] = useState(false)
  const [audioLoading, setAudioLoading] = useState(false)
  const audioRef = useRef(null)

  // Ref bersama untuk koordinasi stop antar AyatAudioButton
  const activeAyatRef = useRef({ listeners: [] })

  useEffect(() => {
    setLoading(true)
    fetch(`https://equran.id/api/v2/surat/${id}`)
      .then(r => r.json())
      .then(data => { setSurah(data.data); setLoading(false) })
      .catch(() => setLoading(false))
    window.scrollTo(0, 0)
    setPlaying(false)
  }, [id])

  const audioUrl = surah?.audioFull?.[selectedQari]

  const togglePlay = () => {
    if (!audioRef.current) return
    if (playing) { audioRef.current.pause(); setPlaying(false) }
    else { setAudioLoading(true); audioRef.current.play() }
  }

  if (loading) return (
    <div className="flex flex-col justify-center items-center py-32 gap-3">
      <div className="w-10 h-10 rounded-full border-4 border-[#2d9e72] border-t-transparent animate-spin" />
      <p className="text-[#9ab0a0] text-sm font-semibold">Memuat surah...</p>
    </div>
  )
  if (!surah) return <div className="text-center py-20 text-[#9ab0a0]"><p>Surah tidak ditemukan</p></div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes ayatIn { from { opacity:0; transform:translateX(-12px); } to { opacity:1; transform:translateX(0); } }
        .anim-fade-up { animation: fadeUp 0.5s ease both; }
        .ayat-anim { animation: ayatIn 0.4s ease both; }
        @keyframes waveBar {
          0%,100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
        .wave-bar { animation: waveBar 0.8s ease-in-out infinite; transform-origin: bottom; }
      `}</style>

      <Link to="/quran" className="inline-flex items-center gap-2 text-[#2d9e72] font-bold text-sm mb-6 hover:gap-3 transition-all anim-fade-up">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Kembali ke Daftar Surah
      </Link>

      {/* Header */}
      <div className="rounded-2xl p-8 text-center mb-6 relative overflow-hidden anim-fade-up" style={{ background: 'linear-gradient(135deg, #0d3320, #1a6b4a)', animationDelay: '0.05s' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative">
          <div className="text-white/60 text-sm font-semibold mb-2">Surah ke-{surah.nomor}</div>
          <div className="text-white font-black text-4xl mb-1" style={{ fontFamily: "'Amiri', serif" }}>{surah.nama}</div>
          <div className="text-yellow-300 font-black text-2xl mb-2">{surah.namaLatin}</div>
          <div className="text-white/70 text-sm mb-3">"{surah.arti}"</div>
          <div className="flex items-center justify-center gap-4 text-white/60 text-xs mb-4">
            <span>📍 {surah.tempatTurun}</span><span>•</span><span>📜 {surah.jumlahAyat} Ayat</span>
          </div>

          {/* Full Surah Audio Player */}
          {audioUrl && (
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <audio
                ref={audioRef}
                src={audioUrl}
                onCanPlay={() => setAudioLoading(false)}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
                preload="none"
              />
              <button
                onClick={togglePlay}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-yellow-300 text-[#0d3320] font-bold text-sm hover:bg-yellow-200 transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                {audioLoading ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" /></svg>
                ) : playing ? (
                  <>
                    <div className="flex items-end gap-0.5 h-4">
                      {[0, 0.2, 0.1, 0.3].map((d, i) => (
                        <div key={i} className="wave-bar w-1 bg-[#0d3320] rounded-full h-4" style={{ animationDelay: `${d}s` }} />
                      ))}
                    </div>
                    Pause
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    Putar Surah
                  </>
                )}
              </button>
              <select
                value={selectedQari}
                onChange={e => {
                  setSelectedQari(e.target.value)
                  setPlaying(false)
                  if (audioRef.current) { audioRef.current.pause(); audioRef.current.load() }
                }}
                className="text-xs border border-white/20 rounded-xl px-3 py-2 text-white bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/40 backdrop-blur-sm"
              >
                {QARIS.map(q => <option key={q.key} value={q.key} className="text-black">{q.name}</option>)}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3 anim-fade-up" style={{ animationDelay: '0.15s' }}>
        {/* Ukuran font */}
        <div className="flex items-center gap-2">
          <span className="text-[#4a5568] text-sm font-semibold">Ukuran:</span>
          <button onClick={() => setFontSize(f => Math.max(18, f - 2))} className="w-8 h-8 rounded-lg bg-white border border-[#d1e5d8] text-[#1a6b4a] font-bold hover:border-[#2d9e72] transition-colors active:scale-90">−</button>
          <span className="text-sm text-[#1a3a2a] font-bold w-8 text-center">{fontSize}</span>
          <button onClick={() => setFontSize(f => Math.min(48, f + 2))} className="w-8 h-8 rounded-lg bg-white border border-[#d1e5d8] text-[#1a6b4a] font-bold hover:border-[#2d9e72] transition-colors active:scale-90">+</button>
        </div>

        {/* Toggle terjemahan — fix posisi thumb */}
        <div className="flex items-center gap-2">
          <span className="text-[#4a5568] text-sm font-semibold">Terjemahan:</span>
          <Toggle value={showTranslation} onChange={setShowTranslation} />
        </div>

        <Link to={`/tafsir/${id}`} className="px-4 py-2 rounded-xl bg-[#e8f5ee] text-[#1a6b4a] font-bold text-sm hover:bg-[#d1ede0] transition-colors active:scale-95">
          📝 Lihat Tafsir
        </Link>
      </div>

      {/* Bismillah */}
      {surah.nomor !== 1 && surah.nomor !== 9 && (
        <div className="text-center py-6 text-[#1a3a2a] text-3xl mb-4 anim-fade-up" style={{ fontFamily: "'Amiri', serif", animationDelay: '0.2s' }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </div>
      )}

      {/* Ayat */}
      <div className="space-y-4">
        {(surah.ayat || []).map((ayat, i) => {
          const ayatAudioUrl = ayat.audio?.[selectedQari]
          return (
            <div
              key={ayat.nomorAyat}
              className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8f0eb] hover:shadow-md transition-shadow ayat-anim"
              style={{ animationDelay: `${Math.min(i * 0.03, 0.5)}s` }}
            >
              {/* Baris atas: nomor ayat + (opsional: nama surah:ayat) + tombol audio */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {/* Nomor */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9e72)' }}
                  >
                    {ayat.nomorAyat}
                  </div>

                  {/* Tombol play per ayat */}
                  {ayatAudioUrl && (
                    <AyatAudioButton
                      audioUrl={ayatAudioUrl}
                      qari={selectedQari}
                      onPlay={() => {}}
                      activeAyatRef={activeAyatRef}
                    />
                  )}
                </div>

                <div className="text-xs text-[#9ab0a0] font-semibold">{surah.namaLatin} : {ayat.nomorAyat}</div>
              </div>

              {/* Teks Arab */}
              <p
                className="text-right text-[#1a3a2a] leading-loose mb-4"
                style={{ fontFamily: "'Amiri', serif", fontSize: `${fontSize}px`, direction: 'rtl' }}
              >
                {ayat.teksArab}
              </p>

              {/* Latin */}
              <p className="text-[#6b8c7a] text-sm italic mb-3 leading-relaxed">{ayat.teksLatin}</p>

              {/* Terjemahan */}
              {showTranslation && (
                <p className="text-[#4a5568] text-sm leading-relaxed border-t border-[#e8f0eb] pt-3">{ayat.teksIndonesia}</p>
              )}
            </div>
          )
        })}
      </div>

      {/* Navigasi Surah */}
      <div className="flex items-center justify-between mt-10">
        {surah.suratSebelumnya ? (
          <Link to={`/quran/${surah.suratSebelumnya.nomor}`} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#d1e5d8] text-[#1a6b4a] font-bold text-sm hover:border-[#2d9e72] transition-all hover:-translate-x-1 active:scale-95">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            {surah.suratSebelumnya.namaLatin}
          </Link>
        ) : <div />}
        {surah.suratSelanjutnya && (
          <Link to={`/quran/${surah.suratSelanjutnya.nomor}`} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1a6b4a] text-white font-bold text-sm hover:bg-[#0d3320] transition-all hover:translate-x-1 active:scale-95">
            {surah.suratSelanjutnya.namaLatin}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        )}
      </div>
    </div>
  )
}