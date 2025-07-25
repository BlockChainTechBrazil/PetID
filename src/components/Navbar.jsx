import { useState } from 'react'
import logo from '../assets/logo/petID-logo.png'
import { navItems } from '../constants'

function Navbar() {
  const [isConnected, setIsConnected] = useState(false)

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        setIsConnected(true)
      } catch (error) {
        console.error('Erro ao conectar carteira:', error)
      }
    } else {
      alert('MetaMask não encontrado! Instale a extensão MetaMask.')
    }
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
            <span className="text-xl font-bold text-blue-600 tracking-tight">PetID</span>
          </div>

          {/* Navigation Links - Visível em todas as telas */}
          <div className="flex items-center space-x-8">
            <ul className="flex space-x-6">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Wallet Connection Button */}
            <button
              onClick={connectWallet}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isConnected
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isConnected ? '✓ Conectado' : 'Conectar Carteira'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
