import HeroV3 from '@/components/HeroV3'
import MarketData from '@/components/MarketData'
import ProfessionalGuidance from '@/components/ProfessionalGuidance'
import DubaiPropertyBenefits from '@/components/DubaiPropertyBenefits'
import WhyInvestFinal from '@/components/WhyInvestFinal'
import InvestmentThresholds from '@/components/InvestmentThresholds'
import MarketSupplyDemand from '@/components/MarketSupplyDemand'
import ClientSuccessStories from '@/components/ClientSuccessStories'
import MaxMcCarthyProfile from '@/components/MaxMcCarthyProfile'
import FAQ from '@/components/FAQ'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroV3 />
      <MarketData />
      <ProfessionalGuidance />
      <DubaiPropertyBenefits />
      <WhyInvestFinal />
      <InvestmentThresholds />
      <MarketSupplyDemand />
      <ClientSuccessStories />
      <MaxMcCarthyProfile />
      <FAQ />
    </main>
  )
}