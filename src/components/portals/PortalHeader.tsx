import React from 'react'
import { ArrowLeft, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

interface PortalHeaderProps {
  title: string
  description: string
  icon: React.ComponentType<any>
  color: string
  showBackButton?: boolean
  children?: React.ReactNode
}

const PortalHeader: React.FC<PortalHeaderProps> = ({
  title,
  description,
  icon: Icon,
  color,
  showBackButton = true,
  children
}) => {
  return (
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
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white responsive-container" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 responsive-container">{title}</h1>
              <p className="text-gray-600 responsive-container">{description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 responsive-container">
            {children}
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
  )
}

export default PortalHeader
}