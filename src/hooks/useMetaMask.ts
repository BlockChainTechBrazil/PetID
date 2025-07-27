import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const useMetaMask = () => {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [network, setNetwork] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Verificar se MetaMask está instalado
  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  };

  // Conectar carteira
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      setError('MetaMask não está instalado. Por favor, instale a extensão MetaMask.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Solicitar conexão
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Criar provider e signer
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      const web3Signer = await web3Provider.getSigner();
      const address = await web3Signer.getAddress();
      const networkInfo = await web3Provider.getNetwork();

      setProvider(web3Provider);
      setSigner(web3Signer);
      setAccount(address);
      setNetwork(networkInfo);
      setIsConnected(true);
      
      // Salvar no localStorage
      localStorage.setItem('isWalletConnected', 'true');
      
    } catch (err) {
      console.error('Erro ao conectar carteira:', err);
      setError('Erro ao conectar com MetaMask. Verifique se você aprovou a conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  // Desconectar carteira
  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setNetwork(null);
    setIsConnected(false);
    localStorage.removeItem('isWalletConnected');
  };

  // Verificar conexão existente
  const checkConnection = async () => {
    if (!isMetaMaskInstalled()) return;

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      
      if (accounts.length > 0 && localStorage.getItem('isWalletConnected')) {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        const web3Signer = await web3Provider.getSigner();
        const address = await web3Signer.getAddress();
        const networkInfo = await web3Provider.getNetwork();

        setProvider(web3Provider);
        setSigner(web3Signer);
        setAccount(address);
        setNetwork(networkInfo);
        setIsConnected(true);
      }
    } catch (err) {
      console.error('Erro ao verificar conexão:', err);
    }
  };

  // Mudar rede
  const switchToNetwork = async (chainId) => {
    if (!isMetaMaskInstalled()) return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (err) {
      console.error('Erro ao trocar rede:', err);
      setError('Erro ao trocar rede. Verifique se a rede está adicionada ao MetaMask.');
    }
  };

  // Adicionar rede Polygon Mumbai (testnet)
  const addPolygonMumbai = async () => {
    if (!isMetaMaskInstalled()) return;

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x13881', // 80001 em hexadecimal
            chainName: 'Polygon Mumbai',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18,
            },
            rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
            blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
          },
        ],
      });
    } catch (err) {
      console.error('Erro ao adicionar rede:', err);
    }
  };

  // Formatear endereço
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Effect para verificar conexão inicial e ouvir mudanças
  useEffect(() => {
    checkConnection();

    if (isMetaMaskInstalled()) {
      // Ouvir mudanças de conta
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          checkConnection();
        }
      });

      // Ouvir mudanças de rede
      window.ethereum.on('chainChanged', () => {
        checkConnection();
      });

      // Cleanup
      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', checkConnection);
          window.ethereum.removeListener('chainChanged', checkConnection);
        }
      };
    }
  }, []);

  return {
    account,
    isConnected,
    provider,
    signer,
    network,
    isLoading,
    error,
    isMetaMaskInstalled: isMetaMaskInstalled(),
    connectWallet,
    disconnectWallet,
    switchToNetwork,
    addPolygonMumbai,
    formatAddress,
  };
};
