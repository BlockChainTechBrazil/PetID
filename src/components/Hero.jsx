

function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          {/* Hero Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="block">Identidade Digital</span>
            <span className="block text-yellow-300">para seus Pets</span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            PetID é uma plataforma descentralizada que cria identidades digitais 
            únicas e seguras para animais de estimação usando blockchain
          </p>

          {/* Hero Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="text-lg font-semibold mb-2">Seguro & Imutável</h3>
              <p className="text-blue-100 text-sm">
                Registros protegidos por blockchain, impossíveis de falsificar
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">🌐</div>
              <h3 className="text-lg font-semibold mb-2">Descentralizado</h3>
              <p className="text-blue-100 text-sm">
                Sem dependência de autoridades centrais ou governos
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">🆔</div>
              <h3 className="text-lg font-semibold mb-2">ID Único</h3>
              <p className="text-blue-100 text-sm">
                Cada pet recebe uma identidade digital única e verificável
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors shadow-lg">
              Registrar meu Pet
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors">
              Saiba Mais
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-yellow-300">1,234</div>
              <div className="text-blue-100 text-sm">Pets Registrados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300">567</div>
              <div className="text-blue-100 text-sm">Usuários Ativos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300">89</div>
              <div className="text-blue-100 text-sm">Pets Encontrados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300">99.9%</div>
              <div className="text-blue-100 text-sm">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="relative">
        <svg
          className="absolute bottom-0 w-full h-6 text-white"
          fill="currentColor"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" />
        </svg>
      </div>
    </section>
  )
}

export default Hero
