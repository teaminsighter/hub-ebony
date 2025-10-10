export default function MarketSupplyDemand() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Strong Demand with Limited Supply vs. Residential
          </h2>
          <p className="text-lg text-blue-200 max-w-4xl mx-auto">
            Market fundamentals supporting continued commercial property outperformance
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left Side - Market Supply Context */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl">📊</span>
              <h3 className="text-2xl font-bold text-white">Market Supply Context</h3>
            </div>

            {/* Residential Supply */}
            <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-6 border border-blue-700/30">
              <h4 className="text-xl font-bold text-white mb-4">Residential Supply</h4>
              <div className="space-y-2 text-blue-200">
                <p>• 137,000 units launched in 2024 (record)</p>
                <p>• 73,000 announced for 2025</p>
                <p>• Only ~62% of targeted units likely to complete due to delays</p>
              </div>
            </div>

            {/* Commercial Supply */}
            <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-6 border border-blue-700/30">
              <h4 className="text-xl font-bold text-white mb-4">Commercial Supply</h4>
              <div className="space-y-2 text-blue-200">
                <p>• Supply remains thin with limited future pipeline</p>
                <p>• Just 34,000 sq m delivered in H1 2025</p>
                <p>• Total stock ~3.3m sq m with only incremental additions ahead</p>
              </div>
            </div>
          </div>

          {/* Right Side - Demand Per Business Zone */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl">🏢</span>
              <h3 className="text-2xl font-bold text-white">Demand Per Business Zone</h3>
            </div>

            {/* DMCC */}
            <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-6 border border-blue-700/30">
              <h4 className="text-xl font-bold text-white mb-3">DMCC</h4>
              <p className="text-blue-200">26,000+ companies, with 1,100 added in H1 2025</p>
            </div>

            {/* DIFC */}
            <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-6 border border-blue-700/30">
              <h4 className="text-xl font-bold text-white mb-3">DIFC</h4>
              <p className="text-blue-200">7,000+ companies, strongest year for new registrations</p>
            </div>

            {/* Mainland & Free Zones */}
            <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-6 border border-blue-700/30">
              <h4 className="text-xl font-bold text-white mb-3">Mainland & Free Zones</h4>
              <p className="text-blue-200">
                By March 2025: Nearly 990,000 business licenses issued (up from ~950,000 end-2024) — 59% of UAE total
              </p>
            </div>
          </div>
        </div>

        {/* Investment Insight */}
        <div className="bg-blue-700/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-600/30">
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-2xl">💡</span>
            <h3 className="text-2xl font-bold text-white">Investment Insight</h3>
          </div>
          <p className="text-blue-200 leading-relaxed text-lg">
            Commercial investment means fewer tenants to manage, larger rent rolls, and professional occupiers who understand business — less emotion, more certainty, and clear lease terms. For investors diversifying from residential or seeking stronger cash flow, commercial is where the smart money is moving in 2025 and beyond.
          </p>
        </div>
      </div>
    </section>
  )
}