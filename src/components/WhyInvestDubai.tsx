export default function WhyInvestDubai() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header Box */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-12 text-center mb-16 max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            WHY INVEST IN COMMERCIAL PROPERTY IN DUBAI
          </h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Discover the compelling advantages that make Dubai's commercial property market a standout choice for savvy investors
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          {/* Top Row */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* 8-10% net yields */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">8-10%</span>
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-xl mb-1">8–10% net yields</h3>
                <p className="text-gray-600">Cash flow is king</p>
              </div>
            </div>

            {/* 0% tax */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">0%</span>
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-xl mb-1">0% tax on gains & income</h3>
                <p className="text-gray-600">Keep 100% of profits</p>
              </div>
            </div>

            {/* Stable tenants */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-xl mb-1">Stable tenants</h3>
                <p className="text-gray-600">Professional businesses</p>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* 1-5+ year leases */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">1-5Y</span>
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-xl mb-1">1–5+ year leases</h3>
                <p className="text-gray-600">Long-term security</p>
              </div>
            </div>

            {/* Rents up 36% */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">+36%</span>
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-xl mb-1">Rents up 36% (Q2 2025)</h3>
                <p className="text-gray-600">Strong market performance</p>
              </div>
            </div>

            {/* Capital values */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">+23.7%</span>
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-xl mb-1">Capital values +23.7%</h3>
                <p className="text-gray-600">Exceptional capital growth</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Box */}
        <div className="bg-gray-100 rounded-2xl p-8 max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center justify-center space-x-2">
            <span>💡</span>
            <span>Ready to explore these advantages for your portfolio?</span>
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Schedule a free consultation to discuss how Dubai's commercial property market can benefit your investment strategy and maximize your returns
          </p>
        </div>
      </div>
    </section>
  )
}