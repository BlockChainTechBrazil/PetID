import { useState } from 'react'
import { useTranslation } from 'react-i18next'
// @ts-ignore
import logo from '../assets/logo/petID-logo.png'
import LanguageSelector from './LanguageSelector'

function Navbar() {
  const { t } = useTranslation()
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
      alert(t('navbar.metamaskNotFound'))
    }
  }

  return (
    <nav className="sticky top-0 z-50 py-3 bg-background/80 backdrop-blur-lg border-b border-primary/30 shadow-lg">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2 rounded-xl shadow-md" src={logo} alt="Logo" />
            <span className="text-2xl font-bold tracking-tight text-black">PetID</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={connectWallet}
              className="px-5 py-2 rounded-2xl bg-blue-400 hover:bg-accent text-black font-semibold shadow-lg transition-all duration-200"
            >
              {isConnected ? t('navbar.walletConnected') : t('navbar.connectWallet')}
            </button>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
