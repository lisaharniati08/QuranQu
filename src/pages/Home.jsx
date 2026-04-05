import { Link } from 'react-router-dom'
import MountainCard from '../components/MountainCard'

// ─── Hero image ───────────────────────────────────────────────────────────────
const USE_HERO_IMAGE = true
const HERO_IMAGE = '/home.png'

// ─── Feature Cards ────────────────────────────────────────────────────────────
// image: isi path gambar kamu misal '/assets/quran.jpg'
// jika image: null, emoji akan tampil sebagai fallback
const featureCards = [
  {
    emoji: '📖',
    image: '../public/logo.png',
    title: 'Al-Quran',
    desc: '114 Surah lengkap beserta terjemahan Bahasa Indonesia',
    link: '/quran',
    bg: 'linear-gradient(135deg, #1a6b4a, #2d9e72)',
    count: '114 Surah',
  },
  {
    emoji: '🤲',
    image: '../public/doa.png',
    title: "Do'a Harian",
    desc: "Kumpulan do'a sehari-hari sesuai Sunnah Rasulullah SAW",
    link: '/doa',
    bg: 'linear-gradient(135deg, #1a4b6b, #2d72a0)',
    count: "60+ Do'a",
  },
  {
    emoji: '🕌',
    image: '../public/sholat.png',
    title: 'Jadwal Shalat',
    desc: 'Jadwal waktu shalat akurat berdasarkan lokasi Anda',
    link: '/jadwal-shalat',
    bg: 'linear-gradient(135deg, #6b3a1a, #c2703b)',
    count: '5 Waktu',
  },
  {
    emoji: '📝',
    image: '../public/tafsir.png',
    title: 'Tafsir',
    desc: 'Tafsir Al-Quran lengkap dari para ulama terpercaya',
    link: '/quran',
    bg: 'linear-gradient(135deg, #4a1a6b, #8a4dbf)',
    count: '114 Tafsir',
  },
]

const stats = [
  { label: 'Surah', value: '114' },
  { label: 'Ayat', value: '6.236' },
  { label: 'Juz', value: '30' },
  { label: 'Halaman', value: '604' },
]

const footerLinks = {
  Navigasi: [
    { label: 'Beranda', href: '/' },
    { label: 'Al-Quran', href: '/quran' },
    { label: "Do'a Harian", href: '/doa' },
    { label: 'Jadwal Shalat', href: '/jadwal-shalat' },
  ],
  Fitur: [
    { label: 'Tafsir Quran', href: '/quran' },
    { label: 'Audio Murottal', href: '/quran' },
    { label: 'Terjemahan', href: '/quran' },
    { label: 'Jadwal Shalat', href: '/jadwal-shalat' },
  ],
}

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/lishaa08_?igsh=MWI3a21nYnBqbXF6dQ==',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: 'Twitter/X',
    href: 'https://twitter.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@lisaharniati5407?si=TX6q4C86ZwTE53I5',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/6287893540328',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
]

// ─── MountainCard versi image-cover (inline, tidak perlu ubah MountainCard.jsx) ──
// Kita buat wrapper khusus untuk feature card bergambar penuh
function FeatureMountainCard({ card, children }) {
  const hasImage = Boolean(card.image)

  return (
    <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white card-hover">
      {/* Header */}
      <div className="relative" style={!hasImage ? { background: card.bg } : {}}>

        {/* Gambar cover penuh */}
        {hasImage ? (
          <>
            <img
              src={card.image}
              alt={card.title}
              className="w-full object-cover"
              style={{ height: '180px', display: 'block' }}
            />
            {/* Gradient overlay bawah agar teks terbaca */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }}
            />
          </>
        ) : (
          /* Mode warna gradient */
          <div className="px-5 pt-5 pb-10" />
        )}

        {/* Konten teks di atas header */}
        <div
          className={`${hasImage ? 'absolute inset-0 flex flex-col justify-end px-5' : 'absolute inset-0 flex flex-col justify-start px-5 pt-5'}`}
          style={hasImage ? { paddingBottom: '36px' } : { paddingBottom: '36px' }}
        >
          {!hasImage && (
            <div className="text-4xl mb-2 transition-transform group-hover:scale-110 group-hover:-rotate-6 inline-block">
              {card.emoji}
            </div>
          )}
          <div className="text-white font-black text-lg leading-snug">{card.title}</div>
          <div className="text-white/70 text-xs font-semibold mt-0.5">{card.count}</div>
        </div>

        {/* Mountain SVG divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" style={{ height: '36px' }}>
          <svg viewBox="0 0 500 36" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M0,36 L0,20 C20,20 30,8 50,8 C70,8 80,18 100,16 C120,14 130,4 155,4 C180,4 190,16 210,14 C230,12 240,2 265,2 C290,2 300,14 320,12 C340,10 350,0 375,0 C400,0 410,12 430,10 C450,8 460,20 480,18 C495,17 498,20 500,20 L500,36 Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 pb-5 pt-2">
        {children}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(45,158,114,0.4); }
          70% { box-shadow: 0 0 0 14px rgba(45,158,114,0); }
          100% { box-shadow: 0 0 0 0 rgba(45,158,114,0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .anim-fade-up { animation: fadeUp 0.6s ease both; }
        .anim-fade-in { animation: fadeIn 0.8s ease both; }
        .anim-float { animation: floatY 3.5s ease-in-out infinite; }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }
        .stat-pulse:hover { animation: pulse-ring 1s ease; }
        .shimmer-btn {
          background: linear-gradient(90deg, #fde047 0%, #fff9c4 40%, #fde047 60%, #fbbf24 100%);
          background-size: 200% auto;
          animation: shimmer 2.5s linear infinite;
        }
        .footer-link { transition: color 0.2s, padding-left 0.2s; }
        .footer-link:hover { color: #2d9e72; padding-left: 4px; }
        .social-btn { transition: transform 0.2s, background 0.2s; }
        .social-btn:hover { transform: translateY(-3px); background: rgba(45,158,114,0.2); }
      `}</style>

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d3320 0%, #1a6b4a 60%, #2d9e72 100%)' }}>
        <div className="absolute top-[-80px] right-[-80px] w-96 h-96 rounded-full opacity-10 anim-float" style={{ background: 'radial-gradient(circle, #7fffbf, transparent)', animationDelay: '0s' }} />
        <div className="absolute bottom-[-60px] left-[-60px] w-64 h-64 rounded-full opacity-10 anim-float" style={{ background: 'radial-gradient(circle, #a0ffe0, transparent)', animationDelay: '1.5s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center gap-10">
          {/* Left */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20 anim-fade-up" style={{ animationDelay: '0.1s' }}>
              <span className="text-yellow-300 text-sm">✨</span>
              <span className="text-white/90 text-sm font-semibold">Platform Al-Quran Digital Terbaik</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 anim-fade-up" style={{ animationDelay: '0.2s' }}>
              Baca & Pelajari<br />
              <span className="text-yellow-300">Al-Quran</span><br />
              Kapan Saja
            </h1>
            <p className="text-white/75 text-base md:text-lg mb-8 max-w-md anim-fade-up" style={{ animationDelay: '0.35s' }}>
              Nikmati pengalaman membaca Al-Quran yang indah, lengkap dengan terjemahan, tafsir, audio murottal, dan jadwal shalat.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start anim-fade-up" style={{ animationDelay: '0.45s' }}>
              <Link to="/quran" className="shimmer-btn px-7 py-3 rounded-xl font-bold text-[#0d3320] shadow-lg hover:scale-105 transition-transform active:scale-95">
                Mulai Membaca
              </Link>
              <Link to="/jadwal-shalat" className="px-7 py-3 rounded-xl font-bold text-white border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all hover:scale-105 active:scale-95">
                Jadwal Shalat
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="flex-shrink-0 flex flex-col items-center gap-4 anim-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="anim-float">
              {USE_HERO_IMAGE ? (
                <img src={HERO_IMAGE} alt="Hero" className="w-56 h-56 rounded-2xl object-cover shadow-2xl ring-4 ring-white/20" />
              ) : (
                <div className="w-56 h-56 rounded-2xl flex flex-col items-center justify-center bg-white/10 border-2 border-dashed border-white/30 shadow-xl">
                  <span className="text-6xl mb-3">🕌</span>
                  <span className="text-white/50 text-xs font-semibold text-center px-6 leading-relaxed">Isi HERO_IMAGE dengan path gambar</span>
                </div>
              )}
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 grid grid-cols-2 gap-3 w-56">
              {stats.map((s) => (
                <div key={s.label} className="text-center bg-white/10 rounded-xl py-3 px-2 stat-pulse cursor-default">
                  <div className="text-xl font-black text-yellow-300">{s.value}</div>
                  <div className="text-white/70 text-xs font-semibold mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full overflow-hidden leading-none" style={{ height: '60px' }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M0,60 L0,38 C60,38 90,15 150,15 C210,15 240,35 300,32 C360,29 390,8 460,8 C530,8 560,30 620,28 C680,26 710,5 785,5 C860,5 890,28 950,25 C1010,22 1040,0 1115,0 C1190,0 1220,24 1280,22 C1340,20 1370,38 1420,36 C1435,35 1438,38 1440,38 L1440,60 Z" fill="#f8f6f0" />
          </svg>
        </div>
      </section>

      {/* ── Feature Cards ─────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12 anim-fade-up">
          <h2 className="text-3xl font-black text-[#1a3a2a] mb-3">Fitur Unggulan</h2>
          <div className="w-16 h-1 rounded-full bg-[#2d9e72] mx-auto mb-4" />
          <p className="text-[#4a5568] max-w-lg mx-auto">Lengkapi perjalanan spiritual Anda dengan berbagai fitur yang kami sediakan</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((card, i) => (
            <Link key={card.title} to={card.link} className="block group anim-fade-up" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
              <FeatureMountainCard card={card}>
                <p className="text-[#4a5568] text-sm leading-relaxed pt-1">{card.desc}</p>
                <div className="mt-3 text-[#2d9e72] text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Selengkapnya
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </FeatureMountainCard>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Banner ────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-8 relative overflow-hidden anim-fade-up card-hover" style={{ background: 'linear-gradient(135deg, #e8f5ee, #d1ede0)', animationDelay: '0.2s' }}>
            <div className="absolute right-[-20px] top-[-20px] w-36 h-36 rounded-full bg-[#2d9e72]/10" />
            <div className="absolute right-10 bottom-[-30px] w-24 h-24 rounded-full bg-[#2d9e72]/8" />
            <p className="text-[#2d9e72] font-bold text-sm mb-1">Baca bersama</p>
            <h3 className="text-[#1a3a2a] font-black text-2xl mb-3">Tadabbur Al-Quran</h3>
            <p className="text-[#4a5568] text-sm mb-5 max-w-xs">Renungkan makna setiap ayat dengan fitur tafsir dan audio murottal yang lengkap.</p>
            <Link to="/quran" className="inline-block px-6 py-3 rounded-xl bg-[#1a6b4a] text-white font-bold text-sm hover:bg-[#0d3320] transition-all hover:scale-105 active:scale-95 shadow-md">
              Baca Al-Quran
            </Link>
          </div>
          <div className="rounded-2xl p-8 relative overflow-hidden anim-fade-up card-hover" style={{ background: 'linear-gradient(135deg, #e8f0f5, #d1dded)', animationDelay: '0.3s' }}>
            <div className="absolute right-[-20px] top-[-20px] w-36 h-36 rounded-full bg-[#2d72a0]/10" />
            <p className="text-[#2d72a0] font-bold text-sm mb-1">Temukan jadwal</p>
            <h3 className="text-[#1a2a3a] font-black text-2xl mb-3">Waktu Shalat Tepat</h3>
            <p className="text-[#4a5568] text-sm mb-5 max-w-xs">Dapatkan jadwal shalat yang akurat untuk kota Anda di seluruh Indonesia.</p>
            <Link to="/jadwal-shalat" className="inline-block px-6 py-3 rounded-xl bg-[#1a4b6b] text-white font-bold text-sm hover:bg-[#0d2233] transition-all hover:scale-105 active:scale-95 shadow-md">
              Cek Jadwal Shalat
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────────── */}
      <footer style={{ background: 'linear-gradient(180deg, #0a2918 0%, #061a0f 100%)' }}>
        {/* Mountain divider */}
        <div className="w-full overflow-hidden leading-none" style={{ height: '50px' }}>
          <svg viewBox="0 0 1440 50" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M0,0 L0,20 C80,20 100,40 180,38 C260,36 280,15 360,14 C440,13 460,32 540,30 C620,28 640,8 720,6 C800,4 820,26 900,24 C980,22 1000,2 1080,0 C1160,-2 1180,20 1260,18 C1340,16 1380,30 1440,28 L1440,0 Z" fill="#f8f6f0" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9e72)' }}>
                  <span className="text-white font-bold text-sm" style={{ fontFamily: "'Amiri', serif" }}>ق</span>
                </div>
                <span className="font-black text-xl text-white">Al-Quran<span className="text-[#2d9e72]">Digital</span></span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-5">
                Platform Al-Quran digital terlengkap untuk umat Muslim Indonesia. Membaca, memahami, dan mengamalkan Al-Quran kapan saja dan di mana saja.
              </p>
              <div className="flex gap-2 flex-wrap">
                {socialLinks.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.label}
                    className="social-btn w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#2d9e72]">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav links */}
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group}>
                <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                  <span className="w-4 h-0.5 rounded-full bg-[#2d9e72] inline-block" />
                  {group}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.href} className="footer-link text-white/50 text-sm hover:text-[#2d9e72] flex items-center gap-1.5">
                        <span className="text-[#2d9e72] text-xs">›</span>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Kontak */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                <span className="w-4 h-0.5 rounded-full bg-[#2d9e72] inline-block" />
                Kontak & Info
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 w-7 h-7 flex-shrink-0 rounded-lg bg-[#2d9e72]/15 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-[#2d9e72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-white/30 text-xs mb-0.5">Email</p>
                    <a href="mailto:info@alqurandigital.id" className="text-white/60 text-sm hover:text-[#2d9e72] transition-colors">info@alqurandigital.id</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 w-7 h-7 flex-shrink-0 rounded-lg bg-[#2d9e72]/15 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-[#2d9e72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-white/30 text-xs mb-0.5">WhatsApp</p>
                    <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="text-white/60 text-sm hover:text-[#2d9e72] transition-colors">+62 812-3456-7890</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 w-7 h-7 flex-shrink-0 rounded-lg bg-[#2d9e72]/15 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-[#2d9e72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-white/30 text-xs mb-0.5">Lokasi</p>
                    <p className="text-white/60 text-sm">Pekanbaru, Riau, Indonesia</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>


          {/* Bottom bar */}
          <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/30 text-xs text-center sm:text-left">
              © 2025 Al-Quran Digital.
            </p>
            <p className="text-white/30 text-xs">
              Data dari{' '}
              <a href="https://equran.id" className="text-[#2d9e72] hover:underline" target="_blank" rel="noreferrer">equran.id</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}