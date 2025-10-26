import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { ArrowRight, Download, MessageCircle, Wallet } from 'lucide-react';
import WalletModal from '../WalletModal';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#161616] to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
        
        {/* Refined Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse duration-[4s]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Enhanced Logo Animation */}
          <div className={`mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <img 
              src="https://customer-assets.emergentagent.com/job_b4f9138b-d805-4933-9217-0f17e5eccf05/artifacts/e37qpmnv_logo.png" 
              alt="Averix" 
              className="h-20 w-20 mx-auto mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all duration-300"
              style={{
                filter: isLoaded ? 'none' : 'blur(4px)',
                transform: isLoaded ? 'scale(1)' : 'scale(0.9)'
              }}
            />
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 font-space-grotesk">
              <span className="bg-gradient-to-r from-[#FFFFFF] via-[#E0E0E0] to-[#B3B3B3] bg-clip-text text-transparent">
                Averix
              </span>
            </h1>
          </div>

          {/* Enhanced Main Content */}
          <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-4 text-[#2EE6D6]">
              Risk-Managed Web3 Prop Trading Platform
            </h2>
            
            <h3 className="text-xl sm:text-2xl font-semibold mb-8 text-[#A4F4F9]">
              Stake, Trade, Earn.
            </h3>
            
            <p className="text-lg sm:text-xl text-[#9A9A9A] mb-12 max-w-3xl mx-auto leading-relaxed">
              A decentralized prop trading platform that combines trading discipline with Web3 incentives. 
              Connect your wallet, trade with enforced risk management, and earn rewards through seasonal competitions.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              {user ? (
                <Link to="/dashboard">
                  <Button 
                    size="lg" 
                    className="group bg-[#E0E0E0] text-[#0A0A0A] hover:bg-[#FFFFFF] transition-all duration-300 text-lg px-8 py-6 font-semibold shadow-[0_0_20px_rgba(224,224,224,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  >
                    Open Dashboard
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              ) : (
                <Button 
                  onClick={() => setIsWalletModalOpen(true)}
                  size="lg" 
                  className="group bg-[#E0E0E0] text-[#0A0A0A] hover:bg-[#FFFFFF] transition-all duration-300 text-lg px-8 py-6 font-semibold shadow-[0_0_20px_rgba(224,224,224,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  Connect Wallet
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}
              
              <Button 
                onClick={() => scrollToSection('about')}
                variant="outline" 
                size="lg" 
                className="group border-[#2A2A2A] text-[#E0E0E0] hover:bg-[#1C1C1C] hover:border-[#3A3A3A] transition-all duration-300 text-lg px-8 py-6 font-semibold"
              >
                Explore Platform
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Enhanced Secondary Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link to="/whitepaper">
                <Button 
                  variant="ghost" 
                  size="lg"
                  className="group text-[#B3B3B3] hover:text-[#E0E0E0] hover:bg-[#1C1C1C]/50 transition-all duration-300 text-lg px-8 py-6 font-semibold"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Read Whitepaper
                </Button>
              </Link>
              
              <Button 
                variant="ghost" 
                size="lg"
                className="group text-[#B3B3B3] hover:text-[#E0E0E0] hover:bg-[#1C1C1C]/50 transition-all duration-300 text-lg px-8 py-6 font-semibold"
                onClick={() => window.open('https://t.me/averix_founder', '_blank')}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Join Community
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center group cursor-default">
                <div className="text-3xl font-bold text-[#E0E0E0] mb-2 group-hover:scale-110 transition-transform duration-300 font-space-grotesk">5%</div>
                <div className="text-[#9A9A9A] text-sm uppercase tracking-wider">Max Position Size</div>
              </div>
              <div className="text-center group cursor-default">
                <div className="text-3xl font-bold text-[#E0E0E0] mb-2 group-hover:scale-110 transition-transform duration-300 font-space-grotesk">30</div>
                <div className="text-[#9A9A9A] text-sm uppercase tracking-wider">Day Seasons</div>
              </div>
              <div className="text-center group cursor-default">
                <div className="text-3xl font-bold text-[#E0E0E0] mb-2 group-hover:scale-110 transition-transform duration-300 font-space-grotesk">360</div>
                <div className="text-[#9A9A9A] text-sm uppercase tracking-wider">Max Stake Days</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#2A2A2A] rounded-full flex justify-center bg-gradient-to-b from-transparent to-[#1C1C1C]/20">
            <div className="w-1 h-3 bg-[#E0E0E0]/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
      />
    </>
  );
};

export default Hero;