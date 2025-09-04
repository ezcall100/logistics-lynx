#!/bin/bash

echo "🚀 Setting up TransBot AI TMS..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
print_status "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    print_status "Visit: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js $(node -v) is installed"

# Check if npm is installed
print_status "Checking npm installation..."
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_success "npm $(npm -v) is installed"

# Check if Git is installed
print_status "Checking Git installation..."
if ! command -v git &> /dev/null; then
    print_warning "Git is not installed. Some features may not work properly."
else
    print_success "Git $(git --version) is installed"
fi

# Create project structure
print_status "Creating project structure..."
mkdir -p frontend/src/{components,pages,hooks,utils,types,styles,stores,lib}
mkdir -p backend/src/{controllers,models,routes,middleware,utils,config}
mkdir -p database/{migrations,seeds,schemas}
mkdir -p agents/{autonomous,mcp,coordinators}
mkdir -p docs/{api,setup,deployment}
mkdir -p scripts/{setup,deploy,monitor}
mkdir -p .github/workflows

print_success "Project structure created"

# Create environment files
print_status "Creating environment files..."
touch .env.example
touch .env.local
touch .env.production
touch .env.staging
touch frontend/.env
touch frontend/.env.local
touch frontend/.env.production
touch backend/.env
touch backend/.env.local
touch backend/.env.production

print_success "Environment files created"

# Create root package.json
print_status "Creating root package.json..."
cat > package.json << 'EOF'
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
EOF

print_success "Root package.json created"

# Create frontend package.json
print_status "Creating frontend package.json..."
cat > frontend/package.json << 'EOF'
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
EOF

print_success "Frontend package.json created"

# Create backend package.json
print_status "Creating backend package.json..."
cat > backend/package.json << 'EOF'
{
  "name": "transbot-ai-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "vitest",
    "lint": "eslint src --ext .ts"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "dotenv": "^16.3.1",
    "@supabase/supabase-js": "^2.38.4",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "zod": "^3.22.4",
    "express-rate-limit": "^7.1.5"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/node": "^20.10.0",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/bcryptjs": "^2.4.6",
    "@typescript-eslint/eslint-plugin": "^6.10.0",
    "@typescript-eslint/parser": "^6.10.0",
    "eslint": "^8.53.0",
    "nodemon": "^3.0.2",
    "ts-node": "^10.9.1",
    "typescript": "^5.3.3",
    "vitest": "^1.0.0"
  }
}
EOF

print_success "Backend package.json created"

# Create database package.json
print_status "Creating database package.json..."
cat > database/package.json << 'EOF'
{
  "name": "transbot-ai-database",
  "version": "1.0.0",
  "scripts": {
    "migrate": "supabase db push",
    "seed": "supabase db reset --linked",
    "setup": "supabase init && supabase start"
  },
  "devDependencies": {
    "supabase": "^1.127.0"
  }
}
EOF

print_success "Database package.json created"

# Create Vite config
print_status "Creating Vite configuration..."
cat > frontend/vite.config.ts << 'EOF'
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
EOF

print_success "Vite configuration created"

# Create Tailwind config
print_status "Creating Tailwind configuration..."
cat > frontend/tailwind.config.js << 'EOF'
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
EOF

print_success "Tailwind configuration created"

# Create PostCSS config
print_status "Creating PostCSS configuration..."
cat > frontend/postcss.config.js << 'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

print_success "PostCSS configuration created"

# Create TypeScript configs
print_status "Creating TypeScript configurations..."

cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

cat > frontend/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@pages/*": ["src/pages/*"],
      "@hooks/*": ["src/hooks/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"],
      "@styles/*": ["src/styles/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

cat > frontend/tsconfig.node.json << 'EOF'
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
EOF

cat > backend/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

print_success "TypeScript configurations created"

# Create environment example
print_status "Creating environment example..."
cat > .env.example << 'EOF'
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Database Configuration
DATABASE_URL=your_database_url_here

# Authentication
JWT_SECRET=your_jwt_secret_here

# Monitoring
VITE_SENTRY_DSN=your_sentry_dsn_here
VITE_SEGMENT_WRITE_KEY=your_segment_key_here

# Deployment
VERCEL_TOKEN=your_vercel_token_here

# Development
NODE_ENV=development
PORT=3001
EOF

print_success "Environment example created"

# Create GitHub Actions workflow
print_status "Creating GitHub Actions workflow..."
cat > .github/workflows/ci-cd.yml << 'EOF'
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
EOF

print_success "GitHub Actions workflow created"

# Create Docker configuration
print_status "Creating Docker configuration..."
cat > Dockerfile << 'EOF'
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
EOF

cat > docker-compose.yml << 'EOF'
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
EOF

print_success "Docker configuration created"

# Create Vercel configuration
print_status "Creating Vercel configuration..."
cat > vercel.json << 'EOF'
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
EOF

print_success "Vercel configuration created"

# Create README
print_status "Creating README..."
cat > README.md << 'EOF'
# 🚀 TransBot AI TMS

## Overview
TransBot AI Transportation Management System - A comprehensive logistics platform with autonomous agents, real-time tracking, and enterprise-grade features.

## Quick Start

### Prerequisites
- Node.js 18+
- npm
- Git

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd transbot-ai-tms

# Run setup script
chmod +x scripts/setup.sh
./scripts/setup.sh

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Start development server
npm run dev
```

## Features
- 🌐 Modern React frontend with TypeScript
- 🔧 Node.js backend with Express
- 🗄️ Supabase database with PostgreSQL
- 🤖 Autonomous agent system
- 🚀 CI/CD with GitHub Actions
- 🎨 Tailwind CSS design system
- 🔐 Role-based authentication
- 📊 Real-time monitoring

## Development
```bash
# Start development servers
npm run dev

# Run tests
npm run test

# Build for production
npm run build

# Deploy
npm run deploy
```

## Documentation
- [API Documentation](docs/api/)
- [Setup Guide](docs/setup/)
- [Deployment Guide](docs/deployment/)

## License
MIT License
EOF

print_success "README created"

# Install dependencies
print_status "Installing root dependencies..."
npm install

print_status "Installing frontend dependencies..."
cd frontend && npm install && cd ..

print_status "Installing backend dependencies..."
cd backend && npm install && cd ..

print_status "Installing database dependencies..."
cd database && npm install && cd ..

print_success "All dependencies installed"

# Create initial React app structure
print_status "Creating initial React app structure..."
cat > frontend/index.html << 'EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TransBot AI TMS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

cat > frontend/src/main.tsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

cat > frontend/src/App.tsx << 'EOF'
import React from 'react'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 TransBot AI TMS</h1>
        <p>Welcome to the TransBot AI Transportation Management System</p>
      </header>
    </div>
  )
}

export default App
EOF

cat > frontend/src/App.css << 'EOF'
.App {
  text-align: center;
}

.App-header {
  background-color: #282c34;
  padding: 20px;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
}
EOF

cat > frontend/src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

print_success "Initial React app structure created"

# Create backend initial structure
print_status "Creating backend initial structure..."
cat > backend/src/index.ts << 'EOF'
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'TransBot AI TMS Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TransBot AI TMS Backend running on port ${PORT}`);
});
EOF

print_success "Backend initial structure created"

# Make scripts executable
print_status "Making scripts executable..."
chmod +x scripts/setup.sh
chmod +x scripts/deploy.sh

print_success "Scripts made executable"

# Final setup instructions
echo ""
print_success "🎉 TransBot AI TMS setup complete!"
echo ""
print_status "Next steps:"
echo "1. Configure your environment variables:"
echo "   cp .env.example .env.local"
echo "   # Edit .env.local with your credentials"
echo ""
echo "2. Start the development server:"
echo "   npm run dev"
echo ""
echo "3. Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend: http://localhost:3001"
echo ""
print_status "For deployment:"
echo "   npm run deploy"
echo ""
print_success "Happy coding! 🚀"
