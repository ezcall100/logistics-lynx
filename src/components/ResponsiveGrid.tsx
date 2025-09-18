import { ReactNode } from 'react'

interface ResponsiveGridProps {
  children: ReactNode
  cols?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function ResponsiveGrid({ 
  children, 
  cols = { default: 1, sm: 2, md: 3, lg: 4 },
  gap = 'lg',
  className = ''
}: ResponsiveGridProps) {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  }

  const getGridCols = () => {
    const baseCols = cols.default || 1
    const smCols = cols.sm || baseCols
    const mdCols = cols.md || smCols
    const lgCols = cols.lg || mdCols
    const xlCols = cols.xl || lgCols
    const xxlCols = cols['2xl'] || xlCols

    return `grid-cols-${baseCols} sm:grid-cols-${smCols} md:grid-cols-${mdCols} lg:grid-cols-${lgCols} xl:grid-cols-${xlCols} 2xl:grid-cols-${xxlCols}`
  }

  return (
    <div className={`grid ${getGridCols()} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  )
}