import TopBanner from './components/TopBanner'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Servicios from './components/Servicios'
import PorQueNosotros from './components/PorQueNosotros'
import Proceso from './components/Proceso'
import Especialidades from './components/Especialidades'
import Precios from './components/Precios'
import FAQ from './components/FAQ'
import Mapa from './components/Mapa'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import ScrollProgress from './components/ScrollProgress'
import WhatsAppFloat from './components/WhatsAppFloat'
import ChatWidget from './components/ChatWidget'
import './App.css'

export default function App() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <div className="min-h-screen">
        <TopBanner />
        <Navbar />
        <Hero />
        <Servicios />
        <PorQueNosotros />
        <Proceso />
        <Especialidades />
        <Precios />
        <FAQ />
        <Mapa />
        <Contacto />
        <Footer />
      </div>
      <WhatsAppFloat />
      <ChatWidget />
    </>
  )
}
