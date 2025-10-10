export default function ProfessionalGuidance() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <span className="text-yellow-400 text-xl">⭐</span>
            <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wide">
              PROFESSIONAL GUIDANCE
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How Can I Help You
          </h2>
          <p className="text-lg text-blue-200 max-w-3xl mx-auto">
            Expert guidance through Dubai's commercial property landscape with personalized service and market insights
          </p>
        </div>

        {/* Services Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Walk through current listings */}
            <div className="bg-blue-800/50 backdrop-blur-sm rounded-lg p-8 text-center border border-blue-700/30">
              <div className="w-16 h-16 bg-blue-700/50 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Walk through current listings</h3>
              <p className="text-blue-200 leading-relaxed">
                Review available properties that match your investment criteria and budget with detailed market analysis
              </p>
            </div>

            {/* Understand lease structures */}
            <div className="bg-blue-800/50 backdrop-blur-sm rounded-lg p-8 text-center border border-blue-700/30">
              <div className="w-16 h-16 bg-blue-700/50 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Understand lease structures</h3>
              <p className="text-blue-200 leading-relaxed">
                Learn how Dubai's commercial leases work and what to expect from tenants including covenant strength
              </p>
            </div>

            {/* Check your expected net yield */}
            <div className="bg-blue-800/50 backdrop-blur-sm rounded-lg p-8 text-center border border-blue-700/30">
              <div className="w-16 h-16 bg-blue-700/50 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Check your expected net yield</h3>
              <p className="text-blue-200 leading-relaxed">
                Calculate realistic returns based on your specific investment goals and current market conditions
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Features */}
        <div className="bg-blue-800/30 backdrop-blur-sm rounded-lg p-8 max-w-4xl mx-auto border border-blue-700/30">
          <div className="flex flex-wrap justify-center items-center gap-8 mb-6">
            {/* Free consultation */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-700/50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <span className="text-white font-semibold">Free consultation</span>
            </div>

            {/* No obligation */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-700/50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <span className="text-white font-semibold">No obligation</span>
            </div>

            {/* Professional advice */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-700/50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <span className="text-white font-semibold">Professional advice</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-blue-200">
              All guidance is complimentary as part of our advisory service
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}