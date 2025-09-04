# Trans Bot AI - Portal OS Architecture

## Overview

The Portal OS is a unified, composable system that replaces the traditional separate portal architecture with a single, intelligent shell that dynamically composes content from "portal packs" based on user roles, organization plans, and entitlements.

## 🚀 Key Benefits

- **One URL, One Login, One Shell**: Users sign in once and access everything through a unified interface
- **No Context Switching**: All functionality is available in one place without portal hopping
- **Dynamic Composition**: Dashboard and navigation automatically adapt to user entitlements
- **Scalable**: Adding new features means creating new packs, not rebuilding portals
- **Enterprise Ready**: Built-in role-based access control, audit trails, and compliance features

## 🏗️ Architecture Components

### 1. Portal Packs (24 Total)

#### Core TMS Packs (9)
- **BROKER** 🚛 - Load management, carrier matching, rate negotiation
- **CARRIER** 🚚 - Fleet management, driver management, route planning
- **DRIVER** 👨‍💼 - Load viewing, route maps, document upload
- **SHIPPER** 📦 - Shipment creation, carrier search, tracking
- **ADMIN** ⚙️ - System administration and control
- **SUPER_ADMIN** 🏛️ - Global system administration
- **ANALYTICS** 📊 - Advanced analytics and reporting
- **AUTONOMOUS** 🤖 - AI agents and automation
- **OWNER_OPERATOR** 👤 - Individual operator management

#### Business Packs (11)
- **DIRECTORY** 📇 - Business directory and networking
- **RATES** 💰 - Rate management and optimization
- **WORKERS** 👷 - Workforce management and HR
- **MARKETPLACE** 🛒 - Load and capacity marketplace
- **EDI** 📄 - Electronic Data Interchange
- **FINANCIALS** 💳 - Financial management and accounting
- **CRM** 📞 - Customer relationship management
- **LOAD_BOARD** 🧾 - Load board and capacity management
- **FACTORING** 🏦 - Invoice factoring and financing
- **ONBOARDING** 🎯 - User and organization onboarding
- **TMS_ADMIN** 🖥️ - TMS system administration

#### Admin Sub-Packs (4)
- **SHIPPER_ADMIN** 📦 - Shipper-specific administration
- **BROKER_ADMIN** 🤝 - Broker-specific administration
- **CARRIER_ADMIN** 🚛 - Carrier-specific administration
- **OWNER_OPERATOR_ADMIN** 👤 - Owner-operator administration

### 2. Core System Components

#### Pack Registry (`src/lib/pack-registry.ts`)
- Central registry for all portal pack manifests
- Manages pack metadata, permissions, and dependencies
- Singleton pattern for global access

#### Shell Composer (`src/lib/shell-composer.ts`)
- Aggregates widgets and routes from enabled packs
- Filters content based on user permissions
- Provides hooks for React components

#### Core Portal (`src/components/core-portal/CorePortal.tsx`)
- Main unified interface
- Dynamically composes dashboard from enabled packs
- Supports drag-and-drop layout customization

#### Entitlements Admin (`src/components/admin/EntitlementsAdmin.tsx`)
- Manage which packs each organization can access
- Plan-based entitlement management
- Real-time pack enable/disable

### 3. Database Schema

#### Core Tables
```sql
-- Portal Packs
portal_packs (code, name, category, description, icon, color, required_plan, features)

-- Organization Entitlements
org_pack_entitlements (org_id, pack_code, enabled, plan_tier)

-- Role Capabilities
role_pack_caps (role_code, pack_code, permissions, can_read, can_write, can_admin)

-- User Layouts
user_layouts (user_id, org_id, layout_json, device_type)

-- Pack Usage Analytics
pack_usage (org_id, pack_code, user_id, action, resource, timestamp)
```

#### Row Level Security (RLS)
- All tables include `org_id` for multi-tenancy
- Policies check JWT claims for access control
- Audit trails for all pack usage

## 🔐 Authentication & Authorization

### JWT Claims Structure
```json
{
  "sub": "user_id",
  "org_id": "uuid",
  "org_role": "BROKER_ADMIN",
  "packs": ["BROKER", "FINANCIALS", "CRM", "EDI"],
  "permissions": ["loads.read", "loads.write", "invoices.read", "edi.tx.view"],
  "plan": "enterprise"
}
```

### Permission System
- **Granular Permissions**: `resource.action` format (e.g., `loads.read`, `carriers.write`)
- **Role-Based**: Permissions grouped by roles
- **Pack-Scoped**: Permissions tied to specific packs
- **Plan-Dependent**: Some features require specific subscription plans

## 📱 User Experience

### Unified Dashboard
- **Dynamic Composition**: Dashboard automatically assembles from enabled packs
- **Personalized Layouts**: Users can customize widget positions and sizes
- **Cross-Pack Integration**: Widgets from different packs work together seamlessly

### Navigation
- **Category Grouping**: Routes organized by Core/Business/Admin categories
- **Permission Filtering**: Only shows routes user has access to
- **Quick Actions**: Pack-specific actions available from dashboard

### Responsive Design
- **Device Optimization**: Layouts saved per device type (desktop/tablet/mobile)
- **Adaptive UI**: Interface adjusts based on screen size and capabilities

## 🚀 Implementation Guide

### Phase A: Foundation ✅
1. ✅ Database schema and tables
2. ✅ Core types and interfaces
3. ✅ Pack registry system
4. ✅ Shell composer logic

### Phase B: Shell & Registry ✅
1. ✅ Pack registry with manifest contract
2. ✅ Shell composer for aggregating content
3. ✅ Core portal component
4. ✅ Basic widget and route system

### Phase C: Navigation & Guards 🔄
1. 🔄 Unified left navigation
2. 🔄 Route guards with permission checking
3. 🔄 Search and discovery
4. 🔄 Quick actions system

### Phase D: Entitlements & Admin ✅
1. ✅ Entitlements admin interface
2. ✅ Pack enable/disable functionality
3. ✅ Plan-based restrictions
4. ✅ Organization management

### Phase E: Quality & Polish 📋
1. 📋 Drag-and-drop layout editor
2. 📋 Saved layouts per user/device
3. 📋 Advanced widget customization
4. 📋 Performance optimization

## 🧪 Testing Strategy

### Unit Tests
- Pack registry functionality
- Shell composer logic
- Permission checking
- Route filtering

### Integration Tests
- Pack enable/disable flow
- User layout persistence
- Cross-pack widget integration
- Permission enforcement

### E2E Tests
- User onboarding flow
- Pack entitlement changes
- Layout customization
- Role switching

## 🔧 Development Workflow

### Adding New Packs
1. **Create Pack Manifest**: Define widgets, routes, permissions
2. **Register in Registry**: Add to pack registry
3. **Database Seeding**: Add pack to portal_packs table
4. **Role Mapping**: Define which roles can access the pack
5. **Testing**: Verify pack appears correctly for entitled users

### Customizing Existing Packs
1. **Modify Manifest**: Update widgets, routes, or permissions
2. **Database Update**: Modify portal_packs table if needed
3. **Role Updates**: Adjust role_pack_caps if permissions change
4. **Testing**: Verify changes work across all user types

## 📊 Monitoring & Analytics

### Pack Usage Tracking
- **User Actions**: Track all pack interactions
- **Performance Metrics**: Response times, error rates
- **Feature Adoption**: Which packs/features are most used
- **User Behavior**: How users navigate between packs

### Business Intelligence
- **Plan Conversion**: Track plan upgrades
- **Feature Usage**: Understand which features drive value
- **User Engagement**: Measure user activity and retention
- **Revenue Attribution**: Link features to business outcomes

## 🔮 Future Enhancements

### AI-Powered Features
- **Smart Recommendations**: Suggest relevant packs based on usage
- **Predictive Analytics**: Anticipate user needs
- **Automated Insights**: Generate business intelligence automatically

### Advanced Customization
- **White-Labeling**: Custom branding per organization
- **Workflow Builder**: Visual workflow creation
- **API Integration**: Connect external systems seamlessly

### Enterprise Features
- **Multi-Region**: Geographic data distribution
- **Advanced Security**: Enhanced compliance and security features
- **Scalability**: Handle thousands of organizations and users

## 📚 API Reference

### Pack Registry Methods
```typescript
packRegistry.getPack(code: PackCode): PackManifest
packRegistry.getAllPacks(): PackManifest[]
packRegistry.getPacksByCategory(category: PackCategory): PackManifest[]
packRegistry.getEnabledPacks(enabledCodes: PackCode[]): PackManifest[]
```

### Shell Composer Methods
```typescript
shellComposer.getAvailableWidgets(claims: PortalClaims): DashboardWidget[]
shellComposer.getAvailableRoutes(claims: PortalClaims): PackRoute[]
shellComposer.getRoutesGroupedByCategory(claims: PortalClaims): Record<string, PackRoute[]>
shellComposer.validatePackAccess(claims: PortalClaims, packCode: PackCode): boolean
```

### React Hooks
```typescript
const { widgets, routes, routesByCategory, packSummary } = useComposedUI(claims);
```

## 🤝 Contributing

### Code Standards
- **TypeScript**: Strict typing throughout
- **React**: Functional components with hooks
- **Testing**: Comprehensive test coverage
- **Documentation**: Clear inline and external docs

### Development Process
1. **Feature Branch**: Create branch for new features
2. **Pack-First**: Always think in terms of pack architecture
3. **Permission-Aware**: Consider security implications
4. **Test Coverage**: Maintain high test coverage
5. **Documentation**: Update docs with changes

## 📞 Support

### Getting Help
- **Documentation**: This file and inline code comments
- **Code Examples**: See existing pack implementations
- **Architecture Decisions**: Check commit history for context
- **Team Discussion**: Reach out to the development team

### Common Issues
- **Pack Not Appearing**: Check entitlements and permissions
- **Widget Not Loading**: Verify pack is enabled and user has access
- **Permission Denied**: Check role assignments and pack capabilities
- **Layout Issues**: Verify user layout preferences and device type

---

**Trans Bot AI - Portal OS Architecture**  
*Unified. Composable. Scalable.* 🚀
