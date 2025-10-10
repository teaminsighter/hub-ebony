export default function MaxMcCarthyProfile() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Professional Photo */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg overflow-hidden shadow-xl">
                {/* Mock professional photo background */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200/50 to-orange-300/30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-32 h-32 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-4xl font-bold">MM</span>
                      </div>
                      <div className="text-lg font-semibold">Max McCarthy</div>
                      <div className="text-sm opacity-90">Professional Photo</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Profile Content */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-4xl font-bold text-blue-600 mb-2">Max McCarthy</h2>
                <p className="text-xl text-teal-600 font-semibold mb-4">Senior Commercial Property Adviser</p>
                
                {/* Rating */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 font-semibold">8+ Years Experience</span>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  I work alongside Dubai's market-leading commercial team at <span className="font-semibold text-blue-600">Equity Real Estate</span>, delivering results across the city's commercial sector with 8+ years of experience across UAE and New Zealand markets.
                </p>
                <p>
                  I help investors identify opportunities, navigate transactions, and maximize long-term value through strategic deal-making and market expertise.
                </p>
              </div>

              {/* Professional Credentials */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Credentials</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Left Column */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Licensed Real Estate Agent</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">RERA Certified Professional</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Commercial Investment Specialist</span>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700">AED 89M+ Client Investments</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700">98% Client Satisfaction</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700">150+ Successful Transactions</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Client Testimonial */}
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
                <p className="text-gray-700 italic mb-4 leading-relaxed">
                  "Max's deep market knowledge and professional approach made our Dubai commercial property investment seamless. His guidance on lease structures and tenant quality was invaluable."
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-600">- Sarah M, UK Property Investor</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
                  Book a time to chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}