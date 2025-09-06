import { trackUserInteraction } from './webhookService'

export interface User {
  id: string
  email: string
  name: string
  role: 'shipper' | 'broker' | 'carrier' | 'driver' | 'superadmin'
  avatar?: string
  createdAt: string
  lastLogin?: string
}

// Mock database for development
const users: User[] = [
  {
    id: '1',
    email: 'superadmin@transbotai.com',
    name: 'Super Admin',
    role: 'superadmin',
    avatar: '',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  },
  {
    id: '2',
    email: 'admin@transbotai.com',
    name: 'System Admin',
    role: 'superadmin',
    avatar: '',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  },
  {
    id: '3',
    email: 'owner@transbotai.com',
    name: 'Company Owner',
    role: 'superadmin',
    avatar: '',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  },
  {
    id: '4',
    email: 'shipper@transbotai.com',
    name: 'Demo Shipper',
    role: 'shipper',
    avatar: '',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  },
  {
    id: '5',
    email: 'broker@transbotai.com',
    name: 'Demo Broker',
    role: 'broker',
    avatar: '',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  },
  {
    id: '6',
    email: 'carrier@transbotai.com',
    name: 'Demo Carrier',
    role: 'carrier',
    avatar: '',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  },
  {
    id: '7',
    email: 'driver@transbotai.com',
    name: 'Demo Driver',
    role: 'driver',
    avatar: '',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  }
]

class AuthService {
  private currentUser: User | null = null

  async signIn(email: string, _password: string): Promise<User> {
    // Track authentication attempt
    await trackUserInteraction('sign_in_attempt', { email })
    
    const user = users.find(u => u.email === email)
    
    if (!user) {
      throw new Error('Invalid credentials')
    }
    
    this.currentUser = user
    localStorage.setItem('transbot_user', JSON.stringify(user))
    
    await trackUserInteraction('sign_in_success', { userId: user.id, role: user.role })
    
    return user
  }

  async signUp(email: string, _password: string, name: string, role: 'shipper' | 'broker' | 'carrier' | 'driver'): Promise<User> {
    await trackUserInteraction('sign_up_attempt', { email, role })
    
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      throw new Error('User already exists')
    }
    
    const newUser: User = {
      id: (users.length + 1).toString(),
      email,
      name,
      role,
      avatar: '',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    }
    
    users.push(newUser)
    this.currentUser = newUser
    localStorage.setItem('transbot_user', JSON.stringify(newUser))
    
    await trackUserInteraction('sign_up_success', { userId: newUser.id, role: newUser.role })
    
    return newUser
  }

  signOut(): void {
    this.currentUser = null
    localStorage.removeItem('transbot_user')
    trackUserInteraction('sign_out', {})
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const stored = localStorage.getItem('transbot_user')
      if (stored) {
        this.currentUser = JSON.parse(stored)
      }
    }
    return this.currentUser
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }

  hasRole(requiredRole: string): boolean {
    const user = this.getCurrentUser()
    return user ? user.role === requiredRole || user.role === 'superadmin' : false
  }
}

export const authService = new AuthService()