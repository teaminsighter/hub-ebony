export default function InvestmentThresholds() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-700/30 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="text-white text-sm font-semibold uppercase tracking-wide">
              📊 MARKET INTELLIGENCE
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Investment Thresholds & Market Context
          </h2>
          <p className="text-lg text-blue-200 max-w-4xl mx-auto">
            Understanding minimum investment requirements and the market dynamics driving Dubai's commercial property success
          </p>
        </div>

        {/* Minimum Investment Requirements */}
        <div className="bg-blue-800/30 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-blue-700/30">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Minimum Investment Requirements</h3>
            <p className="text-blue-200">Professional commercial property investment typically starts from:</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {/* AED */}
            <div className="bg-blue-700/50 backdrop-blur-sm rounded-lg p-6 text-center border border-blue-600/30">
              <div className="text-2xl font-bold text-white mb-2">AED 3M+</div>
              <div className="text-blue-200 text-sm">UAE Dirhams</div>
              <div className="text-blue-300 text-xs mt-1">Base currency</div>
            </div>

            {/* GBP */}
            <div className="bg-blue-700/50 backdrop-blur-sm rounded-lg p-6 text-center border border-blue-600/30">
              <div className="text-2xl font-bold text-white mb-2">£630K+</div>
              <div className="text-blue-200 text-sm">British Pounds</div>
              <div className="text-blue-300 text-xs mt-1">GBP equivalent</div>
            </div>

            {/* USD */}
            <div className="bg-blue-700/50 backdrop-blur-sm rounded-lg p-6 text-center border border-blue-600/30">
              <div className="text-2xl font-bold text-white mb-2">$810K+</div>
              <div className="text-blue-200 text-sm">US Dollars</div>
              <div className="text-blue-300 text-xs mt-1">USD equivalent</div>
            </div>

            {/* AUD */}
            <div className="bg-blue-700/50 backdrop-blur-sm rounded-lg p-6 text-center border border-blue-600/30">
              <div className="text-2xl font-bold text-white mb-2">A$1.23M+</div>
              <div className="text-blue-200 text-sm">Australian Dollars</div>
              <div className="text-blue-300 text-xs mt-1">AUD equivalent</div>
            </div>

            {/* NZD */}
            <div className="bg-blue-700/50 backdrop-blur-sm rounded-lg p-6 text-center border border-blue-600/30">
              <div className="text-2xl font-bold text-white mb-2">NZ$1.38M+</div>
              <div className="text-blue-200 text-sm">New Zealand Dollars</div>
              <div className="text-blue-300 text-xs mt-1">NZD equivalent</div>
            </div>
          </div>
        </div>

        {/* Bottom Two Boxes */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Why Dubai Attracts Global Capital */}
          <div className="bg-blue-800/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-700/30">
            <h3 className="text-2xl font-bold text-white mb-6">Why Dubai Attracts Global Capital</h3>
            <div className="space-y-4 text-blue-200 leading-relaxed">
              <p>
                Dubai offers a safe, family-friendly environment, year-round sunshine, world-class infrastructure, and a lifestyle that continues to attract people and businesses from across the globe.
              </p>
              <p>
                Global companies are relocating here to benefit from Dubai's tax-free environment, fueling even stronger growth in demand for quality commercial space.
              </p>
            </div>
          </div>

          {/* Commercial: Dubai's Best-Kept Secret */}
          <div className="bg-blue-800/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-700/30">
            <h3 className="text-2xl font-bold text-white mb-6">Commercial: Dubai's Best-Kept Secret</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-blue-200">8–10% net yields (cash flow is king)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                <span className="text-blue-200">0% tax on gains & income</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-blue-200">Stable tenants</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span className="text-blue-200">1–5+ year leases</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-blue-200">Rents up 36% (Q2 2025)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-blue-200">Capital values +23.7%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}