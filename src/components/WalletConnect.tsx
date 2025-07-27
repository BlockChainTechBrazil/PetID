import { useMetaMask } from '../hooks/useMetaMask';
import './WalletConnect.css';

const WalletConnect = () => {
  const {
    account,
    isConnected,
    network,
    isLoading,
    error,
    isMetaMaskInstalled,
    connectWallet,
    disconnectWallet,
    addPolygonMumbai,
    formatAddress,
  } = useMetaMask();

  if (!isMetaMaskInstalled) {
    return (
      <div className="wallet-connect">
        <div className="wallet-status error">
          <h3>MetaMask não encontrado</h3>
          <p>Por favor, instale a extensão MetaMask para usar o Pet ID.</p>
          <a 
            href="https://metamask.io/download/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="install-button"
          >
            Instalar MetaMask
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="wallet-connect">
      <div className="wallet-header">
        <h2>🐾 Pet ID Wallet</h2>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {!isConnected ? (
        <div className="connect-section">
          <h3>Conecte sua carteira</h3>
          <p>Conecte sua carteira MetaMask para começar a usar o Pet ID</p>
          <button 
            onClick={connectWallet} 
            disabled={isLoading}
            className="connect-button"
          >
            {isLoading ? (
              <span>
                <span className="spinner"></span>
                Conectando...
              </span>
            ) : (
              <span>
                🦊 Conectar MetaMask
              </span>
            )}
          </button>
        </div>
      ) : (
        <div className="connected-section">
          <div className="account-info">
            <h3>✅ Carteira Conectada</h3>
            <div className="account-details">
              <div className="detail-item">
                <label>Endereço:</label>
                <span className="address">{formatAddress(account)}</span>
              </div>
              {network && (
                <div className="detail-item">
                  <label>Rede:</label>
                  <span className="network">
                    {network.name} (ID: {network.chainId.toString()})
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="actions">
            <button onClick={disconnectWallet} className="disconnect-button">
              Desconectar
            </button>
            
            {network && network.chainId !== 80001n && (
              <button onClick={addPolygonMumbai} className="network-button">
                Adicionar Polygon Mumbai
              </button>
            )}
          </div>
        </div>
      )}

      <div className="info-section">
        <h4>ℹ️ Sobre o Pet ID</h4>
        <p>
          O Pet ID é uma plataforma descentralizada para identificação e 
          gerenciamento de dados de pets na blockchain. Conecte sua carteira 
          para registrar, transferir e gerenciar identidades digitais de pets.
        </p>
      </div>
    </div>
  );
};

export default WalletConnect;
