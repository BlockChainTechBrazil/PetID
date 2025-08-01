import { useTranslation } from 'react-i18next'

function Features() {
  const { t } = useTranslation()

  const features = [
    {
      icon: "🔐",
      title: t('features.items.blockchainRegistry.title'),
      description: t('features.items.blockchainRegistry.description')
    },
    {
      icon: "📱",
      title: t('features.items.qrCode.title'),
      description: t('features.items.qrCode.description')
    },
    {
      icon: "🌍",
      title: t('features.items.globalNetwork.title'),
      description: t('features.items.globalNetwork.description')
    },
    {
      icon: "🏥",
      title: t('features.items.medicalHistory.title'),
      description: t('features.items.medicalHistory.description')
    },
    {
      icon: "🔍",
      title: t('features.items.smartSearch.title'),
      description: t('features.items.smartSearch.description')
    },
    {
      icon: "🎨",
      title: t('features.items.nftPets.title'),
      description: t('features.items.nftPets.description')
    }
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            {t('features.subtitle')}
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
              {t('features.cta.title')}
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              {t('features.cta.subtitle')}
            </p>
            <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors shadow-lg">
              {t('features.cta.button')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
