import { useSidebar } from '../contexts/SidebarContext'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { isSidebarOpen } = useSidebar()

  return (
    <main className={`pt-20 transition-all duration-500 ${
      isSidebarOpen ? 'pl-80' : 'pl-0'
    }`}>
      <div className="min-h-screen">
        {children}
      </div>
    </main>
  )
}
