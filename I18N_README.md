# Internacionalização (i18n) - PetID

Este projeto agora suporta internacionalização em três idiomas:
- **Português (pt)** - Idioma padrão
- **Inglês (en)**
- **Espanhol (es)**

## Como usar

### Mudança automática de idioma
O sistema automaticamente detecta o idioma do navegador do usuário e seleciona o idioma apropriado. Se o idioma não estiver disponível, o português será usado como padrão.

### Seletor de idioma
Na barra de navegação, há um seletor de idioma que permite ao usuário trocar entre os idiomas disponíveis. A preferência é salva no localStorage do navegador.

### Para desenvolvedores

#### Usando traduções em componentes
```tsx
import { useTranslation } from 'react-i18next';

function MeuComponente() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
    </div>
  );
}
```

#### Adicionando novas traduções
1. Edite os arquivos de tradução em `src/i18n/locales/`:
   - `pt.json` - Português
   - `en.json` - Inglês
   - `es.json` - Espanhol

2. Adicione a chave da tradução em todos os três arquivos:
```json
{
  "minhaSecao": {
    "titulo": "Meu Título",
    "descricao": "Minha descrição"
  }
}
```

3. Use no componente:
```tsx
{t('minhaSecao.titulo')}
{t('minhaSecao.descricao')}
```

#### Mudando idioma programaticamente
```tsx
import { useTranslation } from 'react-i18next';

function MeuComponente() {
  const { i18n } = useTranslation();
  
  const mudarIdioma = (idioma: string) => {
    i18n.changeLanguage(idioma);
  };
  
  return (
    <button onClick={() => mudarIdioma('en')}>
      Mudar para Inglês
    </button>
  );
}
```

## Estrutura dos arquivos de tradução

Os arquivos de tradução estão organizados por seções:

- `navbar` - Elementos da barra de navegação
- `hero` - Seção principal da página inicial
- `features` - Recursos e funcionalidades
- `petRegistration` - Formulário de registro de pets
- `walletConnect` - Conexão da carteira
- `myPetNFTs` - Visualização dos NFTs de pets
- `footer` - Rodapé da página

## Dependências instaladas

- `react-i18next` - Biblioteca de internacionalização para React
- `i18next` - Core da biblioteca de internacionalização
- `i18next-browser-languagedetector` - Detecção automática de idioma do navegador
