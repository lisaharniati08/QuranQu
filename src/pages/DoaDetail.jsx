import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

// ============================================================ 
// 🖼️  GANTI URL DI BAWAH INI DENGAN LINK GAMBAR ANDA
// ============================================================
const HAND_IMAGE_URL = '../public/pray.png' 
// ============================================================

const MAX_DOA_ID = 228

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
    judul:   raw.judul   || raw.nama  || '',
    arab:    raw.arab    || raw.ar    || '',
    latin:   raw.latin   || raw.tr    || '',
    artinya: raw.artinya || raw.idn   || raw.terjemahan || raw.arti || '',
    grup:    raw.grup    || '',
    tentang: raw.tentang || '',
  }
}

const FALLBACK_DOAS = [
  { id: 1, nama: "Do'a Sebelum Tidur", ar: "بِسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", tr: "Bismika allahumma amuutu wa ahya", idn: "Dengan menyebut nama-Mu ya Allah, aku mati dan hidup" },
  { id: 2, nama: "Do'a Bangun Tidur", ar: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ", tr: "Alhamdulillahil ladzi ahyaana ba'da maa amaatanaa wa ilayhinnusyuur", idn: "Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami dan kepada-Nya kami akan dibangkitkan" },
  { id: 3, nama: "Do'a Masuk Rumah", ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلِجِ وَخَيْرَ الْمَخْرَجِ", tr: "Allahumma innii as-aluka khayral mauliji wa khayral makhraji", idn: "Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikan tempat masuk dan kebaikan tempat keluar" },
  { id: 4, nama: "Do'a Keluar Rumah", ar: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", tr: "Bismillahi tawakkaltu 'alallahi wa laa hawla wa laa quwwata illaa billaah", idn: "Dengan nama Allah, aku bertawakkal kepada Allah, tidak ada daya dan upaya kecuali dengan pertolongan Allah" },
  { id: 5, nama: "Do'a Sebelum Makan", ar: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ", tr: "Allahumma baarik lanaa fiimaa razaqtanaa waqinaa 'adzaabannaar", idn: "Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka" },
  { id: 6, nama: "Do'a Sesudah Makan", ar: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ", tr: "Alhamdulillahil ladzii ath'amanaa wa saqaanaa wa ja'alanaa muslimiin", idn: "Segala puji bagi Allah yang telah memberi kami makan dan minum serta menjadikan kami muslim" },
  { id: 7, nama: "Do'a Masuk Masjid", ar: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ", tr: "Allahummaf-tahli abwaaba rahmatik", idn: "Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu" },
  { id: 8, nama: "Do'a Keluar Masjid", ar: "اللَّهُمَّ إِنِّي أَسْ�َالُكَ مِنْ فَضْلِكَ", tr: "Allahumma innii as-aluka min fadlik", idn: "Ya Allah, sesungguhnya aku memohon kepada-Mu sebagian dari karunia-Mu" },
]

export default function DoaDetail() {
  const { id } = useParams()
  const [doa, setDoa] = useState(null)
  const [loading, setLoading] = useState(true)

  // warna header konsisten berdasarkan id
  const colorIndex = ((Number(id) - 1) % COLORS.length)
  const headerBg = COLORS[colorIndex]

  useEffect(() => {
    setLoading(true)
    setDoa(null)
    const tryFetch = async () => {
      const endpoints = [
        `https://equran.id/api/v2/doa/${id}`,
        `https://equran.id/api/doa/${id}`,
      ]
      for (const url of endpoints) {
        try {
          const res = await fetch(url)
          const data = await res.json()
          const item = data.data || (Array.isArray(data) ? data[0] : data)
          if (item && (item.ar || item.arab || item.judul || item.nama)) {
            setDoa(normalizeDoa(item))
            setLoading(false)
            return
          }
        } catch (_) {}
      }
      const fb = FALLBACK_DOAS.find(d => String(d.id) === String(id))
      setDoa(fb ? normalizeDoa(fb) : null)
      setLoading(false)
    }
    tryFetch()
    window.scrollTo(0, 0)
  }, [id])

  const currentId = Number(id)

  if (loading) return (
    <div className="flex flex-col justify-center items-center py-32 gap-3">
      <div className="w-10 h-10 rounded-full border-4 border-[#2d9e72] border-t-transparent animate-spin" />
      <p className="text-[#9ab0a0] text-sm font-semibold">Memuat do'a...</p>
    </div>
  )

  if (!doa) return (
    <div className="text-center py-20 text-[#9ab0a0]">
      <HandIcon style={{ fontSize: '3rem' }} className="block mx-auto mb-4 w-12 h-12" />
      <p>Do'a tidak ditemukan</p>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .anim-fade-up { animation: fadeUp 0.5s ease both; }
      `}</style>

      {/* Tombol kembali */}
      <Link
        to="/doa"
        className="inline-flex items-center gap-2 text-[#2d9e72] font-bold text-sm mb-6 hover:gap-3 transition-all anim-fade-up"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Kembali ke Daftar Do'a
      </Link>

      {/* ── Satu card menyatu: header + konten ── */}
      <div
        className="rounded-2xl overflow-hidden shadow-md anim-fade-up"
        style={{ animationDelay: '0.05s' }}
      >
        {/* Header gradient */}
        <div className="relative" style={{ background: headerBg }}>
          {/* Icon dekoratif */}
          <HandIcon
            className="absolute right-5 top-1/2 -translate-y-1/2 w-16 h-16 opacity-10 pointer-events-none"
            style={{ fontSize: '4rem' }}
          />

          <div className="px-6 pt-6 pb-12 relative">
            <div className="text-white/60 text-xs font-semibold mb-1">
              Do'a #{doa.id}{doa.grup ? ` · ${doa.grup}` : ''}
            </div>
            <h1 className="text-white font-black text-2xl leading-snug">{doa.judul}</h1>
          </div>

          {/* Wave yang menyambung ke bagian putih di bawahnya */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ height: '36px' }}>
            <svg viewBox="0 0 500 36" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path
                d="M0,36 L0,20 C20,20 30,8 50,8 C70,8 80,18 100,16 C120,14 130,4 155,4 C180,4 190,16 210,14 C230,12 240,2 265,2 C290,2 300,14 320,12 C340,10 350,0 375,0 C400,0 410,12 430,10 C450,8 460,20 480,18 C495,17 498,20 500,20 L500,36 Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        {/* Konten — background putih, langsung nyambung dari wave */}
        <div className="bg-white px-6 pb-6 space-y-5">
          {/* Arab */}
          <div>
            <div className="text-[#9ab0a0] text-[10px] font-bold uppercase tracking-widest mb-2">Arab</div>
            <p
              className="text-right text-[#1a3a2a] text-3xl leading-loose"
              style={{ fontFamily: "'Amiri', serif", direction: 'rtl' }}
            >
              {doa.arab}
            </p>
          </div>

          <div className="border-t border-[#e8f0eb]" />

          {/* Latin */}
          <div>
            <div className="text-[#9ab0a0] text-[10px] font-bold uppercase tracking-widest mb-2">Latin</div>
            <p className="text-[#6b8c7a] text-base italic leading-relaxed">{doa.latin}</p>
          </div>

          <div className="border-t border-[#e8f0eb]" />

          {/* Artinya */}
          <div>
            <div className="text-[#9ab0a0] text-[10px] font-bold uppercase tracking-widest mb-2">Artinya</div>
            <p className="text-[#4a5568] text-base leading-relaxed">{doa.artinya}</p>
          </div>

          {/* Sumber — hanya jika ada */}
          {doa.tentang && (
            <>
              <div className="border-t border-[#e8f0eb]" />
              <div>
                <div className="text-[#9ab0a0] text-[10px] font-bold uppercase tracking-widest mb-2">Sumber</div>
                <p className="text-[#9ab0a0] text-xs leading-relaxed whitespace-pre-line">{doa.tentang}</p>
              </div>
            </>
          )}
        </div>
      </div>
      {/* ── End single card ── */}

      {/* Navigasi Prev / Next */}
      <div
        className="flex items-center justify-between mt-6 anim-fade-up"
        style={{ animationDelay: '0.15s' }}
      >
        {currentId > 1 ? (
          <Link
            to={`/doa/${currentId - 1}`}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#d1e5d8] text-[#1a6b4a] font-bold text-sm hover:border-[#2d9e72] transition-all hover:-translate-x-1 active:scale-95 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Sebelumnya
          </Link>
        ) : (
          <div />
        )}

        {currentId < MAX_DOA_ID && (
          <Link
            to={`/doa/${currentId + 1}`}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1a6b4a] text-white font-bold text-sm hover:bg-[#0d3320] transition-all hover:translate-x-1 active:scale-95 shadow-sm ml-auto"
          >
            Selanjutnya
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  )
}
