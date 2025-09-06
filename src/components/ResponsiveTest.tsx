import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Monitor, Tablet, Smartphone, CheckCircle, AlertCircle } from 'lucide-react'

export function ResponsiveTest() {
  const [screenSize, setScreenSize] = useState('')
  const [breakpoint, setBreakpoint] = useState('')

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      setScreenSize(`${width}px`)
      
      if (width >= 1536) {
        setBreakpoint('2XL (1536px+)')
      } else if (width >= 1280) {
        setBreakpoint('XL (1280px+)')
      } else if (width >= 1024) {
        setBreakpoint('LG (1024px+)')
      } else if (width >= 768) {
        setBreakpoint('MD (768px+)')
      } else if (width >= 640) {
        setBreakpoint('SM (640px+)')
      } else {
        setBreakpoint('XS (<640px)')
      }
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  const getDeviceIcon = () => {
    const width = window.innerWidth
    if (width >= 1024) return <Monitor className="w-8 h-8" />
    if (width >= 768) return <Tablet className="w-8 h-8" />
    return <Smartphone className="w-8 h-8" />
  }

  const getResponsiveStatus = () => {
    const width = window.innerWidth
    if (width >= 1280) return { status: 'Desktop', color: 'text-green-600', icon: CheckCircle }
    if (width >= 768) return { status: 'Tablet', color: 'text-blue-600', icon: CheckCircle }
    if (width >= 640) return { status: 'Mobile', color: 'text-purple-600', icon: CheckCircle }
    return { status: 'Small Mobile', color: 'text-orange-600', icon: AlertCircle }
  }

  const status = getResponsiveStatus()

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-20 right-4 z-50 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-xl shadow-lg p-4 max-w-xs"
    >
      <div className="flex items-center space-x-3 mb-3">
        {getDeviceIcon()}
        <div>
          <h3 className="font-semibold text-slate-900">Responsive Test</h3>
          <p className="text-xs text-slate-500">Current breakpoint</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Screen Width:</span>
          <span className="text-sm font-mono font-semibold">{screenSize}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Breakpoint:</span>
          <span className="text-sm font-semibold">{breakpoint}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Device:</span>
          <div className="flex items-center space-x-1">
            <status.icon className={`w-4 h-4 ${status.color}`} />
            <span className={`text-sm font-semibold ${status.color}`}>{status.status}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200">
        <div className="text-xs text-slate-500 space-y-1">
          <div className="flex justify-between">
            <span>Desktop (XL+):</span>
            <span className="text-green-600">✓ Full Menu</span>
          </div>
          <div className="flex justify-between">
            <span>Tablet (MD-LG):</span>
            <span className="text-blue-600">✓ Condensed</span>
          </div>
          <div className="flex justify-between">
            <span>Mobile (SM-):</span>
            <span className="text-purple-600">✓ Mobile Menu</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
