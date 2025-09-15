# 🌐 SUBDOMAIN-BASED LOGIN STRUCTURE PLAN

## 🎯 **CURRENT SITUATION ANALYSIS**

### **✅ What's Already Working:**

1. **Main Website** (Port 3000) - ✅ Complete with login/sign-in
2. **SubdomainRouter** - ✅ Detects subdomains and routes to appropriate portals
3. **Multiple Portals** - ✅ 20+ portals already implemented
4. **Port Structure** - ✅ 5 ports properly configured

### **❌ What's Missing:**

1. **Dedicated login pages** for each subdomain
2. **Subdomain-specific authentication** flow
3. **Port-based routing** for subdomains
4. **Role-based access control** per subdomain

---

## 🏗️ **PROPOSED SUBDOMAIN LOGIN STRUCTURE**

### **🌐 MAIN WEBSITE (Port 3000)**

- **URL**: `http://transbotai.com` or `http://localhost:3000`
- **Purpose**: Public website with general login
- **Login Flow**:
  - User clicks "Sign In" → `/login` page
  - After login → Redirects to appropriate subdomain based on role

### **🔐 CENTRALIZED LOGIN PORTAL (Port 3006)**

- **URL**: `http://login.transbotai.com` or `http://localhost:3006`
- **Purpose**: Dedicated login portal for all subdomains
- **Features**:
  - Universal login form
  - Subdomain detection
  - Role-based redirects
  - SSO integration

### **📊 MCP DASHBOARD (Port 3002)**

- **URL**: `http://mcp.transbotai.com` or `http://localhost:3002`
- **Purpose**: MCP Agent Command Center
- **Access**: MCP Administrators only
- **Login**: Dedicated MCP admin login

### **👑 SUPER ADMIN PORTAL (Port 3005)**

- **URL**: `http://superadmin.transbotai.com` or `http://localhost:3005`
- **Purpose**: Complete Super Admin interface
- **Access**: Super Admins only
- **Login**: Dedicated Super Admin login

---

## 🎯 **SUBDOMAIN-SPECIFIC LOGIN PAGES**

### **1. Main Website Login (Port 3000)**

```
URL: http://transbotai.com/login
Purpose: General user login
Redirects to: Appropriate subdomain based on role
```

### **2. MCP Dashboard Login (Port 3002)**

```
URL: http://mcp.transbotai.com/login
Purpose: MCP Administrator login
Redirects to: MCP Dashboard (Port 3002)
```

### **3. Super Admin Login (Port 3005)**

```
URL: http://superadmin.transbotai.com/login
Purpose: Super Administrator login
Redirects to: Super Admin Portal (Port 3005)
```

### **4. Centralized Login Portal (Port 3006)**

```
URL: http://login.transbotai.com
Purpose: Universal login for all subdomains
Features: Subdomain detection, role-based redirects
```

---

## 🔄 **LOGIN FLOW ARCHITECTURE**

### **Flow 1: Main Website Login**

```
1. User visits: http://transbotai.com
2. Clicks "Sign In" → http://transbotai.com/login
3. Enters credentials
4. System determines role and redirects:
   - Super Admin → http://superadmin.transbotai.com:3005
   - MCP Admin → http://mcp.transbotai.com:3002
   - Broker → http://broker.transbotai.com:3000
   - Carrier → http://carrier.transbotai.com:3000
   - Driver → http://driver.transbotai.com:3000
   - Shipper → http://shipper.transbotai.com:3000
   - Regular User → http://transbotai.com (main website)
```

### **Flow 2: Direct Subdomain Access**

```
1. User visits: http://broker.transbotai.com
2. If not logged in → Redirect to: http://login.transbotai.com:3006
3. User logs in
4. System redirects back to: http://broker.transbotai.com:3000
```

### **Flow 3: MCP Dashboard Access**

```
1. User visits: http://mcp.transbotai.com
2. If not logged in → Redirect to: http://mcp.transbotai.com:3002/login
3. User logs in with MCP admin credentials
4. System redirects to: http://mcp.transbotai.com:3002 (MCP Dashboard)
```

### **Flow 4: Super Admin Access**

```
1. User visits: http://superadmin.transbotai.com
2. If not logged in → Redirect to: http://superadmin.transbotai.com:3005/login
3. User logs in with Super Admin credentials
4. System redirects to: http://superadmin.transbotai.com:3005 (Super Admin Portal)
```

---

## 🛠️ **IMPLEMENTATION PLAN**

### **Phase 1: Create Subdomain-Specific Login Pages**

#### **1.1 MCP Dashboard Login Page**

- **File**: `src/pages/login/MCPLoginPage.tsx`
- **URL**: `http://mcp.transbotai.com:3002/login`
- **Features**:
  - MCP-specific branding
  - MCP admin authentication
  - Redirect to MCP Dashboard

#### **1.2 Super Admin Login Page**

- **File**: `src/pages/login/SuperAdminLoginPage.tsx`
- **URL**: `http://superadmin.transbotai.com:3005/login`
- **Features**:
  - Super Admin branding
  - Super Admin authentication
  - Redirect to Super Admin Portal

#### **1.3 Centralized Login Portal**

- **File**: `src/pages/login/CentralizedLoginPage.tsx`
- **URL**: `http://login.transbotai.com:3006`
- **Features**:
  - Universal login form
  - Subdomain detection
  - Role-based redirects

### **Phase 2: Update SubdomainRouter**

#### **2.1 Add Login Route Detection**

```typescript
// Detect login routes for each subdomain
const loginRoutes = {
  mcp: '/login',
  superadmin: '/login',
  broker: '/login',
  carrier: '/login',
  driver: '/login',
  shipper: '/login',
};
```

#### **2.2 Add Authentication Guards**

```typescript
// Protect subdomain routes with authentication
const protectedRoutes = {
  mcp: ['mcp-admin'],
  superadmin: ['super-admin'],
  broker: ['broker', 'admin', 'super-admin'],
  carrier: ['carrier', 'admin', 'super-admin'],
  driver: ['driver', 'admin', 'super-admin'],
  shipper: ['shipper', 'admin', 'super-admin'],
};
```

### **Phase 3: Update Server Configurations**

#### **3.1 MCP Dashboard Server (Port 3002)**

- Add login route: `/login`
- Add authentication middleware
- Add role-based access control

#### **3.2 Super Admin Server (Port 3005)**

- Add login route: `/login`
- Add authentication middleware
- Add role-based access control

#### **3.3 Centralized Login Server (Port 3006)**

- Create universal login interface
- Add subdomain detection
- Add role-based redirects

### **Phase 4: Update Authentication Context**

#### **4.1 Add Subdomain-Aware Authentication**

```typescript
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  getCurrentSubdomain: () => string;
  getRequiredRole: (subdomain: string) => string[];
  hasAccess: (subdomain: string) => boolean;
}
```

#### **4.2 Add Role-Based Access Control**

```typescript
const ROLE_ACCESS_MATRIX = {
  'super-admin': ['*'], // Access to all subdomains
  'mcp-admin': ['mcp'],
  admin: ['broker', 'carrier', 'driver', 'shipper'],
  broker: ['broker'],
  carrier: ['carrier'],
  driver: ['driver'],
  shipper: ['shipper'],
  user: ['main'],
};
```

---

## 🎨 **LOGIN PAGE DESIGNS**

### **MCP Dashboard Login**

- **Theme**: Dark blue/cyan (MCP branding)
- **Logo**: MCP Agent icon
- **Features**: Agent status indicators, MCP-specific messaging

### **Super Admin Login**

- **Theme**: Dark purple/gold (Super Admin branding)
- **Logo**: Crown or shield icon
- **Features**: System status indicators, admin-specific messaging

### **Centralized Login**

- **Theme**: Clean, professional
- **Logo**: TransBot AI logo
- **Features**: Subdomain detection, universal form

---

## 🔐 **SECURITY FEATURES**

### **Authentication Security**

- JWT tokens with subdomain-specific claims
- Role-based access control per subdomain
- Session timeout per subdomain
- IP whitelisting for admin subdomains

### **Access Control**

- Subdomain-specific permissions
- Role hierarchy enforcement
- Audit logging per subdomain
- Multi-factor authentication for admin subdomains

---

## 📊 **SUBDOMAIN MAPPING**

| Subdomain                   | Port | Purpose           | Required Role               | Login URL |
| --------------------------- | ---- | ----------------- | --------------------------- | --------- |
| `transbotai.com`            | 3000 | Main Website      | Public                      | `/login`  |
| `login.transbotai.com`      | 3006 | Centralized Login | Public                      | `/`       |
| `mcp.transbotai.com`        | 3002 | MCP Dashboard     | mcp-admin                   | `/login`  |
| `superadmin.transbotai.com` | 3005 | Super Admin       | super-admin                 | `/login`  |
| `broker.transbotai.com`     | 3000 | Broker Portal     | broker, admin, super-admin  | `/login`  |
| `carrier.transbotai.com`    | 3000 | Carrier Portal    | carrier, admin, super-admin | `/login`  |
| `driver.transbotai.com`     | 3000 | Driver Portal     | driver, admin, super-admin  | `/login`  |
| `shipper.transbotai.com`    | 3000 | Shipper Portal    | shipper, admin, super-admin | `/login`  |

---

## 🚀 **IMPLEMENTATION STEPS**

### **Step 1: Create Login Pages**

1. Create `MCPLoginPage.tsx`
2. Create `SuperAdminLoginPage.tsx`
3. Create `CentralizedLoginPage.tsx`

### **Step 2: Update SubdomainRouter**

1. Add login route detection
2. Add authentication guards
3. Add role-based access control

### **Step 3: Update Server Configurations**

1. Add login routes to MCP server (Port 3002)
2. Add login routes to Super Admin server (Port 3005)
3. Update centralized login server (Port 3006)

### **Step 4: Update Authentication**

1. Add subdomain-aware authentication
2. Add role-based access control
3. Add security features

### **Step 5: Test Everything**

1. Test main website login flow
2. Test subdomain-specific logins
3. Test role-based access control
4. Test redirects and security

---

## ✅ **SUCCESS CRITERIA**

1. **✅ Main website login** works and redirects properly
2. **✅ MCP Dashboard login** works with MCP admin access
3. **✅ Super Admin login** works with Super Admin access
4. **✅ Subdomain logins** work for each portal
5. **✅ Role-based access control** prevents unauthorized access
6. **✅ Centralized login** handles all subdomains
7. **✅ Security features** protect admin subdomains
8. **✅ User experience** is smooth and intuitive

---

## 🎯 **FINAL RESULT**

After implementation:

- **Main Website**: `http://transbotai.com` with general login
- **MCP Dashboard**: `http://mcp.transbotai.com:3002` with MCP admin login
- **Super Admin**: `http://superadmin.transbotai.com:3005` with Super Admin login
- **Centralized Login**: `http://login.transbotai.com:3006` for all subdomains
- **Portal Logins**: Each subdomain has its own login page

**Clean, secure, and user-friendly subdomain-based authentication system!** 🚀
