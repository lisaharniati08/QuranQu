import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// ─── Atur logo di sini ───────────────────────────────────────────────
const USE_CUSTOM_LOGO = true          // ganti true jika pakai gambar
const LOGO_PATH = '../public/logo.png'   // path gambar logo kamu
// ─────────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { to: '/', label: 'Beranda' },
    { to: '/quran', label: 'Al-Quran' },
    { to: '/doa', label: "Do'a" },
    { to: '/jadwal-shalat', label: 'Jadwal Shalat' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .nav-animate { animation: fadeInDown 0.4s ease both; }
        @keyframes mobileSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu-animate { animation: mobileSlide 0.25s ease both; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 nav-animate">

          {/* Logo */}
          <div className="flex items-center gap-2">
            {USE_CUSTOM_LOGO ? (
              <img
                src={LOGO_PATH}
                alt="Logo"
                className="w-9 h-9 rounded-xl object-cover "
              />
            ) : (
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9e72)' }}
              >
                <span className="text-white font-bold text-sm" style={{ fontFamily: "'Amiri', serif" }}>ق</span>
              </div>
            )}
            <Link to="/">
              <span className="font-black text-xl text-[#1a3a2a] hover:text-[#1a6b4a] transition-colors">
                Quran<span className="text-[#2d9e72]">Qu</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                style={{ animationDelay: `${i * 0.07}s` }}
                className={`nav-animate px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive(link.to)
                    ? 'bg-[#e8f5ee] text-[#1a6b4a]'
                    : 'text-[#4a5568] hover:bg-[#f0faf5] hover:text-[#1a6b4a] hover:-translate-y-0.5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl text-[#4a5568] hover:bg-[#f0faf5] transition-all active:scale-90"
          >
            <svg
              className="w-6 h-6 transition-transform duration-300"
              style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-1 mobile-menu-animate">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all active:scale-98 ${
                  isActive(link.to)
                    ? 'bg-[#e8f5ee] text-[#1a6b4a]'
                    : 'text-[#4a5568] hover:bg-[#f0faf5]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}