import { useState, useEffect } from 'react'

const PRAYER_NAMES = [
  { key: 'imsak',   label: 'Imsak',   icon: '🌙', color: '#1a4b6b' },
  { key: 'subuh',   label: 'Subuh',   icon: '🌙', color: '#1a6b4a' },
  { key: 'terbit',  label: 'Terbit',  icon: '🌅', color: '#c2703b' },
  { key: 'dhuha',   label: 'Dhuha',   icon: '☀️', color: '#d4a017' },
  { key: 'dzuhur',  label: 'Dzuhur',  icon: '☀️', color: '#c2703b' },
  { key: 'ashar',   label: 'Ashar',   icon: '🌤️', color: '#6b9e20' },
  { key: 'maghrib', label: 'Maghrib', icon: '🌇', color: '#c24040' },
  { key: 'isya',    label: 'Isya',    icon: '🌃', color: '#4a1a6b' },
]

const MONTHS = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']

export default function JadwalShalat() {
  const [provinsi, setProvinsi]           = useState([])
  const [kabkota, setKabkota]             = useState([])
  const [selectedProvinsi, setSelectedProvinsi] = useState('')
  const [selectedKabkota, setSelectedKabkota]   = useState('')
  const [jadwalData, setJadwalData]       = useState(null)
  const [loading, setLoading]             = useState(false)
  const [loadingProv, setLoadingProv]     = useState(true)
  const [loadingKab, setLoadingKab]       = useState(false)
  const [selectedDay, setSelectedDay]     = useState(null)

  const now = new Date()
  const [bulan, setBulan] = useState(now.getMonth() + 1)
  const [tahun, setTahun] = useState(now.getFullYear())

  // Load provinsi — returns array of strings
  useEffect(() => {
    fetch('https://equran.id/api/v2/shalat/provinsi')
      .then(r => r.json())
      .then(data => {
        // data.data is array of strings like ["Aceh", "Sumatera Utara", ...]
        const list = data.data || data || []
        setProvinsi(Array.isArray(list) ? list : [])
        setLoadingProv(false)
      })
      .catch(() => setLoadingProv(false))
  }, [])

  // Load kab/kota — POST with { provinsi: "Jawa Barat" }
  useEffect(() => {
    if (!selectedProvinsi) return
    setLoadingKab(true)
    setKabkota([])
    setSelectedKabkota('')
    setJadwalData(null)
    fetch('https://equran.id/api/v2/shalat/kabkota', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provinsi: selectedProvinsi })
    })
      .then(r => r.json())
      .then(data => {
        // data.data is array of strings like ["Kab. Bandung", "Kota Bogor", ...]
        const list = data.data || data || []
        setKabkota(Array.isArray(list) ? list : [])
        setLoadingKab(false)
      })
      .catch(() => setLoadingKab(false))
  }, [selectedProvinsi])

  // Fetch jadwal bulanan
  const fetchJadwal = () => {
    if (!selectedKabkota || !selectedProvinsi) return
    setLoading(true)
    setJadwalData(null)
    fetch('https://equran.id/api/v2/shalat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provinsi: selectedProvinsi, kabkota: selectedKabkota, bulan, tahun })
    })
      .then(r => r.json())
      .then(data => {
        setJadwalData(data.data || null)
        // Default: tampilkan hari ini kalau bulan & tahun sama
        const todayDate = now.getDate()
        const jadwal = data.data?.jadwal || []
        const todayEntry = jadwal.find(j => j.tanggal === todayDate) || jadwal[0]
        setSelectedDay(todayEntry || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  const todayStr = `${tahun}-${String(bulan).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideIn { from { opacity:0; transform:translateX(16px); } to { opacity:1; transform:translateX(0); } }
        .anim-fade-up { animation: fadeUp 0.5s ease both; }
        .anim-slide { animation: slideIn 0.4s ease both; }
        .day-btn { transition: all 0.18s ease; }
        .day-btn:hover { transform: scale(1.07); }
        .prayer-row { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .prayer-row:hover { transform: translateX(4px); box-shadow: -3px 0 0 #2d9e72; }
      `}</style>

      <div className="mb-8 anim-fade-up">
        <h1 className="text-3xl font-black text-[#1a3a2a] mb-1">Jadwal Shalat</h1>
        <div className="w-12 h-1 rounded-full bg-[#2d9e72] mb-3" />
        <p className="text-[#4a5568]">Jadwal waktu shalat bulanan untuk kota Anda</p>
      </div>

      {/* Selector form */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#e8f0eb] p-6 mb-6 anim-fade-up space-y-4" style={{ animationDelay: '0.1s' }}>
        {/* Provinsi */}
        <div>
          <label className="text-[#1a3a2a] font-bold text-sm block mb-2">Provinsi</label>
          {loadingProv ? (
            <div className="h-12 rounded-xl bg-[#e8f5ee] animate-pulse" />
          ) : (
            <select
              value={selectedProvinsi}
              onChange={e => setSelectedProvinsi(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#d1e5d8] bg-white text-[#1a3a2a] focus:outline-none focus:ring-2 focus:ring-[#2d9e72] text-sm appearance-none cursor-pointer transition-shadow"
            >
              <option value="">-- Pilih Provinsi --</option>
              {provinsi.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          )}
        </div>

        {/* Kab/Kota */}
        <div>
          <label className="text-[#1a3a2a] font-bold text-sm block mb-2">Kabupaten / Kota</label>
          {loadingKab ? (
            <div className="h-12 rounded-xl bg-[#e8f5ee] animate-pulse" />
          ) : (
            <select
              value={selectedKabkota}
              onChange={e => setSelectedKabkota(e.target.value)}
              disabled={!selectedProvinsi || kabkota.length === 0}
              className="w-full px-4 py-3 rounded-xl border border-[#d1e5d8] bg-white text-[#1a3a2a] focus:outline-none focus:ring-2 focus:ring-[#2d9e72] text-sm appearance-none cursor-pointer disabled:opacity-50 transition-shadow"
            >
              <option value="">-- Pilih Kabupaten/Kota --</option>
              {kabkota.map(k => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          )}
        </div>

        {/* Bulan & Tahun */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[#1a3a2a] font-bold text-sm block mb-2">Bulan</label>
            <select value={bulan} onChange={e => setBulan(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-[#d1e5d8] bg-white text-[#1a3a2a] focus:outline-none focus:ring-2 focus:ring-[#2d9e72] text-sm appearance-none cursor-pointer">
              {MONTHS.map((m, i) => <option key={i+1} value={i+1}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[#1a3a2a] font-bold text-sm block mb-2">Tahun</label>
            <select value={tahun} onChange={e => setTahun(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-[#d1e5d8] bg-white text-[#1a3a2a] focus:outline-none focus:ring-2 focus:ring-[#2d9e72] text-sm appearance-none cursor-pointer">
              {[2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        <button
          onClick={fetchJadwal}
          disabled={!selectedKabkota || loading}
          className="w-full py-3 rounded-xl font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] shadow-md"
          style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9e72)' }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              Memuat...
            </span>
          ) : 'Tampilkan Jadwal Shalat'}
        </button>
      </div>

      {/* Result */}
      {jadwalData && (
        <div className="anim-slide">
          {/* Location badge */}
          <div className="rounded-2xl p-5 mb-5 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d3320, #1a6b4a)' }}>
            <div className="absolute right-4 top-4 text-5xl opacity-10">🕌</div>
            <div className="text-white/60 text-xs mb-1">Jadwal Shalat</div>
            <div className="text-yellow-300 font-black text-xl">{jadwalData.kabkota}</div>
            <div className="text-white/70 text-sm">{jadwalData.provinsi} — {jadwalData.bulan_nama} {jadwalData.tahun}</div>
          </div>

          {/* Day picker */}
          <div className="mb-5">
            <p className="text-[#1a3a2a] font-bold text-sm mb-3">Pilih Tanggal</p>
            <div className="flex flex-wrap gap-2">
              {(jadwalData.jadwal || []).map(j => {
                const isToday = j.tanggal_lengkap === todayStr
                const isSelected = selectedDay?.tanggal === j.tanggal
                return (
                  <button
                    key={j.tanggal}
                    onClick={() => setSelectedDay(j)}
                    className={`day-btn w-9 h-9 rounded-xl text-xs font-bold border transition-colors ${
                      isSelected
                        ? 'bg-[#1a6b4a] text-white border-[#1a6b4a] shadow-md'
                        : isToday
                          ? 'bg-yellow-300 text-[#0d3320] border-yellow-300'
                          : 'bg-white text-[#4a5568] border-[#d1e5d8] hover:border-[#2d9e72]'
                    }`}
                  >
                    {j.tanggal}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Selected day detail */}
          {selectedDay && (
            <div className="bg-white rounded-2xl shadow-sm border border-[#e8f0eb] overflow-hidden anim-fade-up">
              <div className="px-5 py-4 border-b border-[#e8f0eb] bg-[#f8fffe]">
                <p className="text-[#1a3a2a] font-black">{selectedDay.hari}, {selectedDay.tanggal} {jadwalData.bulan_nama} {jadwalData.tahun}</p>
              </div>
              <div className="divide-y divide-[#e8f0eb]">
                {PRAYER_NAMES.map(p => {
                  const time = selectedDay[p.key]
                  if (!time) return null
                  return (
                    <div key={p.key} className="prayer-row flex items-center justify-between px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="text-xl w-8 text-center">{p.icon}</div>
                        <span className="text-[#1a3a2a] font-bold text-sm">{p.label}</span>
                      </div>
                      <span className="text-lg font-black" style={{ color: p.color }}>{time}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}