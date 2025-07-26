# 🚀 Deploy do Contrato Pet ID

## Pré-requisitos

1. **Hardhat** - Framework para desenvolvimento Ethereum
2. **MetaMask** - Carteira com MATIC para gas fees
3. **Alchemy/Infura** - Provedor RPC (opcional, mas recomendado)

## Instalação das Dependências de Deploy

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

## Configuração do Hardhat

1. Inicialize o Hardhat:
```bash
npx hardhat init
```

2. Escolha "Create a TypeScript project" ou "Create a JavaScript project"

3. Configure o `hardhat.config.js`:

```javascript
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    // Polygon Mumbai Testnet
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com/",
      accounts: ["SUA_PRIVATE_KEY_AQUI"] // ⚠️ NUNCA COMMITE A CHAVE PRIVADA!
    },
    // Polygon Mainnet
    polygon: {
      url: "https://polygon-rpc.com/",
      accounts: ["SUA_PRIVATE_KEY_AQUI"]
    }
  },
  etherscan: {
    apiKey: "SUA_POLYGONSCAN_API_KEY" // Para verificação do contrato
  }
};
```

## Script de Deploy

Crie o arquivo `scripts/deploy.js`:

```javascript
const hre = require("hardhat");

async function main() {
  console.log("🚀 Iniciando deploy do contrato Pet ID...");

  // Deploy do contrato
  const PetID = await hre.ethers.getContractFactory("PetID");
  const petID = await PetID.deploy();

  await petID.waitForDeployment();

  const contractAddress = await petID.getAddress();
  
  console.log("✅ Pet ID implantado em:", contractAddress);
  
  // Salvar o endereço para uso no frontend
  const fs = require('fs');
  const contractInfo = {
    address: contractAddress,
    network: hre.network.name,
    deployedAt: new Date().toISOString()
  };
  
  fs.writeFileSync('contract-address.json', JSON.stringify(contractInfo, null, 2));
  
  console.log("📄 Endereço salvo em contract-address.json");
  console.log("🔗 Atualize o endereço no arquivo src/hooks/usePetIDContract.js");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

## Deploy na Mumbai Testnet

1. **Obter MATIC de teste:**
   - Acesse: https://faucet.polygon.technology/
   - Conecte sua carteira
   - Solicite MATIC para Mumbai testnet

2. **Fazer o deploy:**
```bash
npx hardhat run scripts/deploy.js --network mumbai
```

3. **Verificar o contrato (opcional):**
```bash
npx hardhat verify --network mumbai ENDERECO_DO_CONTRATO
```

## Atualizar o Frontend

Após o deploy, atualize o endereço do contrato em `src/hooks/usePetIDContract.js`:

```javascript
// Substitua esta linha:
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

// Por:
const CONTRACT_ADDRESS = "SEU_ENDERECO_DO_CONTRATO";
```

## Testnet vs Mainnet

### Mumbai Testnet (Recomendado para testes)
- **RPC**: https://rpc-mumbai.maticvigil.com/
- **Chain ID**: 80001
- **Explorer**: https://mumbai.polygonscan.com/
- **Faucet**: https://faucet.polygon.technology/

### Polygon Mainnet (Produção)
- **RPC**: https://polygon-rpc.com/
- **Chain ID**: 137
- **Explorer**: https://polygonscan.com/
- **MATIC Real necessário**

## Segurança

⚠️ **IMPORTANTE**: 
- Nunca commite chaves privadas no repositório
- Use variáveis de ambiente para informações sensíveis
- Teste sempre na testnet antes de fazer deploy na mainnet
- Considere usar multisig wallets para contratos de produção

## Estrutura Final

```
PetID/
├── contracts/
│   └── PetID.sol
├── scripts/
│   └── deploy.js
├── hardhat.config.js
├── contract-address.json (gerado após deploy)
└── src/
    └── hooks/
        └── usePetIDContract.js (atualizar endereço)
```

## Comandos Úteis

```bash
# Compilar contrato
npx hardhat compile

# Executar testes
npx hardhat test

# Deploy local (para desenvolvimento)
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost

# Deploy na testnet
npx hardhat run scripts/deploy.js --network mumbai

# Verificar contrato
npx hardhat verify --network mumbai ENDERECO_DO_CONTRATO
```
