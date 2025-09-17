import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

interface PortalLayoutProps {
  title: string
  description: string
  icon: React.ComponentType<any>
  bgColor: string
  children: React.ReactNode
  showBackButton?: boolean
}

const PortalLayout: React.FC<PortalLayoutProps> = ({
  title,
  description,
  icon: Icon,
  bgColor,
  children,
  showBackButton = true
}) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgColor}`}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 responsive-container">
          <div className="flex items-center justify-between responsive-container">
            <div className="flex items-center gap-4 responsive-container">
              {showBackButton && (
                <Link
                  to="/portals"
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors responsive-container"
                >
                  <ArrowLeft className="w-4 h-4 responsive-container" />
                  <span className="text-sm font-medium responsive-container">Back to Portals</span>
                </Link>
              )}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center responsive-container">
                <Icon className="w-6 h-6 text-white responsive-container" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 responsive-container">{title}</h1>
                <p className="text-gray-600 responsive-container">{description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 responsive-container">
              <Link
                to="/portals"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors responsive-container"
              >
                <Home className="w-4 h-4 responsive-container" />
                All Portals
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 responsive-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}

export default PortalLayout
