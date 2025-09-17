# Super Admin Portal - Complete Deployment Guide

## 🚀 Overview

This guide provides comprehensive instructions for deploying the Super Admin Portal with enterprise-grade features, real-time Supabase synchronization, and automated n8n workflows.

## 📋 Prerequisites

### System Requirements
- Node.js 18+ 
- pnpm 8+
- PostgreSQL 14+
- Redis 6+
- Docker & Docker Compose (optional)

### External Services
- Supabase account
- Vercel account (for frontend deployment)
- GitHub account
- n8n instance
- Slack workspace (for notifications)

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Vercel)      │◄──►│   (Supabase)    │◄──►│   (PostgreSQL)  │
│   React + Vite  │    │   Edge Functions│    │   + Redis       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Monitoring    │    │   Automation    │    │   Security      │
│   (n8n)         │    │   (n8n)         │    │   (RLS + Auth)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔧 Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-org/logistics-lynx.git
cd logistics-lynx
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Environment Configuration

Create `.env.local` file:
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Application Configuration
VITE_APP_ENV=production
VITE_APP_VERSION=1.0.0

# Security
VITE_JWT_SECRET=your_jwt_secret
VITE_ENCRYPTION_KEY=your_encryption_key

# External Services
VITE_SLACK_WEBHOOK_URL=your_slack_webhook
VITE_MONITORING_WEBHOOK=your_monitoring_webhook

# API Keys
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_SENDGRID_API_KEY=your_sendgrid_key
```

### 4. Database Setup

#### Supabase Migration
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your_project_ref

# Run migrations
supabase db push

# Seed database
supabase db seed
```

#### Manual Database Setup (Alternative)
```sql
-- Run the migration file
psql -h your_host -U your_user -d your_database -f supabase/migrations/001_super_admin_schema.sql
```

## 🚀 Deployment

### Frontend Deployment (Vercel)

#### 1. Connect to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### 2. Configure Environment Variables
In Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add all variables from `.env.local`
- Set production environment

#### 3. Configure Custom Domain
```bash
vercel domains add your-domain.com
vercel domains verify your-domain.com
```

### Backend Deployment (Supabase)

#### 1. Deploy Edge Functions
```bash
# Deploy all functions
supabase functions deploy

# Deploy specific function
supabase functions deploy super-admin-api
```

#### 2. Configure Database
```bash
# Enable Row Level Security
supabase db push

# Set up triggers and functions
supabase db reset
```

### n8n Workflow Deployment

#### 1. Import Workflows
```bash
# Import deployment workflow
n8n import:workflow --file n8n/workflows/super-admin-deployment.json

# Import monitoring workflow
n8n import:workflow --file n8n/workflows/super-admin-monitoring.json
```

#### 2. Configure Credentials
In n8n interface:
- Add GitHub API credentials
- Add Supabase API credentials
- Add Slack webhook credentials
- Add Vercel API credentials

## 🔐 Security Configuration

### 1. Row Level Security (RLS)
```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Super admins can access all data" ON users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'superadmin'
        )
    );
```

### 2. API Security
```typescript
// Configure CORS
const corsOptions = {
  origin: ['https://your-domain.com', 'https://your-vercel-app.vercel.app'],
  credentials: true,
  optionsSuccessStatus: 200
};
```

### 3. Authentication
```typescript
// Configure JWT
const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: '24h',
  issuer: 'super-admin-portal'
};
```

## 📊 Monitoring & Alerting

### 1. System Monitoring
```bash
# Set up monitoring endpoints
curl -X POST "https://your-monitoring-service.com/endpoints" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Super Admin Portal",
    "url": "https://your-domain.com/api/health",
    "interval": 60,
    "timeout": 30
  }'
```

### 2. Error Tracking
```typescript
// Configure Sentry
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### 3. Performance Monitoring
```typescript
// Configure Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## 🔄 CI/CD Pipeline

### GitHub Actions
The deployment pipeline includes:
- Security scanning (Snyk, TruffleHog)
- Code quality checks (ESLint, Prettier, TypeScript)
- Unit and integration tests
- Build and deployment
- Database migrations
- Smoke tests

### Automated Deployment
```yaml
# Trigger deployment
curl -X POST "https://api.github.com/repos/your-org/logistics-lynx/actions/workflows/super-admin-deploy.yml/dispatches" \
  -H "Authorization: token your_github_token" \
  -H "Accept: application/vnd.github.v3+json" \
  -d '{
    "ref": "main",
    "inputs": {
      "environment": "production",
      "version": "1.0.0"
    }
  }'
```

## 📈 Performance Optimization

### 1. Frontend Optimization
```typescript
// Code splitting
const SuperAdminPortal = lazy(() => import('./pages/SuperAdminPortal'));

// Image optimization
import { Image } from '@vercel/image';

// Bundle analysis
pnpm build --analyze
```

### 2. Database Optimization
```sql
-- Create indexes
CREATE INDEX CONCURRENTLY idx_users_role ON users(role);
CREATE INDEX CONCURRENTLY idx_audit_logs_timestamp ON audit_logs(timestamp);
CREATE INDEX CONCURRENTLY idx_system_metrics_category ON system_metrics(category);

-- Optimize queries
EXPLAIN ANALYZE SELECT * FROM users WHERE role = 'admin';
```

### 3. Caching Strategy
```typescript
// Redis caching
const redis = new Redis(process.env.REDIS_URL);

// Cache user permissions
const cacheKey = `user:${userId}:permissions`;
const permissions = await redis.get(cacheKey) || await fetchPermissions(userId);
await redis.setex(cacheKey, 300, JSON.stringify(permissions));
```

## 🧪 Testing

### 1. Unit Tests
```bash
# Run unit tests
pnpm test:unit

# Run with coverage
pnpm test:coverage
```

### 2. Integration Tests
```bash
# Run integration tests
pnpm test:integration

# Run E2E tests
pnpm test:e2e
```

### 3. Load Testing
```bash
# Install k6
npm install -g k6

# Run load tests
k6 run tests/load/super-admin-load-test.js
```

## 🔧 Maintenance

### 1. Database Maintenance
```sql
-- Vacuum and analyze
VACUUM ANALYZE;

-- Update statistics
ANALYZE;

-- Check for long-running queries
SELECT pid, now() - pg_stat_activity.query_start AS duration, query 
FROM pg_stat_activity 
WHERE (now() - pg_stat_activity.query_start) > interval '5 minutes';
```

### 2. Log Management
```bash
# Rotate logs
logrotate /etc/logrotate.d/super-admin-portal

# Monitor log size
du -sh /var/log/super-admin-portal/
```

### 3. Backup Strategy
```bash
# Automated backups
pg_dump -h your_host -U your_user your_database | gzip > backup_$(date +%Y%m%d_%H%M%S).sql.gz

# Upload to S3
aws s3 cp backup_*.sql.gz s3://your-backup-bucket/
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Database Connection Issues
```bash
# Check connection
psql -h your_host -U your_user -d your_database -c "SELECT 1;"

# Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'users';
```

#### 2. Authentication Issues
```typescript
// Check JWT token
const token = localStorage.getItem('auth_token');
const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log(decoded);
```

#### 3. Performance Issues
```bash
# Check slow queries
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;
```

### Health Checks
```bash
# Application health
curl https://your-domain.com/api/health

# Database health
curl https://your-domain.com/api/health/database

# External services health
curl https://your-domain.com/api/health/external
```

## 📚 Documentation

### API Documentation
- Swagger UI: `https://your-domain.com/api/docs`
- OpenAPI Spec: `https://your-domain.com/api/openapi.json`

### User Documentation
- Admin Guide: `https://your-domain.com/docs/admin`
- User Manual: `https://your-domain.com/docs/user`

### Developer Documentation
- Architecture: `https://your-domain.com/docs/architecture`
- Contributing: `https://your-domain.com/docs/contributing`

## 🆘 Support

### Contact Information
- Technical Support: support@your-domain.com
- Security Issues: security@your-domain.com
- General Inquiries: info@your-domain.com

### Emergency Procedures
1. **System Down**: Contact on-call engineer
2. **Security Breach**: Follow incident response plan
3. **Data Loss**: Initiate recovery procedures

## 📝 Changelog

### Version 1.0.0
- Initial release
- Complete Super Admin Portal
- Real-time Supabase integration
- Automated deployment pipeline
- Comprehensive monitoring

---

## 🎯 Success Metrics

### Performance Targets
- Page load time: < 2 seconds
- API response time: < 200ms
- Uptime: 99.9%
- Error rate: < 0.1%

### Security Targets
- Zero critical vulnerabilities
- 100% RLS coverage
- Regular security audits
- Compliance with SOC 2

### User Experience Targets
- User satisfaction: > 4.5/5
- Task completion rate: > 95%
- Support ticket volume: < 5% of users
- Feature adoption: > 80%

---

*This deployment guide is maintained by the Super Admin Portal team. Last updated: January 2024*
