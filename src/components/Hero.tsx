
import { useTranslation } from 'react-i18next'

function Hero() {
  const { t } = useTranslation()

  return (
    <section className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-0">
        <div className="text-center">
          {/* Hero Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="block">{t('hero.title')}</span>
            <span className="block text-yellow-300">{t('hero.titleHighlight')}</span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>

          {/* Hero Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="text-lg font-semibold mb-2">{t('hero.features.secure.title')}</h3>
              <p className="text-blue-100 text-sm">
                {t('hero.features.secure.description')}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">🌐</div>
              <h3 className="text-lg font-semibold mb-2">{t('hero.features.decentralized.title')}</h3>
              <p className="text-blue-100 text-sm">
                {t('hero.features.decentralized.description')}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">🆔</div>
              <h3 className="text-lg font-semibold mb-2">{t('hero.features.uniqueId.title')}</h3>
              <p className="text-blue-100 text-sm">
                {t('hero.features.uniqueId.description')}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-yellow-300">1,234</div>
              <div className="text-blue-100 text-sm">{t('hero.stats.petsRegistered')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300">567</div>
              <div className="text-blue-100 text-sm">{t('hero.stats.activeUsers')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300">89</div>
              <div className="text-blue-100 text-sm">{t('hero.stats.petsFound')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300">99.9%</div>
              <div className="text-blue-100 text-sm">{t('hero.stats.uptime')}</div>
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
