
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useMetaMask } from '../hooks/useMetaMask';
import './WalletConnect.css';
import { MyPetNFTs } from './MyPetNFTs';

const WalletConnect: FC = () => {
  const { t } = useTranslation();
  const {
    account,
    isConnected,
    network,
    isLoading,
    error,
    isMetaMaskInstalled,
    connectWallet,
    disconnectWallet,
    formatAddress,
  } = useMetaMask();

  if (!isMetaMaskInstalled) {
    return (
      <div className="wallet-connect">
        <div className="wallet-status error">
          <h3>{t('walletConnect.messages.metamaskNotFound')}</h3>
          <a
            href="https://metamask.io/download/"
            target="_blank"
            rel="noopener noreferrer"
            className="install-button"
          >
            Install MetaMask
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
          <h3>{t('walletConnect.title')}</h3>
          <p>{t('walletConnect.subtitle')}</p>
          <button
            onClick={connectWallet}
            disabled={isLoading}
            className="connect-button"
          >
            {isLoading ? (
              <span>
                <span className="spinner"></span>
                {t('walletConnect.connectingButton')}
              </span>
            ) : (
              <span>
                🦊 {t('walletConnect.connectButton')}
              </span>
            )}
          </button>
        </div>
      ) : (
        <div className="connected-section">
          <div className="account-info">
            <h3>✅ {t('walletConnect.connectedButton')}</h3>
            <div className="account-details">
              <div className="detail-item">
                <label>{t('walletConnect.account')}:</label>
                <span className="address">{account ? formatAddress(account) : ''}</span>
              </div>
              {network && typeof network === 'object' && 'name' in network && 'chainId' in network && (
                <div className="detail-item">
                  <label>{t('walletConnect.network')}:</label>
                  <span className="network">
                    {String((network as any).name)} (ID: {String((network as any).chainId)})
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="actions">
            <button onClick={disconnectWallet} className="disconnect-button">
              {t('walletConnect.disconnectButton')}
            </button>
          </div>
        </div>
      )}

      <div className="info-section">
        <h4>ℹ️ {t('walletConnect.about.title')}</h4>
        <p>
          {t('walletConnect.about.description')}
        </p>
      </div>
      <MyPetNFTs />
    </div>
  );
};

export default WalletConnect;
