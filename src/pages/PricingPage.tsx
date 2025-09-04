import React from 'react'
import { Check, Star, Zap, Crown, Users } from 'lucide-react'

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      period: "/month",
      icon: Users,
      color: "from-blue-500 to-indigo-500",
      features: [
        "5 Portal Access",
        "50 AI Agents",
        "2 Languages",
        "Basic Support",
        "Standard Security"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$299",
      period: "/month",
      icon: Zap,
      color: "from-cyan-500 to-blue-500",
      features: [
        "15 Portal Access",
        "150 AI Agents",
        "4 Languages",
        "Priority Support",
        "Advanced Security",
        "Custom Integrations"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$999",
      period: "/month",
      icon: Crown,
      color: "from-purple-500 to-violet-500",
      features: [
        "All 25 Portals",
        "250 AI Agents",
        "6 Languages",
        "24/7 Support",
        "Enterprise Security",
        "Custom Development",
        "Dedicated Manager"
      ],
      popular: false
    }
  ]

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">Pricing Plans</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your logistics operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white/10 backdrop-blur-xl border rounded-2xl p-8 hover:bg-white/20 transition-all duration-500 hover:scale-105 ${
                plan.popular 
                  ? 'border-cyan-500 shadow-2xl shadow-cyan-500/25' 
                  : 'border-white/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-300 ml-2">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-2xl hover:shadow-cyan-500/25'
                    : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                }`}
              >
                {plan.popular ? 'Get Started' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-6">Custom Solutions</h2>
          <p className="text-xl text-gray-300 mb-8">
            Need something specific? We can create a custom plan for your business
          </p>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300">
            Contact Sales
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Free Trial Available</h3>
            <p className="text-gray-300 mb-6">
              Try any plan for 14 days with full access to all features
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingPage
