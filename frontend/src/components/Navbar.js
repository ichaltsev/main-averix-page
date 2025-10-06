import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Menu, X, LogOut, Wallet, Copy, Check } from 'lucide-react';
import WalletModal from './WalletModal';
import ThemeSwitcher from './ThemeSwitcher';
import { toast } from '../hooks/use-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [copied, setCopied] = useState(false);
  const { user, disconnectWallet } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', href: '/', section: 'hero' },
    { name: 'Trade', href: '/trade', section: 'trade' },
    { name: 'About', href: '/#about', section: 'about' },
    { name: 'Tokenomics', href: '/#tokenomics', section: 'tokenomics' },
    { name: 'Ecosystem', href: '/#ecosystem', section: 'ecosystem' },
    { name: 'Roadmap', href: '/#roadmap', section: 'roadmap' },
    { name: 'Whitepaper', href: '/whitepaper', section: 'whitepaper' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== '/') return;
      
      const sections = ['hero', 'about', 'tokenomics', 'ecosystem', 'roadmap'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const handleNavClick = (href, section) => {
    if (href.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(section);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setIsOpen(false);
  };

  const handleDisconnect = () => {
    disconnectWallet();
    navigate('/');
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected successfully.",
    });
  };

  const copyAddress = async () => {
    if (user?.address) {
      try {
        await navigator.clipboard.writeText(user.address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast({
          title: "Address Copied",
          description: "Wallet address copied to clipboard.",
        });
      } catch (err) {
        console.error('Failed to copy address:', err);
      }
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <img 
                src="https://customer-assets.emergentagent.com/job_b4f9138b-d805-4933-9217-0f17e5eccf05/artifacts/e37qpmnv_logo.png" 
                alt="Averix" 
                className="h-8 w-8 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-[#E0E0E0] to-[#B3B3B3] bg-clip-text text-transparent">
                Averix
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => handleNavClick(item.href, item.section)}
                  className={`text-sm font-medium transition-all duration-200 hover:text-[#E0E0E0] ${
                    (location.pathname === item.href || 
                     (item.section && activeSection === item.section))
                      ? 'text-[#E0E0E0] border-b border-[#FFFFFF]/50'
                      : 'text-[#B3B3B3] hover:border-b hover:border-[#FFFFFF]/30'
                  } pb-1`}
                >
                  {item.name}
                </Link>
              ))}
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm" className="border-[#2A2A2A] text-[#E0E0E0] hover:bg-[#1C1C1C] hover:border-[#3A3A3A]">
                      Dashboard
                    </Button>
                  </Link>
                  
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-[#1C1C1C]/80 to-[#161616]/60 rounded-full px-3 py-2 border border-[#2A2A2A]">
                    <div 
                      className="w-5 h-5 wallet-icon"
                      dangerouslySetInnerHTML={{ __html: user.walletIcon }}
                    />
                    <span className="text-sm text-[#E0E0E0] font-mono">{user.truncatedAddress}</span>
                    <button
                      onClick={copyAddress}
                      className="text-[#9A9A9A] hover:text-[#E0E0E0] transition-colors"
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </button>
                  </div>
                  
                  <Button 
                    onClick={handleDisconnect}
                    variant="ghost" 
                    size="sm" 
                    className="text-[#B3B3B3] hover:text-[#E0E0E0] hover:bg-[#1C1C1C]"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => setIsWalletModalOpen(true)}
                  className="bg-[#E0E0E0] text-[#0A0A0A] hover:bg-[#FFFFFF] transition-all duration-200 shadow-[0_0_20px_rgba(224,224,224,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#B3B3B3] hover:text-[#E0E0E0] transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-[#161616]/95 backdrop-blur-md border-t border-[#2A2A2A]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => handleNavClick(item.href, item.section)}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    (location.pathname === item.href || 
                     (item.section && activeSection === item.section))
                      ? 'text-[#E0E0E0] bg-[#1C1C1C]'
                      : 'text-[#B3B3B3] hover:text-[#E0E0E0] hover:bg-[#1C1C1C]/50'
                  } rounded-md`}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-2 border-t border-[#2A2A2A] mt-2">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2">
                      <div className="flex items-center space-x-2 text-[#E0E0E0] text-sm">
                        <div 
                          className="w-4 h-4 wallet-icon"
                          dangerouslySetInnerHTML={{ __html: user.walletIcon }}
                        />
                        <span className="font-mono">{user.truncatedAddress}</span>
                      </div>
                    </div>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full border-[#2A2A2A] text-[#E0E0E0] hover:bg-[#1C1C1C]">
                        Dashboard
                      </Button>
                    </Link>
                    <Button 
                      onClick={handleDisconnect}
                      variant="ghost" 
                      className="w-full text-[#B3B3B3] hover:text-[#E0E0E0] hover:bg-[#1C1C1C]"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => {
                      setIsWalletModalOpen(true);
                      setIsOpen(false);
                    }}
                    className="w-full bg-[#E0E0E0] text-[#0A0A0A] hover:bg-[#FFFFFF]"
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    Connect Wallet
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;