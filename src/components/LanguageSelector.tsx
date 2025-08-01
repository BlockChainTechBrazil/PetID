import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';

const languages = [
  {
    code: 'pt',
    name: 'Português',
    flag: 'https://flagcdn.com/24x18/br.png'
  },
  {
    code: 'en',
    name: 'English',
    flag: 'https://flagcdn.com/24x18/us.png'
  },
  {
    code: 'es',
    name: 'Español',
    flag: 'https://flagcdn.com/24x18/es.png'
  }
];

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        title={currentLanguage.name}
      >
        <img
          src={currentLanguage.flag}
          alt={currentLanguage.name}
          className="w-6 h-4 object-cover rounded"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg transition-colors ${i18n.language === lang.code ? 'bg-blue-50 text-blue-700' : ''
                }`}
            >
              <img
                src={lang.flag}
                alt={lang.name}
                className="w-6 h-4 object-cover rounded mr-3"
              />
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;