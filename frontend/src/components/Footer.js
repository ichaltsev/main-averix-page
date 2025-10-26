import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle, ExternalLink, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

// Social Media Icons
const TelegramIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-1.58 7.44c-.12.54-.432.672-.864.42l-2.4-1.764-1.152 1.116c-.12.12-.24.24-.48.24l.156-2.244 4.332-3.912c.192-.156-.036-.252-.312-.096L9.816 12.78l-2.292-.72c-.492-.156-.504-.492.12-.732L20.292 7.74c.42-.156.78.096.636.72z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const DiscordIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
  </svg>
);

const MediumIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gradient-to-t from-[#081F2C] via-[#0A0A0A] to-[#0A0A0A] border-t border-[#2EE6D6]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="https://customer-assets.emergentagent.com/job_b4f9138b-d805-4933-9217-0f17e5eccf05/artifacts/e37qpmnv_logo.png" 
                alt="Averix" 
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-white">Averix</span>
            </div>
            <p className="text-[#A4F4F9] mb-6 max-w-sm">
              Building the future of decentralized finance through disciplined prop trading with Web3 incentives.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://t.me/averix_official" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#2EE6D6] hover:text-[#A4F4F9] transition-colors p-2 rounded-lg hover:bg-[#2EE6D6]/10"
                title="Join Telegram"
              >
                <TelegramIcon />
              </a>
              <a 
                href="https://twitter.com/averix_finance" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#2EE6D6] hover:text-[#A4F4F9] transition-colors p-2 rounded-lg hover:bg-[#2EE6D6]/10"
                title="Follow on X"
              >
                <TwitterIcon />
              </a>
              <a 
                href="https://discord.gg/averix" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#2EE6D6] hover:text-[#A4F4F9] transition-colors p-2 rounded-lg hover:bg-[#2EE6D6]/10"
                title="Join Discord"
              >
                <DiscordIcon />
              </a>
              <a 
                href="https://medium.com/@averix" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#2EE6D6] hover:text-[#A4F4F9] transition-colors p-2 rounded-lg hover:bg-[#2EE6D6]/10"
                title="Read on Medium"
              >
                <MediumIcon />
              </a>
            </div>

            {/* Email Subscription */}
            <div className="max-w-sm">
              <h4 className="text-white font-semibold mb-2">Stay Updated</h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#081F2C] border-[#2EE6D6]/30 text-white placeholder:text-gray-400"
                  required
                />
                <Button 
                  type="submit"
                  size="sm"
                  className="bg-[#2EE6D6] text-[#081F2C] hover:bg-[#A4F4F9] shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              {subscribed && (
                <p className="text-[#2EE6D6] text-sm mt-2">Thanks for subscribing!</p>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/#about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/#tokenomics" className="text-gray-300 hover:text-white transition-colors">
                  Tokenomics
                </Link>
              </li>
              <li>
                <Link to="/#ecosystem" className="text-gray-300 hover:text-white transition-colors">
                  Ecosystem
                </Link>
              </li>
              <li>
                <Link to="/#roadmap" className="text-gray-300 hover:text-white transition-colors">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link to="/whitepaper" className="text-gray-300 hover:text-white transition-colors">
                  Whitepaper
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-gray-300 hover:text-white transition-colors text-left">
                  Terms of Service
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors text-left">
                  Risk Disclosure
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors text-left">
                  Documentation
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2EE6D6]/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © {currentYear} Averix. All rights reserved.
              </p>
              <p className="text-[#2EE6D6] text-sm mt-1">
                Backed by the Averix community. Launching Q4 2025.
              </p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Founder: Ivan Chaltsev</span>
              <a 
                href="mailto:averix.found@gmail.com" 
                className="hover:text-[#2EE6D6] transition-colors flex items-center"
              >
                Contact <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;