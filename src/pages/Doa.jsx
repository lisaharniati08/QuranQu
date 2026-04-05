import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ============================================================
// 🖼️  GANTI URL DI BAWAH INI DENGAN LINK GAMBAR ANDA
// ============================================================
const HAND_IMAGE_URL = '../public/pray.png'
// ============================================================

const COLORS = [
  'linear-gradient(135deg, #1a6b4a, #2d9e72)',
  'linear-gradient(135deg, #1a4b6b, #2d72a0)',
  'linear-gradient(135deg, #6b3a1a, #c2703b)',
  'linear-gradient(135deg, #4a1a6b, #8a4dbf)',
  'linear-gradient(135deg, #6b1a1a, #c24040)',
  'linear-gradient(135deg, #1a5a6b, #2dabb0)',
]

function HandIcon({ className = '', style = {} }) {
  if (HAND_IMAGE_URL) {
    return <img src={HAND_IMAGE_URL} alt="doa" className={className} style={{ objectFit: 'contain', ...style }} />
  }
  return <span className={className} style={style}>🤲</span>
}

function normalizeDoa(raw) {
  return {
    id:      raw.id,
    judul:   raw.judul || raw.nama || '',
    arab:    raw.arab  || raw.ar   || '',
    latin:   raw.latin || raw.tr   || '',
    artinya: raw.artinya || raw.idn || raw.terjemahan || raw.arti || '',
    grup:    raw.grup  || '',
  }
}

function DoaCard({ doa, index }) {
  const bg = COLORS[index % COLORS.length]
  return (
    <Link
      to={`/doa/${doa.id}`}
      className="group block focus:outline-none focus:ring-2 focus:ring-[#2d9e72] focus:ring-offset-1 rounded-2xl"
      style={{
        animation: 'staggerIn 0.35s ease both',
        animationDelay: `${Math.min(index * 0.025, 0.5)}s`,
      }}
    >
      <div
        className="h-full rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: bg,
          height: '88px',           /* tinggi tetap — semua card sama */
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.15)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = ''
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'
        }}
      >
        <div className="flex items-center gap-3 px-4 h-full">
          {/* Nomor bulat */}
          <div
            className="flex-shrink-0 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-xs"
          >
            {doa.id}
          </div>

          {/* Judul — 2 baris max, teks terpotong rapi */}
          <span
            className="flex-1 text-white font-bold text-sm leading-snug"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {doa.judul}
          </span>

          {/* Icon kanan */}
          <HandIcon
            className="flex-shrink-0 w-7 h-7 opacity-70 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-200"
            style={{ fontSize: '1.4rem' }}
          />
        </div>
      </div>
    </Link>
  )
}

export default function Doa() {
  const [doas, setDoas] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const tryFetch = async () => {
      const endpoints = [
        'https://equran.id/api/v2/doa',
        'https://equran.id/api/doa',
      ]
      for (const url of endpoints) {
        try {
          const res = await fetch(url)
          const data = await res.json()
          const list = Array.isArray(data) ? data : (data.data || [])
          if (list.length > 0) {
            setDoas(list.map(normalizeDoa))
            setLoading(false)
            return
          }
        } catch (_) {}
      }
      setDoas(FALLBACK_DOAS.map(normalizeDoa))
      setLoading(false)
    }
    tryFetch()
  }, [])

  const filtered = doas.filter(d =>
    d.judul.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <style>{`
        @keyframes fadeUp    { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes staggerIn { from { opacity:0; transform:translateY(12px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
        .anim-fade-up { animation: fadeUp 0.5s ease both; }
      `}</style>

      {/* Heading */}
      <div className="mb-8 anim-fade-up">
        <h1 className="text-3xl font-black text-[#1a3a2a] mb-1">Do'a Harian</h1>
        <div className="w-12 h-1 rounded-full bg-[#2d9e72] mb-3" />
        <p className="text-[#4a5568]">Kumpulan do'a sehari-hari sesuai sunnah Rasulullah ﷺ</p>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Cari do'a..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full max-w-md px-4 py-3 rounded-xl border border-[#d1e5d8] bg-white text-[#1a3a2a] placeholder-[#9ab0a0] focus:outline-none focus:ring-2 focus:ring-[#2d9e72] text-sm mb-8 anim-fade-up transition-shadow"
        style={{ animationDelay: '0.1s' }}
      />

      {/* Loading */}
      {loading && (
        <div className="flex flex-col justify-center items-center py-24 gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-[#2d9e72] border-t-transparent animate-spin" />
          <p className="text-[#9ab0a0] text-sm font-semibold">Memuat do'a...</p>
        </div>
      )}

      {/* Grid card */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map((doa, i) => (
            <DoaCard key={doa.id} doa={doa} index={i} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-20 text-[#9ab0a0] anim-fade-up">
          <HandIcon className="mb-4 block mx-auto w-14 h-14" style={{ fontSize: '3.5rem' }} />
          <p className="font-semibold">Do'a tidak ditemukan</p>
        </div>
      )}
    </div>
  )
}

const FALLBACK_DOAS = [
  { id: 1, nama: "Do'a Sebelum Tidur", ar: "بِسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", tr: "Bismika allahumma amuutu wa ahya", idn: "Dengan menyebut nama-Mu ya Allah, aku mati dan hidup" },
  { id: 2, nama: "Do'a Bangun Tidur", ar: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ", tr: "Alhamdulillahil ladzi ahyaana ba'da maa amaatanaa wa ilayhinnusyuur", idn: "Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami dan kepada-Nya kami akan dibangkitkan" },
  { id: 3, nama: "Do'a Masuk Rumah", ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلِجِ وَخَيْرَ الْمَخْرَجِ", tr: "Allahumma innii as-aluka khayral mauliji wa khayral makhraji", idn: "Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikan tempat masuk dan kebaikan tempat keluar" },
  { id: 4, nama: "Do'a Keluar Rumah", ar: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", tr: "Bismillahi tawakkaltu 'alallahi wa laa hawla wa laa quwwata illaa billaah", idn: "Dengan nama Allah, aku bertawakkal kepada Allah, tidak ada daya dan upaya kecuali dengan pertolongan Allah" },
  { id: 5, nama: "Do'a Sebelum Makan", ar: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ", tr: "Allahumma baarik lanaa fiimaa razaqtanaa waqinaa 'adzaabannaar", idn: "Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka" },
  { id: 6, nama: "Do'a Sesudah Makan", ar: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ", tr: "Alhamdulillahil ladzii ath'amanaa wa saqaanaa wa ja'alanaa muslimiin", idn: "Segala puji bagi Allah yang telah memberi kami makan dan minum serta menjadikan kami muslim" },
  { id: 7, nama: "Do'a Masuk Masjid", ar: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ", tr: "Allahummaf-tahli abwaaba rahmatik", idn: "Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu" },
  { id: 8, nama: "Do'a Keluar Masjid", ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ", tr: "Allahumma innii as-aluka min fadlik", idn: "Ya Allah, sesungguhnya aku memohon kepada-Mu sebagian dari karunia-Mu" },
]