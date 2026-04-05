import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Quran from './pages/Quran'
import SuratDetail from './pages/SuratDetail'
import Tafsir from './pages/Tafsir'
import Doa from './pages/Doa'
import DoaDetail from './pages/DoaDetail'
import JadwalShalat from './pages/JadwalShalat'

export default function App() {
  return (
    <Router>
      <div style={{ fontFamily: "'Nunito', sans-serif" }} className="min-h-screen bg-[#f8f6f0]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quran" element={<Quran />} />
          <Route path="/quran/:id" element={<SuratDetail />} />
          <Route path="/tafsir/:id" element={<Tafsir />} />
          <Route path="/doa" element={<Doa />} />
          <Route path="/doa/:id" element={<DoaDetail />} />
          <Route path="/jadwal-shalat" element={<JadwalShalat />} />
        </Routes>
      </div>
    </Router>
  )
}