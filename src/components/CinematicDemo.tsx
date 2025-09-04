import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, ArrowRight, CheckCircle, Users, Truck, Package, DollarSign, BarChart3 } from 'lucide-react'

interface JourneyStep {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  color: string
  details: string[]
}

export function CinematicDemo() {
  const [activeStep, setActiveStep] = useState(0)

  const journeySteps: JourneyStep[] = [
    {
      id: 'crm',
      title: 'Lead Capture',
      description: 'Prospect enters the system',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      details: ['Lead captured via website', 'Contact information collected', 'Initial qualification completed', 'Opportunity created in CRM']
    },
    {
      id: 'marketplace',
      title: 'Load Posting',
      description: 'Freight opportunity posted',
      icon: Truck,
      color: 'from-green-500 to-emerald-500',
      details: ['Load details entered', 'Rate calculated automatically', 'Posted to marketplace', 'Carriers notified instantly']
    },
    {
      id: 'carrier',
      title: 'Carrier Match',
      description: 'Optimal carrier selected',
      icon: Package,
      color: 'from-purple-500 to-violet-500',
      details: ['AI matches best carrier', 'Capacity verified', 'Rate negotiated', 'Booking confirmed']
    },
    {
      id: 'execution',
      title: 'Freight Execution',
      description: 'Shipment moves through system',
      icon: Truck,
      color: 'from-orange-500 to-red-500',
      details: ['Driver dispatched', 'Real-time tracking', 'HOS compliance', 'Delivery confirmation']
    },
    {
      id: 'financials',
      title: 'Invoice & Payment',
      description: 'Financial settlement automated',
      icon: DollarSign,
      color: 'from-yellow-500 to-orange-500',
      details: ['Invoice auto-generated', 'Payment processed', 'Settlement posted', 'Ledger updated']
    },
    {
      id: 'analytics',
      title: 'Intelligence & Insights',
      description: 'Performance data analyzed',
      icon: BarChart3,
      color: 'from-pink-500 to-rose-500',
      details: ['KPIs calculated', 'Trends identified', 'Optimization recommendations', 'Performance reports']
    }
  ]

  return (
    <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            The <span className="text-accent">Lead-to-Ledger</span> Journey
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Experience the complete freight lifecycle in one seamless flow. 
            From first contact to final payment, see how Trans Bot AI orchestrates every step.
          </p>
        </motion.div>

        {/* Journey Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative mb-16"
        >
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary via-accent to-secondary transform -translate-y-1/2 hidden lg:block" />
          
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActiveStep(index)}
                className={`relative cursor-pointer group ${
                  activeStep === index ? 'scale-105' : 'hover:scale-102'
                } transition-transform duration-300`}
              >
                {/* Step Card */}
                <div className={`glass p-6 rounded-2xl text-center ${
                  activeStep === index ? 'ring-2 ring-accent bg-accent/10' : ''
                }`}>
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-primary rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    {step.description}
                  </p>
                  
                  {/* Progress Indicator */}
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-secondary to-accent"
                      initial={{ width: 0 }}
                      whileInView={{ width: activeStep >= index ? '100%' : '0%' }}
                      transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Active Step Details */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass p-8 rounded-2xl mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Details */}
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${journeySteps[activeStep].color} flex items-center justify-center`}>
                  {React.createElement(journeySteps[activeStep].icon, { className: "w-6 h-6 text-white" })}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {journeySteps[activeStep].title}
                  </h3>
                  <p className="text-white/70">
                    Step {activeStep + 1} of {journeySteps.length}
                  </p>
                </div>
              </div>
              
              <p className="text-white/80 mb-6">
                {journeySteps[activeStep].description}
              </p>
              
              <div className="space-y-3">
                {journeySteps[activeStep].details.map((detail, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-white/70">{detail}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Visual Representation */}
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-primary to-primary/50 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${journeySteps[activeStep].color} flex items-center justify-center`}>
                    {React.createElement(journeySteps[activeStep].icon, { className: "w-10 h-10 text-white" })}
                  </div>
                  <div className="text-white/60 text-sm">
                    Interactive Demo Coming Soon
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Video Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-2xl text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Watch the Complete Journey
          </h3>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            See how Trans Bot AI transforms the entire freight lifecycle from prospect to profit. 
            This 3-minute demo shows the power of unified logistics intelligence.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex items-center space-x-2 mx-auto text-lg px-8 py-4"
          >
            <Play className="w-5 h-5" />
            <span>Play Full Demo</span>
          </motion.button>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Logistics?
            </h3>
            <p className="text-white/70 mb-6">
              Experience the Lead-to-Ledger journey for yourself. 
              See how Trans Bot AI can revolutionize your operations.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center space-x-2 mx-auto"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
