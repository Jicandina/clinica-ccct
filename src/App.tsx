import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Servicios from './components/Servicios'
import Especialidades from './components/Especialidades'
import Precios from './components/Precios'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Servicios />
      <Especialidades />
      <Precios />
      <Contacto />
      <Footer />
    </div>
  )
}
