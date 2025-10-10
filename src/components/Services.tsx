export default function Services() {
  const services = [
    {
      title: "Business Strategy",
      description: "Comprehensive business planning and strategy development",
      features: ["Market Analysis", "Competitive Research", "Growth Planning", "Risk Assessment"]
    },
    {
      title: "Digital Transformation",
      description: "Modernize your business with digital solutions",
      features: ["Technology Integration", "Process Automation", "Digital Marketing", "E-commerce Solutions"]
    },
    {
      title: "Operational Excellence",
      description: "Optimize your operations for maximum efficiency",
      features: ["Process Optimization", "Quality Management", "Cost Reduction", "Performance Metrics"]
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive consultation services tailored to your business needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}