function Features() {
  const features = [
    {
      icon: "🔐",
      title: "Registro Blockchain",
      description: "Cada pet recebe um registro imutável na blockchain, garantindo autenticidade e segurança dos dados."
    },
    {
      icon: "📱",
      title: "QR Code Único",
      description: "Gere QR codes únicos para seus pets, facilitando a identificação rápida em caso de perda."
    },
    {
      icon: "🌍",
      title: "Rede Global",
      description: "Acesse informações dos pets em qualquer lugar do mundo através da rede descentralizada."
    },
    {
      icon: "🏥",
      title: "Histórico Médico",
      description: "Mantenha um registro completo e seguro do histórico médico e vacinação dos seus pets."
    },
    {
      icon: "🔍",
      title: "Busca Inteligente",
      description: "Sistema avançado de busca para localizar pets perdidos usando IA e machine learning."
    },
    {
      icon: "🎨",
      title: "NFT Pets",
      description: "Transforme a identidade do seu pet em um NFT único e colecionável na blockchain."
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recursos Revolucionários
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra como o PetID está transformando a forma como cuidamos e protegemos nossos animais de estimação
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Pronto para proteger seu pet?
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de donos de pets que já confiam na tecnologia blockchain 
              para manter seus animais seguros e protegidos.
            </p>
            <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors shadow-lg">
              Começar Agora - Grátis
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
