import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Shield, TrendingUp, Award, Users } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Enforced risk rules with position limits, mandatory SL/TP, and violation tracking for disciplined trading.'
    },
    {
      icon: TrendingUp,
      title: 'Merit-Based Progression',
      description: 'Level up from Bronze to Prime through seasonal performance with transparent, on-chain achievements.'
    },
    {
      icon: Award,
      title: 'Seasonal Competitions',
      description: '30-day seasons with public leaderboards, rewards, and recognition for top performing traders.'
    },
    {
      icon: Users,
      title: 'Copy Trading',
      description: 'Follow Prime traders and copy their strategies with built-in risk guardrails and transparent metrics.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#161616]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-space-grotesk">
            <span className="bg-gradient-to-r from-[#E0E0E0] to-[#B3B3B3] bg-clip-text text-transparent">
              About Averix
            </span>
          </h2>
          <p className="text-xl text-[#B3B3B3] max-w-3xl mx-auto leading-relaxed">
            Averix revolutionizes prop trading by combining the discipline of traditional prop firms 
            with the transparency and incentives of Web3. Our platform enforces risk management 
            while rewarding merit through seasonal competitions and progressive leveling.
          </p>
        </div>

        {/* For Traders / For Investors Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-[#081F2C]/50 to-[#0A0A0A]/50 border-[#2EE6D6]/20 hover:border-[#2EE6D6]/40 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <TrendingUp className="h-8 w-8 text-[#2EE6D6] mr-3" />
                <h3 className="text-2xl font-bold text-[#2EE6D6]">For Traders</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#2EE6D6] rounded-full mt-2 flex-shrink-0" />
                  <p className="text-[#B3B3B3] leading-relaxed">Trade with enforced risk management and mandatory stop-losses</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#2EE6D6] rounded-full mt-2 flex-shrink-0" />
                  <p className="text-[#B3B3B3] leading-relaxed">Compete in 30-day seasons for rewards and recognition</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#2EE6D6] rounded-full mt-2 flex-shrink-0" />
                  <p className="text-[#B3B3B3] leading-relaxed">Level up from Bronze to Prime through merit-based progression</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#081F2C]/50 to-[#0A0A0A]/50 border-[#A4F4F9]/20 hover:border-[#A4F4F9]/40 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Users className="h-8 w-8 text-[#A4F4F9] mr-3" />
                <h3 className="text-2xl font-bold text-[#A4F4F9]">For Investors</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#A4F4F9] rounded-full mt-2 flex-shrink-0" />
                  <p className="text-[#B3B3B3] leading-relaxed">Stake TFT tokens and earn rewards from trader performance</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#A4F4F9] rounded-full mt-2 flex-shrink-0" />
                  <p className="text-[#B3B3B3] leading-relaxed">Copy trade with Prime traders using transparent strategies</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#A4F4F9] rounded-full mt-2 flex-shrink-0" />
                  <p className="text-[#B3B3B3] leading-relaxed">Access verifiable on-chain performance metrics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learn More Button */}
        <div className="text-center mb-16">
          <Link to="/whitepaper" className="inline-block">
            <Button 
              variant="outline" 
              size="lg"
              className="border-[#2EE6D6] text-[#2EE6D6] hover:bg-[#2EE6D6] hover:text-[#081F2C] transition-all duration-300"
            >
              Learn More in Whitepaper
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-[#E0E0E0] mb-6 font-space-grotesk">The Problem We Solve</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#E0E0E0] rounded-full mt-2 flex-shrink-0" />
                <p className="text-[#B3B3B3] leading-relaxed">Retail traders struggle with risk discipline and transparent performance tracking</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#E0E0E0] rounded-full mt-2 flex-shrink-0" />
                <p className="text-[#B3B3B3] leading-relaxed">Traditional prop firms are off-chain and permissioned, limiting openness</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#E0E0E0] rounded-full mt-2 flex-shrink-0" />
                <p className="text-[#B3B3B3] leading-relaxed">Lack of verifiable trader identity and merit-based progression systems</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#1C1C1C]/80 to-[#161616]/60 rounded-2xl p-8 backdrop-blur-sm border border-[#2A2A2A]">
            <h3 className="text-2xl font-bold text-[#E0E0E0] mb-4 font-space-grotesk">Our Solution</h3>
            <p className="text-[#B3B3B3] text-lg leading-relaxed">
              An on-chain-aware, risk-enforced trading environment with seasonal merit systems 
              and aligned incentives. Trade with confidence knowing every action is transparent, 
              every achievement is verifiable, and every reward is earned through skill.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="bg-gradient-to-br from-[#1C1C1C]/80 to-[#161616]/60 border-[#2A2A2A] hover:border-[#3A3A3A] transition-all duration-300 group card-hover backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#2A2A2A] to-[#1C1C1C] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-[#3A3A3A]">
                    <Icon className="h-8 w-8 text-[#E0E0E0]" />
                  </div>
                  <h4 className="text-xl font-semibold text-[#E0E0E0] mb-3">{feature.title}</h4>
                  <p className="text-[#B3B3B3] text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-[#1C1C1C]/80 to-[#161616]/60 rounded-full px-8 py-4 backdrop-blur-sm border border-[#2A2A2A]">
            <span className="text-[#E0E0E0] font-semibold">How it works:</span>
            <div className="flex items-center space-x-2">
              <span className="text-[#B3B3B3]">Stake TFT</span>
              <div className="w-2 h-2 bg-[#E0E0E0] rounded-full" />
              <span className="text-[#B3B3B3]">Trade (Risk-Managed)</span>
              <div className="w-2 h-2 bg-[#E0E0E0] rounded-full" />
              <span className="text-[#B3B3B3]">Earn Rewards</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;