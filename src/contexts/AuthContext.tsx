import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  role: 'shipper' | 'broker' | 'carrier' | 'driver' | 'superadmin'
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string, role: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('transbot-user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, _password: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Demo user data
      const demoUser: User = {
        id: '1',
        email,
        role: email.includes('admin') ? 'superadmin' : 
              email.includes('broker') ? 'broker' :
              email.includes('carrier') ? 'carrier' :
              email.includes('driver') ? 'driver' : 'shipper',
        name: email.split('@')[0]
      }
      
      setUser(demoUser)
      localStorage.setItem('transbot-user', JSON.stringify(demoUser))
    } catch (error) {
      throw new Error('Login failed')
    } finally {
      setLoading(false)
    }
  }

  const signup = async (email: string, _password: string, name: string, role: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newUser: User = {
        id: Date.now().toString(),
        email,
        role: role as User['role'],
        name
      }
      
      setUser(newUser)
      localStorage.setItem('transbot-user', JSON.stringify(newUser))
    } catch (error) {
      throw new Error('Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('transbot-user')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
