import './index.css'
import WalletConnect from './components/WalletConnect'
import PetRegistration from './components/PetRegistration'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <Hero />
        <WalletConnect />
        <PetRegistration />
        <Features />
        <Footer />
      </div>
    </>
    
  )
}

export default App
