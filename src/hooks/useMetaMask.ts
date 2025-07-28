
import { useState, useEffect } from 'react';
import { ethers, BrowserProvider, Signer, Network } from 'ethers';

export function useMetaMask() {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [network, setNetwork] = useState<Network | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Verificar se MetaMask está instalado
  const isMetaMaskInstalled = (): boolean => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  };

  // Conectar carteira
  const connectWallet = async (): Promise<void> => {
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
  const disconnectWallet = (): void => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setNetwork(null);
    setIsConnected(false);
    localStorage.removeItem('isWalletConnected');
  };

  // Verificar conexão existente
  const checkConnection = async (): Promise<void> => {
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
  const switchToNetwork = async (chainId: number): Promise<void> => {
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

  // Formatar endereço
  const formatAddress = (address: string | null): string => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Effect para verificar conexão inicial e ouvir mudanças
  useEffect(() => {
    checkConnection();

    if (isMetaMaskInstalled()) {
      // Ouvir mudanças de conta
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          checkConnection();
        }
      };
      const handleChainChanged = () => {
        checkConnection();
      };
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      // Cleanup
      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
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
    formatAddress,
  };
}
