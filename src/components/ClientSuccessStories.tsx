'use client'

import { useState } from 'react'

export default function ClientSuccessStories() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const stories = [
    {
      id: 1,
      name: "Sarah M.",
      title: "UK Investor",
      investment: "AED 4.2M ($1.1M)",
      buildingType: "OFFICE TOWER",
      yield: "9.1% YIELD",
      quote: "Purchased a premium office space in Business Bay. The 5-year lease with a multinational tech company provides excellent cash flow and capital growth potential.",
      location: "Business Bay, Dubai",
      area: "3,200 sq ft",
      tenant: "Tech Corporation",
      leaseTerm: "5 years + renewal",
      imageGradient: "from-blue-400 to-blue-600"
    },
    {
      id: 2,
      name: "James C.",
      title: "Singapore Fund",
      investment: "AED 6.8M ($1.85M)",
      buildingType: "FINANCIAL DISTRICT",
      yield: "8.7% YIELD",
      quote: "Acquired a prestigious DIFC office suite. The financial services tenant has an excellent covenant and long-term commitment to the space.",
      location: "DIFC, Dubai",
      area: "4,500 sq ft",
      tenant: "Investment Bank",
      leaseTerm: "4 years guaranteed",
      imageGradient: "from-teal-400 to-green-600"
    },
    {
      id: 3,
      name: "Michael R.",
      title: "Australian Developer",
      investment: "AED 8.1M ($2.2M)",
      buildingType: "BUSINESS PARK",
      yield: "10.2% YIELD",
      quote: "Strategic acquisition in Dubai South. The logistics company provides stable income with excellent growth prospects in the expanding business park.",
      location: "Dubai South, Dubai",
      area: "5,800 sq ft",
      tenant: "Logistics Corporation",
      leaseTerm: "7 years guaranteed",
      imageGradient: "from-purple-400 to-indigo-600"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % stories.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + stories.length) % stories.length)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Client Success Stories & Recent Deals
          </h2>
          <p className="text-lg text-gray-600">
            See how we've helped clients achieve their commercial property investment goals
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-7xl mx-auto mb-16">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {stories.map((story, index) => (
                <div key={story.id} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-2 gap-8 px-4">
                    {/* Current Story */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      {/* Image */}
                      <div className={`h-24 bg-gradient-to-br ${story.imageGradient} relative`}>
                        <div className="absolute top-4 left-4">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {story.buildingType}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {story.yield}
                          </span>
                        </div>
                        {/* Mock building silhouette */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-blue-900">{story.name} - {story.title}</h3>
                            <p className="text-gray-600">Investment: {story.investment}</p>
                          </div>
                          <button 
                            onClick={nextSlide}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>

                        <p className="text-gray-700 mb-4 italic">"{story.quote}"</p>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-semibold text-gray-900">Location:</p>
                            <p className="text-gray-600">{story.location}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Area:</p>
                            <p className="text-gray-600">{story.area}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Tenant:</p>
                            <p className="text-gray-600">{story.tenant}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Lease Term:</p>
                            <p className="text-gray-600">{story.leaseTerm}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Next Story Preview */}
                    {stories[(index + 1) % stories.length] && (
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className={`h-24 bg-gradient-to-br ${stories[(index + 1) % stories.length].imageGradient} relative`}>
                          <div className="absolute top-4 left-4">
                            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              {stories[(index + 1) % stories.length].buildingType}
                            </span>
                          </div>
                          <div className="absolute top-4 right-4">
                            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              {stories[(index + 1) % stories.length].yield}
                            </span>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-blue-900">
                                {stories[(index + 1) % stories.length].name} - {stories[(index + 1) % stories.length].title}
                              </h3>
                              <p className="text-gray-600">Investment: {stories[(index + 1) % stories.length].investment}</p>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4 italic">"{stories[(index + 1) % stories.length].quote}"</p>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-semibold text-gray-900">Location:</p>
                              <p className="text-gray-600">{stories[(index + 1) % stories.length].location}</p>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Area:</p>
                              <p className="text-gray-600">{stories[(index + 1) % stories.length].area}</p>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Tenant:</p>
                              <p className="text-gray-600">{stories[(index + 1) % stories.length].tenant}</p>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Lease Term:</p>
                              <p className="text-gray-600">{stories[(index + 1) % stories.length].leaseTerm}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center mb-6">
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">AED 89M+</div>
              <div className="text-gray-600">Total Client Investments</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">8.7%</div>
              <div className="text-gray-600">Average Client Yield</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">100%</div>
              <div className="text-gray-600">Client Satisfaction Rate</div>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">🏆</span>
              <span>All investments secured within 45 days</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">⭐</span>
              <span>Average deal completion: 28 days</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}