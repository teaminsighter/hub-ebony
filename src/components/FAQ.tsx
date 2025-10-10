'use client'

import { useState } from 'react'

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)

  const faqs = [
    {
      id: 1,
      question: "What are typical investment amounts?",
      answer: "Commercial property investments in Dubai typically start from AED 3M+ ($810K+ USD). This reflects the premium nature of commercial real estate and the substantial cash flows these properties generate. Minimum investment thresholds vary by location and property type, with prime business districts like DIFC and Business Bay commanding higher entry points."
    },
    {
      id: 2,
      question: "How do taxes work for foreign investors?",
      answer: "Dubai offers a highly attractive 0% tax environment for commercial property investors. There are no income taxes on rental yields and no capital gains tax when you sell. This means foreign investors retain 100% of their profits, making Dubai one of the most tax-efficient commercial property markets globally. Some home countries may have tax obligations, so independent tax advice is recommended."
    },
    {
      id: 3,
      question: "What makes commercial better than residential?",
      answer: "Commercial properties offer several advantages: higher net yields (8-10% vs 4-6% residential), longer lease terms (1-5+ years vs annual residential), professional tenants who understand business, larger rent rolls, and less emotional decision-making from tenants. Commercial also benefits from Dubai's business growth with 990,000+ business licenses issued and strong corporate demand."
    }
  ]

  const toggleQuestion = (id: number) => {
    setOpenQuestion(openQuestion === id ? null : id)
  }

  return (
    <>
      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900">
              Common Questions
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-blue-900 text-lg">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-blue-900 transition-transform ${
                      openQuestion === faq.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                
                {openQuestion === faq.id && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-gray-300 text-sm leading-relaxed max-w-6xl mx-auto">
              Information is general in nature, returns are indicative only, independent advice is recommended. Investment in property carries risk and past performance does not guarantee future results. • 
              <span className="mx-2">
                <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              </span> • 
              <span className="mx-2">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              </span>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}