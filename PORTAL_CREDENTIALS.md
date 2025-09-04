# TransBot AI - Portal Credentials & Access Guide

## 🚀 Quick Access URLs

### Main Website
- **Homepage**: http://localhost:3000/
- **Login Page**: http://localhost:3000/login

### Role-Based Portals
- **Admin Portal**: http://localhost:3000/admin
- **Manager Portal**: http://localhost:3000/manager
- **Operator Portal**: http://localhost:3000/operator
- **Customer Portal**: http://localhost:3000/customer

---

## 🔐 Default Login Credentials

### 1. Super Admin Portal
**Email**: `admin@transbot.ai`  
**Password**: `admin123`  
**Access URL**: http://localhost:3000/admin

**Features**:
- System-wide user management
- System health monitoring
- Revenue and performance analytics
- Security settings configuration
- Autonomous agent management

### 2. Manager Portal
**Email**: `manager@transbot.ai`  
**Password**: `manager123`  
**Access URL**: http://localhost:3000/manager

**Features**:
- Team management and oversight
- Performance analytics
- Task assignment and monitoring
- Team member performance tracking
- Operational reporting

### 3. Operator Portal
**Email**: `operator@transbot.ai`  
**Password**: `operator123`  
**Access URL**: http://localhost:3000/operator

**Features**:
- Task management and execution
- Shipment tracking and updates
- Customer support handling
- Real-time operational tasks
- Performance metrics

### 4. Customer Portal
**Email**: `customer@transbot.ai`  
**Password**: `customer123`  
**Access URL**: http://localhost:3000/customer

**Features**:
- Shipment tracking
- Order history
- Customer support tickets
- Account management
- Loyalty points tracking

---

## 🏗️ Portal Architecture

### Role Hierarchy
```
Super Admin (Full System Access)
    ↓
Manager (Team & Operational Oversight)
    ↓
Operator (Task Execution & Customer Service)
    ↓
Customer (Self-Service & Support)
```

### Access Control Matrix

| Feature | Admin | Manager | Operator | Customer |
|---------|-------|---------|----------|----------|
| User Management | ✅ Full | ❌ | ❌ | ❌ |
| System Settings | ✅ Full | ❌ | ❌ | ❌ |
| Team Management | ✅ Full | ✅ Full | ❌ | ❌ |
| Performance Analytics | ✅ Full | ✅ Team | ✅ Personal | ✅ Personal |
| Task Management | ✅ Full | ✅ Assign | ✅ Execute | ❌ |
| Shipment Tracking | ✅ Full | ✅ Oversight | ✅ Update | ✅ View |
| Customer Support | ✅ Full | ✅ Oversight | ✅ Handle | ✅ Create |
| Order History | ✅ Full | ✅ Team | ✅ Related | ✅ Own |

---

## 🎨 Portal Design Themes

### Color Schemes
- **Admin Portal**: Blue theme (#3b82f6) - Professional & authoritative
- **Manager Portal**: Green theme (#10b981) - Growth & leadership
- **Operator Portal**: Orange theme (#f59e0b) - Action & efficiency
- **Customer Portal**: Purple theme (#8b5cf6) - Trust & service

### Navigation Structure
Each portal features:
- **Sidebar Navigation**: Role-specific menu items
- **Dashboard**: Key metrics and quick actions
- **User Profile**: Role indicator and sign-out functionality
- **Responsive Design**: Works on desktop and mobile devices

---

## 🔧 Technical Implementation

### Authentication Flow
1. User enters credentials on login page
2. System validates against predefined credentials
3. User role is stored in localStorage
4. Automatic redirect to appropriate portal
5. Portal-specific features and permissions applied

### Security Features
- Role-based access control (RBAC)
- Session management
- Secure password handling (in production)
- Two-factor authentication support
- Session timeout configuration

### Data Management
- Mock data for demonstration
- Real-time updates simulation
- Responsive data tables
- Interactive charts and metrics

---

## 📱 Portal Features Overview

### Admin Portal Capabilities
- **Dashboard**: System-wide metrics and health monitoring
- **User Management**: Create, edit, and manage all user accounts
- **System Settings**: Configure security, performance, and operational parameters
- **Analytics**: Comprehensive business intelligence and reporting

### Manager Portal Capabilities
- **Dashboard**: Team performance and operational metrics
- **Team Management**: Oversee team members and assign tasks
- **Performance Analytics**: Track team efficiency and productivity
- **Approval Workflow**: Manage pending approvals and decisions

### Operator Portal Capabilities
- **Dashboard**: Personal task metrics and efficiency tracking
- **Task Management**: Execute assigned tasks and update status
- **Shipment Tracking**: Update shipment status and location
- **Quick Actions**: Rapid access to common operational tasks

### Customer Portal Capabilities
- **Dashboard**: Personal shipment and order overview
- **Shipment Tracking**: Real-time tracking of all shipments
- **Order History**: Complete order and delivery history
- **Support System**: Create and manage support tickets

---

## 🚀 Getting Started

### 1. Start the Development Server
```bash
npm run dev
```

### 2. Access the Application
Open your browser and navigate to: http://localhost:3000

### 3. Login with Test Credentials
Use any of the provided email/password combinations to access different portals.

### 4. Explore Portal Features
Each portal provides a unique set of features tailored to the user's role and responsibilities.

---

## 🔄 Portal Navigation

### Cross-Portal Navigation
- Users can sign out from any portal to return to login
- Direct URL access to specific portals
- Role-based redirects after authentication

### Portal-Specific Features
- **Admin**: Full system control and oversight
- **Manager**: Team leadership and operational management
- **Operator**: Task execution and customer service
- **Customer**: Self-service and support access

---

## 📊 System Requirements

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Device Support
- Desktop: Full feature access
- Tablet: Responsive design with touch support
- Mobile: Optimized mobile interface

---

## 🔒 Security Notes

### Development Environment
- Credentials are hardcoded for demonstration
- No real authentication backend
- localStorage used for session management

### Production Considerations
- Implement secure authentication backend
- Use JWT tokens or similar for session management
- Enable HTTPS for all communications
- Implement proper password hashing
- Add rate limiting and security headers

---

## 📞 Support & Documentation

For technical support or questions about the portal system:
- Check the console for debugging information
- Review the role-based access matrix
- Ensure correct credentials are being used
- Verify the development server is running

---

*This documentation provides comprehensive information about the TransBot AI portal system, including access credentials, feature descriptions, and technical implementation details.*
