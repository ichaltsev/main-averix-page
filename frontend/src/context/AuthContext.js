import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Top 5 BNB Hot Wallets Only
const SUPPORTED_WALLETS = [
  { 
    id: 'metamask', 
    name: 'MetaMask', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 2.28L13.67 8.95L15.37 4.85L22.56 2.28Z" fill="#E17726" stroke="#E17726" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M1.44 2.28L10.29 9L8.63 4.85L1.44 2.28Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M19.23 17.05L16.92 20.85L22.11 22.28L23.58 17.15L19.23 17.05Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M0.43 17.15L1.89 22.28L7.08 20.85L4.77 17.05L0.43 17.15Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.77 10.65L5.31 12.75L10.45 12.98L10.29 7.48L6.77 10.65Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M17.23 10.65L13.67 7.43L13.55 12.98L18.69 12.75L17.23 10.65Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7.08 20.85L10.06 19.4L7.52 17.18L7.08 20.85Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13.94 19.4L16.92 20.85L16.48 17.18L13.94 19.4Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    detected: () => typeof window !== 'undefined' && window.ethereum?.isMetaMask
  },
  { 
    id: 'trustwallet', 
    name: 'Trust Wallet', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill="#3375BB"/>
      <path d="M12 7l-4 2.5v2.5c0 2.21 1.79 4 4 4s4-1.79 4-4v-2.5L12 7z" fill="white"/>
    </svg>`,
    detected: () => typeof window !== 'undefined' && window.ethereum?.isTrust
  },
  { 
    id: 'binancewallet', 
    name: 'Binance Wallet', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L22 7v10l-10 5L2 17V7l10-5z" fill="#F3BA2F"/>
      <path d="M12 7l-3 1.5v3L12 13l3-1.5v-3L12 7z" fill="#000"/>
      <path d="M8 10.5L5 12v3l3-1.5v-3zM16 10.5v3l3 1.5v-3l-3-1.5z" fill="#000"/>
    </svg>`,
    detected: () => typeof window !== 'undefined' && window.BinanceChain
  },
  { 
    id: 'safepal', 
    name: 'SafePal', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#4285F4"/>
      <path d="M8 12l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 6v12M6 12h12" stroke="white" stroke-width="1" opacity="0.3"/>
    </svg>`,
    detected: () => typeof window !== 'undefined' && window.ethereum?.isSafePal
  },
  { 
    id: 'rabby', 
    name: 'Rabby Wallet', 
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#7084FF"/>
      <path d="M8 10c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2v-2z" fill="white"/>
      <circle cx="10" cy="10" r="1" fill="#7084FF"/>
      <circle cx="14" cy="10" r="1" fill="#7084FF"/>
      <path d="M10 14c1 1 3 1 4 0" stroke="white" stroke-width="1" stroke-linecap="round"/>
    </svg>`,
    detected: () => typeof window !== 'undefined' && window.ethereum?.isRabby
  }
];

const generateMockAddress = (walletId) => {
  const addresses = {
    metamask: '0x742d35Cc6641C396b9db2093E69aA4b295e5A9F7',
    trustwallet: '0x8E8C1A4b7e6D4f5A3B2C9D8E7F6A5B4C3D2E1F0A',
    binancewallet: '0x1B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C',
    safepal: '0x9A8B7C6D5E4F3A2B1C0D9E8F7A6B5C4D3E2F1A0B',
    rabby: '0x5D4C3B2A1F0E9D8C7B6A5F4E3D2C1B0A9F8E7D6C'
  };
  return addresses[walletId] || '0x742d35Cc6641C396b9db2093E69aA4b295e5A9F7';
};

const truncateAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Check for stored wallet connection from new clean system
    const storedConnection = localStorage.getItem('wallet_connection');
    if (storedConnection) {
      try {
        const connectionData = JSON.parse(storedConnection);
        setUser(connectionData);
      } catch (error) {
        console.warn('Failed to parse stored wallet connection');
        localStorage.removeItem('wallet_connection');
      }
    }
  }, []);

  const connectWallet = async (walletId) => {
    setIsConnecting(true);
    
    try {
      // Simulate wallet connection delay
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const selectedWallet = SUPPORTED_WALLETS.find(w => w.id === walletId);
      const address = generateMockAddress(walletId);
      
      const userData = {
        id: walletId,
        walletId,
        walletName: selectedWallet?.name || 'Unknown Wallet',
        walletIcon: selectedWallet?.icon || '',
        address,
        truncatedAddress: truncateAddress(address),
        network: 'BNB Chain',
        level: 'Bronze',
        connectedAt: new Date().toISOString()
      };
      
      setUser(userData);
      localStorage.setItem('averix_wallet_user', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      throw new Error('Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setUser(null);
    localStorage.removeItem('averix_wallet_user');
  };

  const getWalletDetectionStatus = (walletId) => {
    if (detectingWallets) return 'detecting';
    const wallet = SUPPORTED_WALLETS.find(w => w.id === walletId);
    return wallet?.detected() ? 'installed' : 'not_installed';
  };

  const value = {
    user,
    loading,
    isConnecting,
    connectWallet,
    disconnectWallet,
    supportedWallets: SUPPORTED_WALLETS,
    getWalletDetectionStatus,
    truncateAddress
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};