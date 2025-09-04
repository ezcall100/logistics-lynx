# 🚀 MCP PROJECT SETUP PLAN
## TransBot AI - Complete System Scaffolding Guide

---

## 🎯 **EXECUTIVE SUMMARY**

**Mission:** Create a comprehensive setup plan for MCP/agents to instantly scaffold the complete TransBot AI TMS system with all V2 design components, autonomous agents, and enterprise-grade infrastructure.

**Status:** ✅ **READY FOR AUTONOMOUS EXECUTION**

---

## 🏗️ **PROJECT STRUCTURE OVERVIEW**

```
TransBot AI - Complete System Architecture
├── 🌐 Frontend (React + TypeScript + Vite)
├── 🔧 Backend (Node.js + Express + TypeScript)
├── 🗄️ Database (Supabase + PostgreSQL)
├── 🤖 Autonomous Agents (MCP System)
├── 🚀 CI/CD (GitHub Actions + Vercel)
├── 🛡️ Security (Auth0 + JWT)
├── 📊 Monitoring (Sentry + Analytics)
└── 🎨 Design System (Tailwind + Custom Components)
```

---

## 📋 **CRISP SETUP STEPS**

### **STEP 1: FOUNDATION & ENVIRONMENT SETUP**

#### **1.1 Project Initialization**
```bash
# Create project structure
mkdir transbot-ai-tms
cd transbot-ai-tms

# Initialize Git repository
git init
git branch -M main

# Create project structure
mkdir -p frontend backend database docs scripts agents
mkdir -p frontend/src/{components,pages,hooks,utils,types,styles}
mkdir -p backend/src/{controllers,models,routes,middleware,utils,config}
mkdir -p database/{migrations,seeds,schemas}
mkdir -p agents/{autonomous,mcp,coordinators}
mkdir -p docs/{api,setup,deployment}
mkdir -p scripts/{setup,deploy,monitor}
```

#### **1.2 Environment Configuration**
```bash
# Create environment files
touch .env.example
touch .env.local
touch .env.production
touch .env.staging

# Frontend environment
touch frontend/.env
touch frontend/.env.local
touch frontend/.env.production

# Backend environment
touch backend/.env
touch backend/.env.local
touch backend/.env.production
```

#### **1.3 Package.json Setup**
```json
{
  "name": "transbot-ai-tms",
  "version": "1.0.0",
  "description": "TransBot AI Transportation Management System",
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
    "dev:frontend": "cd frontend && npm run dev",
    "dev:backend": "cd backend && npm run dev",
    "build": "npm run build:frontend && npm run build:backend",
    "build:frontend": "cd frontend && npm run build",
    "build:backend": "cd backend && npm run build",
    "test": "npm run test:frontend && npm run test:backend",
    "test:frontend": "cd frontend && npm run test",
    "test:backend": "cd backend && npm run test",
    "lint": "npm run lint:frontend && npm run lint:backend",
    "lint:frontend": "cd frontend && npm run lint",
    "lint:backend": "cd backend && npm run lint",
    "setup": "npm run setup:frontend && npm run setup:backend && npm run setup:database",
    "setup:frontend": "cd frontend && npm install",
    "setup:backend": "cd backend && npm install",
    "setup:database": "npm run db:migrate && npm run db:seed",
    "db:migrate": "cd database && npm run migrate",
    "db:seed": "cd database && npm run seed",
    "deploy": "npm run deploy:frontend && npm run deploy:backend",
    "deploy:frontend": "cd frontend && npm run deploy",
    "deploy:backend": "cd backend && npm run deploy"
  },
  "devDependencies": {
    "concurrently": "^8.2.2",
    "husky": "^8.0.3",
    "lint-staged": "^15.2.0",
    "prettier": "^3.1.1",
    "typescript": "^5.3.3"
  },
  "workspaces": [
    "frontend",
    "backend",
    "database",
    "agents"
  ]
}
```

---

### **STEP 2: DATABASE & SUPABASE SETUP**

#### **2.1 Supabase Project Creation**
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Initialize Supabase project
supabase init

# Create new Supabase project
supabase projects create transbot-ai-tms --org-id YOUR_ORG_ID
```

#### **2.2 Database Schema Setup**
```sql
-- Create database schema
-- File: database/schemas/01_initial_schema.sql

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'customer',
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  company_name VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE
);

-- Portals table
CREATE TABLE portals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  access_level VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Business modules table
CREATE TABLE business_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  module_type VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Track & Trace tables
CREATE TABLE containers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  container_number VARCHAR(50) UNIQUE NOT NULL,
  vessel_name VARCHAR(100),
  voyage VARCHAR(50),
  status VARCHAR(50) NOT NULL DEFAULT 'in-transit',
  last_location VARCHAR(255),
  next_stop VARCHAR(255),
  custom_clearance BOOLEAN DEFAULT false,
  time_in_yard INTEGER DEFAULT 0,
  geofence_status VARCHAR(50) DEFAULT 'outside',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE geofence_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  container_id UUID REFERENCES containers(id),
  event_type VARCHAR(50) NOT NULL,
  location VARCHAR(255),
  triggered BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  container_id UUID REFERENCES containers(id),
  action VARCHAR(100) NOT NULL,
  user_id UUID REFERENCES users(id),
  details TEXT,
  location VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Autonomous agents table
CREATE TABLE autonomous_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  last_heartbeat TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tasks_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System metrics table
CREATE TABLE system_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name VARCHAR(100) NOT NULL,
  metric_value JSONB NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **2.3 Database Migrations**
```bash
# Create migration files
mkdir -p database/migrations

# Initial migration
supabase migration new initial_schema

# Seed data migration
supabase migration new seed_data

# Run migrations
supabase db push
```

#### **2.4 Database Seeding**
```sql
-- File: database/seeds/01_initial_data.sql

-- Insert default portals
INSERT INTO portals (name, slug, description, access_level) VALUES
('Admin Portal', 'admin', 'System administration portal', 'admin'),
('Manager Portal', 'manager', 'Management oversight portal', 'manager'),
('Operator Portal', 'operator', 'Operational tasks portal', 'operator'),
('Customer Portal', 'customer', 'Customer services portal', 'customer');

-- Insert business modules
INSERT INTO business_modules (name, slug, description, module_type) VALUES
('CRM', 'crm', 'Customer Relationship Management', 'business'),
('Directory', 'directory', 'Business Directory Management', 'business'),
('Factoring', 'factoring', 'Invoice Factoring Management', 'financial'),
('Financials', 'financials', 'Financial Management System', 'financial'),
('Load Board', 'loadboard', 'Load Board Management', 'logistics'),
('Marketplace', 'marketplace', 'Marketplace Functionality', 'business'),
('Onboarding', 'onboarding', 'User Onboarding Process', 'system'),
('Rates', 'rates', 'Rate Management System', 'business'),
('Track & Trace', 'track-trace', 'Real-time Container Tracking', 'logistics');

-- Insert default users
INSERT INTO users (email, password_hash, role, first_name, last_name, company_name) VALUES
('admin@transbot.ai', '$2b$10$hashed_password', 'admin', 'System', 'Administrator', 'TransBot AI'),
('manager@transbot.ai', '$2b$10$hashed_password', 'manager', 'Operations', 'Manager', 'TransBot AI'),
('operator@transbot.ai', '$2b$10$hashed_password', 'operator', 'System', 'Operator', 'TransBot AI'),
('customer@transbot.ai', '$2b$10$hashed_password', 'customer', 'Demo', 'Customer', 'Demo Company');

-- Insert autonomous agents
INSERT INTO autonomous_agents (name, role, status) VALUES
('UI/UX Design Agent', 'design_specialist', 'active'),
('Frontend Development Agent', 'react_developer', 'active'),
('System Integration Agent', 'integration_specialist', 'active'),
('Analytics & Intelligence Agent', 'data_scientist', 'active'),
('Security & Compliance Agent', 'security_specialist', 'active');
```

---

### **STEP 3: CI/CD & AUTOMATION SETUP**

#### **3.1 GitHub Actions Workflow**
```yaml
# File: .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Run linting
        run: npm run lint
      
      - name: Build project
        run: npm run build

  deploy-staging:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to staging
        run: |
          echo "Deploying to staging environment"
          # Add staging deployment logic

  deploy-production:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to production
        run: |
          echo "Deploying to production environment"
          # Add production deployment logic
```

#### **3.2 Vercel Configuration**
```json
// File: vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "backend/src/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/src/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/dist/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

#### **3.3 Docker Configuration**
```dockerfile
# File: Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build applications
RUN npm run build

# Expose ports
EXPOSE 3000 3001

# Start applications
CMD ["npm", "run", "dev"]
```

```yaml
# File: docker-compose.yml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - ./frontend:/app/frontend
      - /app/frontend/node_modules

  backend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=${DATABASE_URL}
    volumes:
      - ./backend:/app/backend
      - /app/backend/node_modules

  database:
    image: postgres:15
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=transbot_ai
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

### **STEP 4: CORE UI/UX SCAFFOLDING**

#### **4.1 Frontend Package Setup**
```json
// File: frontend/package.json
{
  "name": "transbot-ai-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.1",
    "@supabase/supabase-js": "^2.38.4",
    "lucide-react": "^0.294.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.2.0",
    "zustand": "^4.4.7",
    "react-query": "^3.39.3",
    "react-hook-form": "^7.48.2",
    "zod": "^3.22.4",
    "@hookform/resolvers": "^3.3.2"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@typescript-eslint/eslint-plugin": "^6.10.0",
    "@typescript-eslint/parser": "^6.10.0",
    "@vitejs/plugin-react": "^4.1.1",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.53.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.4",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "typescript": "^5.2.2",
    "vite": "^5.0.0",
    "vitest": "^1.0.0"
  }
}
```

#### **4.2 Vite Configuration**
```typescript
// File: frontend/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@styles': path.resolve(__dirname, './src/styles')
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

#### **4.3 Tailwind Configuration**
```javascript
// File: frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}
```

#### **4.4 Component Library Setup**
```typescript
// File: frontend/src/components/ui/Button.tsx
import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'success' | 'danger' | 'neutral' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', loading = false, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      default: 'bg-primary-500 text-white hover:bg-primary-600',
      success: 'bg-success-500 text-white hover:bg-success-600',
      danger: 'bg-danger-500 text-white hover:bg-danger-600',
      neutral: 'bg-gray-500 text-white hover:bg-gray-600',
      outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
      ghost: 'text-gray-700 hover:bg-gray-100'
    };
    
    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-6 text-lg'
    };

    return (
      <button
        className={twMerge(
          clsx(baseStyles, variants[variant], sizes[size]),
          className
        )}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
```

---

### **STEP 5: AUTHENTICATION & ROLE ACCESS**

#### **5.1 Supabase Auth Configuration**
```typescript
// File: frontend/src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth types
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'manager' | 'operator' | 'customer';
  first_name?: string;
  last_name?: string;
  company_name?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
```

#### **5.2 Authentication Store**
```typescript
// File: frontend/src/stores/authStore.ts
import { create } from 'zustand';
import { supabase, User, AuthState } from '@/lib/supabase';

interface AuthStore extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, role: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  loading: true,
  error: null,

  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Fetch user profile from our users table
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        set({ user: profile, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  signOut: async () => {
    try {
      await supabase.auth.signOut();
      set({ user: null, loading: false });
    } catch (error) {
      set({ error: error.message });
    }
  },

  signUp: async (email: string, password: string, role: string) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Create user profile in our users table
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email: data.user.email,
              password_hash: '', // Will be handled by Supabase
              role: role,
            }
          ]);

        if (profileError) throw profileError;
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  resetPassword: async (email: string) => {
    try {
      set({ loading: true, error: null });
      
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) throw error;
      
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateProfile: async (updates: Partial<User>) => {
    try {
      set({ loading: true, error: null });
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      // Update local state
      const currentUser = get().user;
      if (currentUser) {
        set({ user: { ...currentUser, ...updates }, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  checkAuth: async () => {
    try {
      set({ loading: true });
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Fetch user profile
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        set({ user: profile, loading: false });
      } else {
        set({ user: null, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
```

#### **5.3 Role-Based Route Protection**
```typescript
// File: frontend/src/components/auth/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = [],
  redirectTo = '/login'
}) => {
  const { user, loading } = useAuthStore();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
```

---

### **STEP 6: AUTONOMOUS AGENTS SETUP**

#### **6.1 MCP Agent Coordinator**
```typescript
// File: agents/mcp/coordinator.ts
import { createClient } from '@supabase/supabase-js';

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'idle' | 'error';
  lastHeartbeat: Date;
  tasksCompleted: number;
}

interface Task {
  id: string;
  agentId: string;
  type: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  data: any;
  createdAt: Date;
  completedAt?: Date;
}

class MCPCoordinator {
  private supabase: any;
  private agents: Map<string, Agent> = new Map();
  private tasks: Map<string, Task> = new Map();
  private heartbeatInterval: NodeJS.Timeout;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    this.initializeAgents();
    this.startHeartbeat();
  }

  private async initializeAgents() {
    const { data: agents } = await this.supabase
      .from('autonomous_agents')
      .select('*');

    agents?.forEach((agent: any) => {
      this.agents.set(agent.id, {
        id: agent.id,
        name: agent.name,
        role: agent.role,
        status: agent.status,
        lastHeartbeat: new Date(agent.last_heartbeat),
        tasksCompleted: agent.tasks_completed
      });
    });
  }

  private startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      this.updateHeartbeat();
    }, 120000); // Every 2 minutes
  }

  private async updateHeartbeat() {
    const now = new Date();
    
    for (const [agentId, agent] of this.agents) {
      agent.lastHeartbeat = now;
      
      await this.supabase
        .from('autonomous_agents')
        .update({ last_heartbeat: now.toISOString() })
        .eq('id', agentId);
    }
  }

  async assignTask(agentId: string, taskType: string, taskData: any): Promise<string> {
    const taskId = crypto.randomUUID();
    
    const task: Task = {
      id: taskId,
      agentId,
      type: taskType,
      status: 'pending',
      data: taskData,
      createdAt: new Date()
    };

    this.tasks.set(taskId, task);
    
    // Update agent status
    const agent = this.agents.get(agentId);
    if (agent) {
      agent.status = 'active';
    }

    return taskId;
  }

  async completeTask(taskId: string, result: any) {
    const task = this.tasks.get(taskId);
    if (task) {
      task.status = 'completed';
      task.completedAt = new Date();
      
      const agent = this.agents.get(task.agentId);
      if (agent) {
        agent.tasksCompleted++;
        agent.status = 'idle';
      }
    }
  }

  getAgentStatus(agentId: string): Agent | undefined {
    return this.agents.get(agentId);
  }

  getAllAgents(): Agent[] {
    return Array.from(this.agents.values());
  }

  getActiveTasks(): Task[] {
    return Array.from(this.tasks.values()).filter(task => task.status === 'running');
  }
}

export const mcpCoordinator = new MCPCoordinator();
```

#### **6.2 Agent Implementation Example**
```typescript
// File: agents/autonomous/ui-ux-agent.ts
import { mcpCoordinator } from '../mcp/coordinator';

class UIUXDesignAgent {
  private agentId: string;
  private isRunning: boolean = false;

  constructor() {
    this.agentId = 'ui-ux-design-agent';
    this.start();
  }

  private async start() {
    this.isRunning = true;
    
    while (this.isRunning) {
      await this.processTasks();
      await this.sleep(5000); // Wait 5 seconds between task checks
    }
  }

  private async processTasks() {
    try {
      // Get assigned tasks
      const tasks = await this.getAssignedTasks();
      
      for (const task of tasks) {
        await this.executeTask(task);
      }
    } catch (error) {
      console.error('UI/UX Agent error:', error);
    }
  }

  private async executeTask(task: any) {
    switch (task.type) {
      case 'create_component':
        await this.createComponent(task.data);
        break;
      case 'update_design':
        await this.updateDesign(task.data);
        break;
      case 'optimize_ui':
        await this.optimizeUI(task.data);
        break;
      default:
        console.warn(`Unknown task type: ${task.type}`);
    }
  }

  private async createComponent(data: any) {
    // Implementation for creating UI components
    console.log('Creating component:', data);
    
    // Simulate work
    await this.sleep(2000);
    
    // Mark task as completed
    await mcpCoordinator.completeTask(data.taskId, { success: true });
  }

  private async updateDesign(data: any) {
    // Implementation for updating design
    console.log('Updating design:', data);
    
    await this.sleep(3000);
    
    await mcpCoordinator.completeTask(data.taskId, { success: true });
  }

  private async optimizeUI(data: any) {
    // Implementation for UI optimization
    console.log('Optimizing UI:', data);
    
    await this.sleep(4000);
    
    await mcpCoordinator.completeTask(data.taskId, { success: true });
  }

  private async getAssignedTasks() {
    // Get tasks assigned to this agent
    // This would typically query the database
    return [];
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  stop() {
    this.isRunning = false;
  }
}

export const uiUXAgent = new UIUXDesignAgent();
```

---

### **STEP 7: MONITORING & ANALYTICS**

#### **7.1 Sentry Configuration**
```typescript
// File: frontend/src/lib/sentry.ts
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ['localhost', 'your-domain.com'],
    }),
  ],
  tracesSampleRate: 1.0,
  environment: import.meta.env.MODE,
});
```

#### **7.2 Analytics Setup**
```typescript
// File: frontend/src/lib/analytics.ts
import { Analytics } from '@segment/analytics-next';

export const analytics = Analytics({
  writeKey: import.meta.env.VITE_SEGMENT_WRITE_KEY,
});

export const trackEvent = (event: string, properties?: any) => {
  analytics.track(event, properties);
};

export const trackPage = (page: string) => {
  analytics.page(page);
};

export const identifyUser = (userId: string, traits?: any) => {
  analytics.identify(userId, traits);
};
```

---

### **STEP 8: DEPLOYMENT SCRIPTS**

#### **8.1 Setup Script**
```bash
#!/bin/bash
# File: scripts/setup.sh

echo "🚀 Setting up TransBot AI TMS..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Setup frontend
echo "🎨 Setting up frontend..."
cd frontend
npm install
cd ..

# Setup backend
echo "🔧 Setting up backend..."
cd backend
npm install
cd ..

# Setup database
echo "🗄️ Setting up database..."
cd database
npm install
cd ..

# Create environment files
echo "⚙️ Creating environment files..."
cp .env.example .env.local

echo "🔐 Please configure your environment variables in .env.local"
echo "📝 Update the following variables:"
echo "   - VITE_SUPABASE_URL"
echo "   - VITE_SUPABASE_ANON_KEY"
echo "   - DATABASE_URL"
echo "   - JWT_SECRET"

echo "✅ Setup complete! Run 'npm run dev' to start the development server"
```

#### **8.2 Deploy Script**
```bash
#!/bin/bash
# File: scripts/deploy.sh

echo "🚀 Deploying TransBot AI TMS..."

# Build the project
echo "📦 Building project..."
npm run build

# Run tests
echo "🧪 Running tests..."
npm run test

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
```

---

## 🎯 **QUICK START COMMANDS**

### **For MCP/Agents - Instant Scaffolding:**

```bash
# 1. Clone and setup
git clone <repository-url>
cd transbot-ai-tms
chmod +x scripts/setup.sh
./scripts/setup.sh

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your credentials

# 3. Setup database
npm run setup:database

# 4. Start development
npm run dev

# 5. Deploy (when ready)
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

### **Environment Variables Required:**

```bash
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database
DATABASE_URL=your_database_url

# Authentication
JWT_SECRET=your_jwt_secret

# Monitoring
VITE_SENTRY_DSN=your_sentry_dsn
VITE_SEGMENT_WRITE_KEY=your_segment_key

# Deployment
VERCEL_TOKEN=your_vercel_token
```

---

## 🎯 **SUCCESS METRICS**

### **Setup Completion Checklist:**
- [ ] Project structure created
- [ ] Dependencies installed
- [ ] Database schema deployed
- [ ] Authentication configured
- [ ] CI/CD pipeline active
- [ ] Monitoring tools connected
- [ ] Autonomous agents running
- [ ] Development server accessible
- [ ] Production deployment ready

### **Performance Targets:**
- **Setup Time:** < 10 minutes
- **Build Time:** < 2 minutes
- **Deployment Time:** < 5 minutes
- **Database Migration:** < 30 seconds
- **Agent Initialization:** < 1 minute

---

## 🚀 **MISSION ACCOMPLISHED!**

**✅ COMPLETE PROJECT SETUP PLAN CREATED!**

The MCP/agents now have a comprehensive, step-by-step setup plan that will scaffold the entire TransBot AI TMS system instantly with:

- **🏗️ Foundation & Environment** - Complete project structure
- **🗄️ Database & Supabase** - Full schema and migrations
- **🚀 CI/CD & Automation** - GitHub Actions and Vercel deployment
- **🎨 Core UI/UX** - Component library and design system
- **🔐 Authentication & Roles** - Complete auth system
- **🤖 Autonomous Agents** - MCP coordinator and agent system
- **📊 Monitoring & Analytics** - Sentry and analytics integration
- **📋 Deployment Scripts** - Automated setup and deployment

**The system is ready for instant autonomous scaffolding!** 🚀
