import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Mapa from './pages/Mapa'
import Campistas from './pages/Campistas'
import AgregarCampista from './pages/AgregarCampista'
import PerfilCampista from './pages/PerfilCampista'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Mapa />} />
        <Route path="/campistas" element={<Campistas />} />
        <Route path="/agregar" element={<AgregarCampista />} />
        <Route path="/campista/:id" element={<PerfilCampista />} />
        
      </Routes>
    </BrowserRouter>
  )
}