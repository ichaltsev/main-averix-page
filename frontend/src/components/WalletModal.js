import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Loader2, Wallet, AlertCircle, ExternalLink } from 'lucide-react';
import { toast } from '../hooks/use-toast';

// BNB-compatible hot wallets with official SVG logos
const BNB_WALLETS = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: `<svg width="40" height="40" viewBox="0 0 318.6 318.6" xmlns="http://www.w3.org/2000/svg"><defs><style>.a{fill:#e2761b;stroke:#e2761b;stroke-linecap:round;stroke-linejoin:round;}.b{fill:#e4761b;stroke:#e4761b;stroke-linecap:round;stroke-linejoin:round;}.c{fill:#d7c1b3;stroke:#d7c1b3;stroke-linecap:round;stroke-linejoin:round;}.d{fill:#233447;stroke:#233447;stroke-linecap:round;stroke-linejoin:round;}.e{fill:#cd6116;stroke:#cd6116;stroke-linecap:round;stroke-linejoin:round;}.f{fill:#e4751f;stroke:#e4751f;stroke-linecap:round;stroke-linejoin:round;}.g{fill:#f6851b;stroke:#f6851b;stroke-linecap:round;stroke-linejoin:round;}.h{fill:#c0ad9e;stroke:#c0ad9e;stroke-linecap:round;stroke-linejoin:round;}.i{fill:#161616;stroke:#161616;stroke-linecap:round;stroke-linejoin:round;}.j{fill:#763d16;stroke:#763d16;stroke-linecap:round;stroke-linejoin:round;}</style></defs><polygon class="a" points="274.1,35.5 174.6,109.4 193,65.8"/><polygon class="a" points="44.4,35.5 143.1,110.1 125.6,65.8"/><polygon class="a" points="238.3,206.8 211.8,247.4 268.5,262.6 283.8,207.7"/><polygon class="a" points="35.8,207.7 51.1,262.6 107.8,247.4 81.3,206.8"/><polygon class="g" points="103.6,138.2 87.8,162.1 144.1,164.6 142.1,104.1"/><polygon class="g" points="214.9,138.2 175.9,103.4 174.6,164.6 230.8,162.1"/><polygon class="g" points="107.8,247.4 140.6,230.9 111.4,208.1"/><polygon class="g" points="177.9,230.9 211.8,247.4 207.1,208.1"/></svg>`,
    downloadUrl: 'https://metamask.io/download/'
  },
  {
    id: 'trust',
    name: 'Trust Wallet',
    icon: `<svg width="40" height="40" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="a" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#3375bb"/><stop offset="100%" style="stop-color:#3375bb"/></linearGradient></defs><rect width="32" height="32" rx="6" fill="url(#a)"/><path d="M16 4l10 6v10c0 6.2-4.2 12-10 12s-10-5.8-10-12V10l10-6z" fill="#fff"/><path d="M16 6.5L8 11.5v8.5c0 4.4 3.1 8.5 8 8.5s8-4.1 8-8.5v-8.5l-8-5z" fill="#3375bb"/></svg>`,
    downloadUrl: 'https://trustwallet.com/download'
  },
  {
    id: 'binance',
    name: 'Binance Wallet',
    icon: `<svg width="40" height="40" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="6" fill="#f3ba2f"/><path d="M16 6l2.5 2.5L16 11l-2.5-2.5L16 6zm-6 6l2.5-2.5L15 12l-2.5 2.5L10 12zm12 0l2.5 2.5L22 17l-2.5-2.5L22 12zm-6 2l2.5 2.5L16 19l-2.5-2.5L16 14zm-6 3l2.5 2.5L12.5 22 10 19.5 10 17zm12 0v2.5L19.5 22 17 19.5 19 17zm-6 5l2.5-2.5L16 22l-2.5-2.5L16 22z" fill="#fff"/></svg>`,
    downloadUrl: 'https://www.binance.org/en/binance-wallet'
  },
  {
    id: 'safepal',
    name: 'SafePal',
    icon: `<svg width="40" height="40" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="6" fill="#4a90e2"/><path d="M16 4c6.6 0 12 5.4 12 12s-5.4 12-12 12S4 22.6 4 16 9.4 4 16 4zm0 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 3c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5z" fill="#fff"/></svg>`,
    downloadUrl: 'https://safepal.io/download'
  },
  {
    id: 'rabby',
    name: 'Rabby',
    icon: `<svg width="40" height="40" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="6" fill="#7084ff"/><path d="M16 4c6.6 0 12 5.4 12 12s-5.4 12-12 12S4 22.6 4 16 9.4 4 16 4zm-4 8c-1.1 0-2 0.9-2 2s0.9 2 2 2 2-0.9 2-2-0.9-2-2-2zm8 0c-1.1 0-2 0.9-2 2s0.9 2 2 2 2-0.9 2-2-0.9-2-2-2zm-4 6c-2.2 0-4 1.8-4 4h8c0-2.2-1.8-4-4-4z" fill="#fff"/></svg>`,
    downloadUrl: 'https://rabby.io/'
  }
];

const WalletModal = ({ isOpen, onClose }) => {
  const { connectWallet } = useAuth();
  const [connectingWallet, setConnectingWallet] = useState(null);

  const handleWalletConnect = async (wallet) => {
    try {
      setConnectingWallet(wallet.id);
      
      // Check if wallet is installed
      const isInstalled = checkWalletInstalled(wallet.id);
      
      if (!isInstalled) {
        // Redirect to download page
        window.open(wallet.downloadUrl, '_blank');
        return;
      }

      // Mock connection for demo - in real app this would use wallet APIs
      const mockAddress = generateMockAddress();
      const connectionData = {
        address: mockAddress,
        walletType: wallet.name,
        walletIcon: wallet.icon,
        truncatedAddress: `${mockAddress.slice(0, 6)}...${mockAddress.slice(-4)}`
      };

      // Store connection in localStorage
      localStorage.setItem('wallet_connection', JSON.stringify(connectionData));

      toast({
        title: "Wallet Connected!",
        description: `Connected to ${wallet.name}. Welcome to Averix!`,
      });
      
      onClose();
      
      // Trigger page reload to update auth state
      window.location.reload();
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Unable to connect wallet. Please try again.",
        variant: "destructive"
      });
    } finally {
      setConnectingWallet(null);
    }
  };

  const checkWalletInstalled = (walletId) => {
    // Simple wallet detection
    switch (walletId) {
      case 'metamask':
        return typeof window !== 'undefined' && !!window.ethereum;
      case 'trust':
        return typeof window !== 'undefined' && !!window.ethereum && !!window.ethereum.isTrust;
      case 'binance':
        return typeof window !== 'undefined' && !!window.BinanceChain;
      default:
        return false; // For demo, show as not installed
    }
  };

  const generateMockAddress = () => {
    return '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-[#161616] to-[#1C1C1C] border-[#2A2A2A] text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold flex items-center justify-center gap-2 text-[#E0E0E0]">
            <Wallet className="h-5 w-5" />
            Connect Wallet
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-[#B3B3B3] text-sm mb-4">
              Connect your BNB Chain wallet to access trading features and personalized dashboard.
            </p>
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#F3BA2F]/10 to-[#F3BA2F]/5 rounded-full px-4 py-2 border border-[#F3BA2F]/20">
              <div className="w-4 h-4 bg-[#F3BA2F] rounded-full flex items-center justify-center">
                <span className="text-black text-xs font-bold">B</span>
              </div>
              <span className="text-[#E0E0E0] text-sm font-medium">BNB Chain Network</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[#E0E0E0] font-semibold text-center mb-4">Choose Your Wallet</h3>
            
            <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto custom-scrollbar">
              {supportedWallets.map((wallet) => {
                const status = getWalletDetectionStatus(wallet.id);
                const isCurrentlyConnecting = connectingWallet === wallet.id;
                const clickable = isWalletClickable(wallet.id);
                
                return (
                  <Card 
                    key={wallet.id} 
                    className={`bg-gradient-to-r from-[#1C1C1C] to-[#161616] border-[#2A2A2A] hover:border-[#3A3A3A] transition-all duration-200 ${
                      clickable ? 'hover:from-[#2A2A2A] hover:to-[#1C1C1C] cursor-pointer' : 'opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <CardContent className="p-4">
                      <Button
                        onClick={() => clickable && handleWalletConnect(wallet.id)}
                        disabled={!clickable}
                        className="w-full justify-start bg-transparent hover:bg-transparent text-white border-none p-0 h-auto disabled:opacity-100"
                      >
                        <div className="flex items-center space-x-4 w-full">
                          <div 
                            className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2A2A2A] to-[#161616] border border-[#3A3A3A] flex items-center justify-center"
                            dangerouslySetInnerHTML={{ __html: wallet.icon }}
                          />
                          <div className="flex-1 text-left">
                            <div className="font-semibold text-[#E0E0E0] text-base">{wallet.name}</div>
                            <div className="text-xs text-[#9A9A9A] flex items-center gap-1 mt-1">
                              {getStatusIcon(wallet.id)}
                              <span>{getStatusText(wallet.id)}</span>
                            </div>
                          </div>
                          {isCurrentlyConnecting && (
                            <div className="text-[#9A9A9A] text-xs">
                              Connecting...
                            </div>
                          )}
                        </div>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#2A2A2A]/30 to-[#1C1C1C]/30 rounded-lg p-4 border border-[#2A2A2A]">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-[#CFCFCF] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[#E0E0E0] font-medium text-sm mb-1">Secure Connection</div>
                <p className="text-[#9A9A9A] text-xs leading-relaxed">
                  Only connect wallets you control. Never share your private keys or seed phrases. 
                  All connections are secure and your keys remain in your wallet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;