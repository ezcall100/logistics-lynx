import { trackUserInteraction } from './webhookService'

export interface SubdomainConfig {
  id: string
  subdomain: string
  userId: string
  companyName: string
  status: 'pending' | 'approved' | 'active' | 'suspended'
  portals: string[]
  customDomain?: string
  createdAt: string
  approvedAt?: string
  expiresAt?: string
  plan: 'basic' | 'professional' | 'enterprise'
  features: {
    customBranding: boolean
    whiteLabel: boolean
    apiAccess: boolean
    prioritySupport: boolean
    customIntegrations: boolean
  }
}

export interface UserApplication {
  id: string
  email: string
  companyName: string
  industry: string
  companySize: string
  useCase: string
  requestedPortals: string[]
  customDomain?: string
  status: 'pending' | 'under_review' | 'approved' | 'rejected'
  submittedAt: string
  reviewedAt?: string
  reviewerNotes?: string
}

class SubdomainService {
  private subdomains: SubdomainConfig[] = []
  private applications: UserApplication[] = []

  // Generate subdomain suggestions
  generateSubdomainSuggestions(companyName: string): string[] {
    const cleanName = companyName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 20)
    
    const suggestions = [
      cleanName,
      `${cleanName}-logistics`,
      `${cleanName}-tms`,
      `${cleanName}-transport`,
      `${cleanName}-shipping`,
      `${cleanName}-fleet`,
      `${cleanName}-supply`,
      `${cleanName}-ops`,
      `${cleanName}-ai`,
      `${cleanName}-smart`
    ]
    
    return suggestions.filter((sub, index, arr) => arr.indexOf(sub) === index)
  }

  // Check subdomain availability
  async checkSubdomainAvailability(subdomain: string): Promise<boolean> {
    const exists = this.subdomains.some(s => s.subdomain === subdomain)
    return !exists
  }

  // Submit user application
  async submitApplication(application: Omit<UserApplication, 'id' | 'submittedAt' | 'status'>): Promise<UserApplication> {
    const newApplication: UserApplication = {
      id: `app_${Date.now()}`,
      ...application,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    }
    
    this.applications.push(newApplication)
    
    // Track application submission
    await trackUserInteraction('application_submitted', {
      applicationId: newApplication.id,
      companyName: application.companyName,
      industry: application.industry
    })
    
    // Send notification to admin
    await this.notifyAdmin(newApplication)
    
    return newApplication
  }

  // Approve application and create subdomain
  async approveApplication(applicationId: string, reviewerNotes?: string): Promise<SubdomainConfig> {
    const application = this.applications.find(app => app.id === applicationId)
    if (!application) {
      throw new Error('Application not found')
    }

    // Update application status
    application.status = 'approved'
    application.reviewedAt = new Date().toISOString()
    application.reviewerNotes = reviewerNotes

    // Generate subdomain
    const subdomain = await this.generateUniqueSubdomain(application.companyName)
    
    // Create subdomain configuration
    const subdomainConfig: SubdomainConfig = {
      id: `sub_${Date.now()}`,
      subdomain,
      userId: application.email, // Using email as user ID for now
      companyName: application.companyName,
      status: 'approved',
      portals: application.requestedPortals,
      customDomain: application.customDomain,
      createdAt: new Date().toISOString(),
      approvedAt: new Date().toISOString(),
      plan: 'basic',
      features: {
        customBranding: false,
        whiteLabel: false,
        apiAccess: false,
        prioritySupport: false,
        customIntegrations: false
      }
    }

    this.subdomains.push(subdomainConfig)

    // Track approval
    await trackUserInteraction('application_approved', {
      applicationId,
      subdomain,
      companyName: application.companyName
    })

    // Send welcome email with subdomain details
    await this.sendWelcomeEmail(application.email, subdomainConfig)

    return subdomainConfig
  }

  // Generate unique subdomain
  private async generateUniqueSubdomain(companyName: string): Promise<string> {
    const suggestions = this.generateSubdomainSuggestions(companyName)
    
    for (const suggestion of suggestions) {
      const isAvailable = await this.checkSubdomainAvailability(suggestion)
      if (isAvailable) {
        return suggestion
      }
    }
    
    // If all suggestions are taken, add random suffix
    const randomSuffix = Math.random().toString(36).substring(2, 6)
    return `${companyName.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 15)}${randomSuffix}`
  }

  // Get user's subdomain
  async getUserSubdomain(userId: string): Promise<SubdomainConfig | null> {
    return this.subdomains.find(sub => sub.userId === userId) || null
  }

  // Get all applications (admin only)
  async getAllApplications(): Promise<UserApplication[]> {
    return this.applications
  }

  // Get all subdomains (admin only)
  async getAllSubdomains(): Promise<SubdomainConfig[]> {
    return this.subdomains
  }

  // Update subdomain configuration
  async updateSubdomain(subdomainId: string, updates: Partial<SubdomainConfig>): Promise<SubdomainConfig> {
    const index = this.subdomains.findIndex(sub => sub.id === subdomainId)
    if (index === -1) {
      throw new Error('Subdomain not found')
    }

    this.subdomains[index] = { ...this.subdomains[index], ...updates }
    
    await trackUserInteraction('subdomain_updated', {
      subdomainId,
      updates: Object.keys(updates)
    })

    return this.subdomains[index]
  }

  // Suspend subdomain
  async suspendSubdomain(subdomainId: string, reason: string): Promise<void> {
    await this.updateSubdomain(subdomainId, { 
      status: 'suspended' 
    })
    
    await trackUserInteraction('subdomain_suspended', {
      subdomainId,
      reason
    })
  }

  // Activate subdomain
  async activateSubdomain(subdomainId: string): Promise<void> {
    await this.updateSubdomain(subdomainId, { 
      status: 'active' 
    })
    
    await trackUserInteraction('subdomain_activated', {
      subdomainId
    })
  }

  // Private helper methods
  private async notifyAdmin(application: UserApplication): Promise<void> {
    // Send notification to admin dashboard
    await trackUserInteraction('admin_notification', {
      type: 'new_application',
      applicationId: application.id,
      companyName: application.companyName
    })
  }

  private async sendWelcomeEmail(email: string, subdomainConfig: SubdomainConfig): Promise<void> {
    // Send welcome email with subdomain details
    await trackUserInteraction('welcome_email_sent', {
      email,
      subdomain: subdomainConfig.subdomain,
      companyName: subdomainConfig.companyName
    })
  }
}

export const subdomainService = new SubdomainService()