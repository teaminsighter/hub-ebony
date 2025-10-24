'use client'

import { useState } from 'react'
import { useAnalytics } from '@/lib/hooks/useAnalytics'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { trackFormStart, trackFormSubmit, trackButtonClick } = useAnalytics()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Track the lead submission
      trackFormSubmit('consultation', formData)
      
      // Here you would typically send the data to your API
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
      
      alert('Thank you! We\'ll get back to you soon.')
      setFormData({ name: '', email: '', company: '', message: '' })
    } catch (error) {
      console.error('Form submission error:', error)
      alert('There was an error submitting your form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Book Your Free Consultation
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to take your business to the next level? Schedule a free consultation with our experts.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-lg">
            <form className="space-y-6" onSubmit={handleSubmit} onFocus={() => trackFormStart('consultation')}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  placeholder="Your company"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Tell us about your project
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  placeholder="Describe your business needs..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={() => trackButtonClick('Schedule Free Consultation', 'contact-form')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-4 px-6 rounded-lg text-lg transition-colors"
              >
                {isSubmitting ? 'Submitting...' : 'Schedule Free Consultation'}
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Or contact us directly:</p>
              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-indigo-600">contact@hubebony.com</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p className="text-indigo-600">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}