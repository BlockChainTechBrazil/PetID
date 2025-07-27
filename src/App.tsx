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
      <main className="min-h-screen w-full flex flex-col items-center justify-start">
        <div className="w-full max-w-7xl pt-24 px-4 sm:px-8">
          <Hero />
          <WalletConnect />
          <PetRegistration />
          <Features />
        </div>
        <Footer />
      </main>
    </>
  )
}

export default App
