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
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Link
                to="/portals"
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Portals</span>
              </Link>
            )}
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {children}
            <Link
              to="/portals"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Home className="w-4 h-4" />
              All Portals
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortalHeader
