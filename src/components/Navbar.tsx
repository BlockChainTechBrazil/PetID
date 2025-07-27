import { useState } from 'react'
// @ts-ignore
import logo from '../assets/logo/petID-logo.png'
import { navItems } from '../constants'

function Navbar() {
  const [isConnected, setIsConnected] = useState(false)

  const connectWallet = async () => {
    const { ethereum } = window as typeof window & { ethereum?: any }
    if (ethereum) {
      try {
        await ethereum.request({ method: 'eth_requestAccounts' })
        setIsConnected(true)
      } catch (error) {
        console.error('Erro ao conectar carteira:', error)
      }
    } else {
      alert('MetaMask não encontrado! Instale a extensão MetaMask.')
    }
  }

  return (
    <nav className="sticky top-0 z-50 py-3 bg-background/80 backdrop-blur-lg border-b border-primary/30 shadow-lg">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2 rounded-xl shadow-md" src={logo} alt="Logo" />
            <span className="text-2xl font-bold tracking-tight text-primary">PetID</span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-10">
            {navItems.map((item, index) => (
              <li key={index}>
                <a className="text-white/90 hover:text-accent transition-colors duration-200 font-medium" href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <button
            onClick={connectWallet}
            className="ml-8 px-5 py-2 rounded-2xl bg-primary hover:bg-accent text-white font-semibold shadow-lg transition-all duration-200"
          >
            {isConnected ? 'Carteira Conectada' : 'Conectar Carteira'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
