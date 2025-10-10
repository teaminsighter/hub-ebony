export default function DubaiPropertyBenefits() {
  return (
    <section className="bg-white">
      {/* Part 1 - Top Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
              <span className="text-blue-600 text-sm font-semibold uppercase tracking-wide">
                ⚡ EXCLUSIVE ADVANTAGES
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              How Dubai Commercial Property Benefits Investors
            </h2>
            <p className="text-lg text-gray-600">
              Understanding the unique advantages of Dubai's commercial property market
            </p>
          </div>

          {/* Benefits Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Superior NET Yields */}
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">15%</span>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">Superior NET Yields</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Commercial properties in Dubai typically deliver 8-15% net returns, significantly outperforming traditional markets
              </p>
              <div className="text-sm text-blue-700 font-semibold">
                Avg client yield: 8.7% (2024)
              </div>
            </div>

            {/* Zero Tax Structure */}
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">0%</span>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">Zero Tax Structure</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Dubai offers 0% income tax and 0% capital gains tax, allowing investors to retain 100% of their profits
              </p>
              <div className="text-sm text-blue-700 font-semibold">
                Save $50k+ annually on a $500k investment
              </div>
            </div>

            {/* Stable Long Leases */}
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-xl font-bold">1-5Y</span>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">Stable Long Leases</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Commercial properties attract established businesses with longer lease commitments, providing stable income streams
              </p>
              <div className="text-sm text-blue-700 font-semibold">
                Avg tenant covenant: 8+ years
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}