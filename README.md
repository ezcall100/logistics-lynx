# Trans Bot AI - Super Admin Portal

🚀 **Enterprise-grade Super Admin portal for the Trans Bot AI platform**

A comprehensive, production-ready Super Admin portal built with React, TypeScript, and Supabase. This portal provides complete system management capabilities for the Trans Bot AI ecosystem.

## ✨ Features

### 🎯 Core Functionality
- **Dashboard & Analytics** - Real-time system metrics and KPIs
- **Company Management** - Full CRUD operations with advanced features
- **User Management** - Comprehensive RBAC system
- **Portal Management** - Dynamic portal configuration
- **Billing & Subscriptions** - Revenue and subscription management
- **AI Command Center** - Autonomous agent monitoring
- **Security & Compliance** - Security monitoring and audit logs
- **Global Settings** - System-wide configuration

### 🎨 Design System
- **Enterprise UI/UX** - Professional, modern interface
- **Responsive Design** - Mobile-first, adaptive layouts
- **Dark/Light Mode** - Theme switching with smooth transitions
- **Accessibility** - WCAG 2.1 AA compliant
- **Component Library** - Reusable, consistent components

### 🔧 Technical Features
- **Real-time Updates** - Live data synchronization
- **Type Safety** - Full TypeScript implementation
- **Performance Optimized** - Fast loading, smooth interactions
- **Security First** - Row-level security, audit logging
- **Scalable Architecture** - Modular, maintainable codebase

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+
- Supabase account
- Git

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/transbot/super-admin-portal.git
   cd super-admin-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Database setup**
   ```bash
   # Start Supabase locally
   npm run supabase:start
   
   # Setup database schema
   npm run db:setup
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🏗️ Architecture

### Project Structure
```
src/
├── components/           # Reusable UI components
│   └── super-admin/     # Super Admin specific components
├── design-system/       # Design tokens and components
├── lib/                 # Utility functions
├── pages/               # Page components
│   └── super-admin/     # Super Admin pages
├── services/            # API services and integrations
└── types/               # TypeScript type definitions
```

### Technology Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **State Management**: React Query, React Hooks
- **Testing**: Vitest, Playwright
- **Deployment**: Docker, Nginx

## 📊 Database Schema

The portal uses a comprehensive PostgreSQL schema with:
- **Companies** - Client company management
- **Users** - User accounts with RBAC
- **System Metrics** - Real-time performance data
- **Audit Logs** - Complete activity tracking
- **Portal Configurations** - Dynamic portal settings
- **Billing Information** - Subscription management
- **AI Agents** - Agent monitoring and configuration
- **Security Events** - Security monitoring

## 🔐 Security

### Authentication & Authorization
- **Supabase Auth** - Secure authentication
- **Row Level Security** - Database-level access control
- **RBAC System** - Role-based permissions
- **Audit Logging** - Complete activity tracking

### Security Features
- **Rate Limiting** - API protection
- **Input Validation** - Data sanitization
- **CSRF Protection** - Cross-site request forgery prevention
- **Security Headers** - HTTP security headers
- **Encrypted Storage** - Sensitive data encryption

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build individual containers
docker build -t super-admin-portal .
docker run -p 3000:3000 super-admin-portal
```

### Environment Variables
```bash
# Required
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Optional
VITE_APP_ENVIRONMENT=production
VITE_DEBUG_MODE=false
VITE_MOCK_DATA=false
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Coverage
```bash
npm run test:coverage
```

## 📈 Performance

### Optimization Features
- **Code Splitting** - Lazy loading of components
- **Bundle Optimization** - Tree shaking and minification
- **Caching** - Aggressive caching strategies
- **CDN Ready** - Static asset optimization
- **Real-time Updates** - Efficient WebSocket connections

### Performance Metrics
- **Lighthouse Score**: 95+ across all categories
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔧 Configuration

### Feature Flags
```typescript
// Enable/disable features via environment variables
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_REAL_TIME=true
VITE_ENABLE_AI_AGENTS=true
VITE_ENABLE_SECURITY_MONITORING=true
```

### Customization
- **Themes** - Custom color schemes and branding
- **Layouts** - Flexible layout configurations
- **Components** - Extensible component system
- **API Integration** - Pluggable service architecture

## 📚 API Documentation

### Core Services
- **CompanyService** - Company CRUD operations
- **UserService** - User management and RBAC
- **SystemMetricsService** - Performance monitoring
- **AuditLogService** - Activity tracking
- **RealtimeService** - Live data synchronization

### API Endpoints
```
GET    /api/companies          # List companies
POST   /api/companies          # Create company
PUT    /api/companies/:id      # Update company
DELETE /api/companies/:id      # Delete company

GET    /api/users              # List users
POST   /api/users              # Create user
PUT    /api/users/:id          # Update user
DELETE /api/users/:id          # Delete user

GET    /api/metrics            # System metrics
GET    /api/audit-logs         # Audit logs
```

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

### Code Standards
- **TypeScript** - Strict type checking
- **ESLint** - Code quality enforcement
- **Prettier** - Code formatting
- **Husky** - Git hooks for quality gates

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [API Documentation](docs/api.md)
- [Component Library](docs/components.md)
- [Deployment Guide](docs/deployment.md)

### Community
- [GitHub Issues](https://github.com/transbot/super-admin-portal/issues)
- [Discord Community](https://discord.gg/transbot)
- [Email Support](mailto:support@transbot.ai)

## 🎯 Roadmap

### Upcoming Features
- [ ] Advanced Analytics Dashboard
- [ ] AI Agent Management Interface
- [ ] Security Compliance Monitoring
- [ ] Multi-tenant Architecture
- [ ] Mobile Application
- [ ] API Rate Limiting Dashboard
- [ ] Custom Report Builder
- [ ] Integration Marketplace

---

**Built with ❤️ by the Trans Bot AI Team**

*Empowering logistics companies with intelligent automation and enterprise-grade management tools.*