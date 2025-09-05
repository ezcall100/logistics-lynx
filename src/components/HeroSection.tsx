import { motion } from 'framer-motion'
import { Star, Brain, Zap, Shield, ArrowRight, Play } from 'lucide-react'
import { DemoForm } from './DemoForm'
import { useState, useEffect } from 'react'

export function HeroSection() {
  const [agentCount, setAgentCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    // Animate agent count to 250
    const timer = setTimeout(() => {
      let count = 0
      const interval = setInterval(() => {
        count += 5
        setAgentCount(count)
        if (count >= 250) {
          clearInterval(interval)
          setAgentCount(250)
        }
      }, 50)
      return () => clearInterval(interval)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative pt-24 pb-16 overflow-hidden min-h-screen flex items-center">
      {/* Trans Bot AI Holographic Background */}
      <div className="absolute inset-0">
        {/* Animated neural network background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-96 h-64 holographic-glass rounded-lg animate-float"></div>
          <div className="absolute top-40 right-32 w-80 h-48 holographic-glass rounded-lg animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-1/3 w-72 h-56 holographic-glass rounded-lg animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Floating AI agent orbs */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="container-pro relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
                               {/* Trans Bot AI Badge */}
                   <motion.div
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: 0.2, duration: 0.6 }}
                     className="inline-flex items-center gap-2 px-4 py-2 rounded-full holographic-glass text-sm mb-6 animate-holographic"
                   >
                     <Brain className="w-4 h-4 text-cyan-400" />
                     <span className="gradient-text-cyan font-semibold">#1 AI-POWERED</span>
                     <span className="text-white">TRUCKING TMS SOFTWARE</span>
                   </motion.div>

                   {/* Main Headline */}
                   <motion.h1
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.4, duration: 0.8 }}
                     className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                   >
                     <span className="gradient-text">Trans Bot AI</span>
                     <br />
                     <span className="text-white">Supercharges Your</span>
                     <br />
                     <span className="gradient-text-blue">Trucking Company</span>
                   </motion.h1>

                               {/* Subheadline */}
                   <motion.p
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.6, duration: 0.8 }}
                     className="text-xl text-white/80 mb-8 max-w-2xl"
                   >
                     {isVisible && (
                       <span className="gradient-text-cyan font-semibold">{agentCount} AI agents</span>
                     )} working 24/7 to optimize your operations, predict demand, and automate decision-making.
                   </motion.p>

                               {/* Key Benefits */}
                   <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.8, duration: 0.8 }}
                     className="space-y-4 mb-8"
                   >
                     {[
                       { icon: <Zap className="w-5 h-5" />, text: 'Book more loads, optimize capacity' },
                       { icon: <Brain className="w-5 h-5" />, text: 'Leverage AI & workflow automation' }, 
                       { icon: <Shield className="w-5 h-5" />, text: 'No-risk, easy onboarding' }
                     ].map((benefit, index) => (
                       <motion.div
                         key={index}
                         initial={{ opacity: 0, x: -20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 1.0 + index * 0.1, duration: 0.6 }}
                         className="flex items-center gap-3 p-3 rounded-lg holographic-glass hover:scale-105 transition-transform"
                       >
                         <div className="text-cyan-400 flex-shrink-0">{benefit.icon}</div>
                         <span className="text-white font-medium">{benefit.text}</span>
                       </motion.div>
                     ))}
                   </motion.div>

                               {/* Action Buttons */}
                   <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 1.2, duration: 0.8 }}
                     className="flex flex-col sm:flex-row gap-4 mb-8"
                   >
                     <motion.button
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                       className="btn-primary flex items-center gap-2"
                     >
                       <span>Get Free Demo</span>
                       <ArrowRight className="w-4 h-4" />
                     </motion.button>
                     <motion.button
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                       className="btn-secondary flex items-center gap-2"
                     >
                       <Play className="w-4 h-4" />
                       <span>Watch Demo</span>
                     </motion.button>
                   </motion.div>

                   {/* Social Proof */}
                   <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 1.4, duration: 0.8 }}
                     className="flex items-center gap-4"
                   >
                     <div className="flex items-center gap-2">
                       <div className="flex">
                         {[...Array(5)].map((_, i) => (
                           <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                         ))}
                       </div>
                       <span className="text-white font-semibold">4.9</span>
                       <span className="text-white/60">70 reviews</span>
                     </div>
                     <div className="flex items-center gap-2">
                       <div className="text-white/60 text-sm">Capterra</div>
                       <div className="text-white/60 text-sm">Google</div>
                     </div>
                   </motion.div>
          </motion.div>

          {/* Right Column - Demo Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <DemoForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
