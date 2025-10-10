export default function MarketData() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl">🏆</span>
            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              MARKET PERFORMANCE DATA
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Q4 2024 Commercial Property Market Data
          </h2>
          <p className="text-lg text-gray-600">
            Live data from Q4 2024 commercial property market
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Top Row */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* 90% Occupancy */}
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">90%</span>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">90%+ Occupancy</h3>
              <p className="text-gray-600 mb-4">Prime business districts</p>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-sm font-semibold text-blue-700">Stable tenant demand</span>
              </div>
            </div>

            {/* Long Lease Terms */}
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-xl font-bold">1-5Y</span>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Long Lease Terms</h3>
              <p className="text-gray-600 mb-4">Predictable income streams</p>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-sm font-semibold text-blue-700">Business tenants</span>
              </div>
            </div>

            {/* Rent Growth */}
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-xl font-bold">+17%</span>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Rent Growth</h3>
              <p className="text-gray-600 mb-4">Year-on-year increase</p>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-sm font-semibold text-blue-700">Market strength</span>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Invested YTD */}
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="mb-6">
                <div className="text-4xl font-bold text-blue-900 mb-2">$2.1B</div>
                <h3 className="text-xl font-bold text-blue-900">Invested YTD</h3>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <span>📈</span>
                <span className="text-sm">Market activity</span>
              </div>
            </div>

            {/* Transactions */}
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="mb-6">
                <div className="text-4xl font-bold text-blue-900 mb-2">847</div>
                <h3 className="text-xl font-bold text-blue-900">Transactions</h3>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <span>🏢</span>
                <span className="text-sm">Completed deals</span>
              </div>
            </div>

            {/* Satisfaction */}
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="mb-6">
                <div className="text-4xl font-bold text-blue-900 mb-2">8.4/10</div>
                <h3 className="text-xl font-bold text-blue-900">Satisfaction</h3>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <span>⭐</span>
                <span className="text-sm">Investor rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}