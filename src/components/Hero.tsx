import CalendarBooking from './CalendarBooking'

export default function Hero() {
  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            CommercialDXB - Dubai's Premier Property Investment Platform
          </h1>
          <p className="text-lg text-gray-600">
            Discover why Dubai commercial properties are the smart choice for investors seeking superior returns
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Column - Video & Features */}
          <div className="space-y-6 h-full flex flex-col">
            {/* Video Player */}
            <div className="relative bg-white rounded-lg overflow-hidden shadow-lg flex-1">
              <div className="aspect-video bg-gradient-to-br from-gray-600 to-gray-800 relative flex items-center justify-center">
                {/* Mock video background showing office setting with person */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-gray-800/40"></div>
                <div className="relative text-center text-white">
                  <div className="text-lg font-semibold mb-2">Max McCarthy</div>
                  <div className="text-sm opacity-90">Dubai Property Expert</div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors shadow-xl">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                  12:34
                </div>
              </div>
              
              {/* Features List */}
              <div className="p-6 bg-blue-50 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-800">8–10% net yields (cash flow is king)</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">0</span>
                  </div>
                  <span className="font-semibold text-gray-800">0% tax on gains & income</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-800">Stable tenants</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Real Calendar Booking */}
          <CalendarBooking />
        </div>
      </div>
    </section>
  )
}