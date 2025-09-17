# 🎛️ TMS Dynamic Function System

## 📋 **Overview**

The TMS Dynamic Function System allows users to activate or deactivate specific functions based on their role, subscription level, and business needs. This provides a flexible, customizable experience where only relevant functions appear in the sidebar.

## 🎯 **Key Features**

- ✅ **Dynamic Sidebar**: Functions appear/disappear based on activation status
- ✅ **Role-Based Recommendations**: Suggested functions for each user role
- ✅ **Subscription Control**: Function availability based on subscription level
- ✅ **Real-Time Toggle**: Instant activation/deactivation of functions
- ✅ **Visual Feedback**: Clear indication of active/inactive functions
- ✅ **Function Descriptions**: Detailed explanations for each function

## 🔧 **Available Functions**

### **Core Functions (Always Available)**

- **Dashboard** - Overview and key metrics
- **Settings** - System configuration and function management

### **TMS Functions (Activate/Deactivate)**

1. **Load Management** - Manage shipments and loads
2. **Fleet Management** - Manage vehicles and drivers
3. **Financial Management** - Billing and payment management
4. **Communication Hub** - Messaging and collaboration
5. **Analytics & Reports** - Business intelligence and insights
6. **Business Directory** - Network of business partners
7. **Rate Management** - Freight rates and pricing
8. **Freight Marketplace** - Buy and sell freight capacity
9. **EDI Integration** - Electronic data interchange
10. **Advanced Financials** - Advanced financial management
11. **Customer Relationship** - Customer and partner management
12. **Load Board** - Freight matching platform
13. **Factoring Services** - Invoice factoring and financing
14. **Onboarding & E-Sign** - Legal documents and contracts

## 👥 **Role-Based Function Recommendations**

### **Shipper Role**

**Essential Functions:**

- Load Management
- Financial Management
- Communication Hub
- Directory
- Rates

**Optional Functions:**

- Analytics & Reports
- EDI Integration
- Onboarding & E-Sign

### **Broker Role**

**Essential Functions:**

- Load Management
- Financial Management
- CRM
- Load Board
- Marketplace
- Directory

**Optional Functions:**

- Analytics & Reports
- EDI Integration
- Advanced Financials
- Onboarding & E-Sign

### **Carrier Role**

**Essential Functions:**

- Load Management
- Fleet Management
- Financial Management
- Load Board
- Marketplace

**Optional Functions:**

- Analytics & Reports
- EDI Integration
- Advanced Financials
- Factoring Services
- Onboarding & E-Sign

### **Owner Operator Role**

**Essential Functions:**

- Load Management
- Fleet Management
- Financial Management
- Load Board
- Factoring

**Optional Functions:**

- Analytics & Reports
- Marketplace
- Onboarding & E-Sign

## 🎨 **User Interface**

### **Function Activation Panel**

- **Grid Layout**: 3-column responsive grid
- **Visual Status**: Green for active, gray for inactive
- **Toggle Buttons**: Click to activate/deactivate
- **Function Cards**: Icon, name, description, and status
- **Real-Time Updates**: Sidebar updates immediately

### **Sidebar Display**

- **Dynamic Width**: Expands to show descriptions
- **Function Descriptions**: Brief explanations under each function
- **Visual Hierarchy**: Clear distinction between functions
- **Smooth Transitions**: Animated show/hide effects

### **Settings Integration**

- **Function Management**: Centralized control panel
- **Role Information**: Current role and subscription display
- **Recommendations**: Role-specific function suggestions
- **Status Overview**: Active function count and limits

## 🔄 **Function Activation Flow**

1. **User Access**: Navigate to Settings → Function Activation
2. **View Functions**: See all available functions with descriptions
3. **Toggle Functions**: Click toggle buttons to activate/deactivate
4. **Real-Time Update**: Sidebar updates immediately
5. **Visual Feedback**: Function cards show active/inactive status
6. **Persistent State**: Settings saved for user session

## 📊 **Function Categories**

### **Core TMS Functions**

- Load Management
- Fleet Management
- Financial Management
- Communication Hub

### **Business Functions**

- Business Directory
- Rate Management
- Freight Marketplace
- Load Board

### **Advanced Functions**

- EDI Integration
- Advanced Financials
- CRM
- Factoring Services

### **Compliance Functions**

- Onboarding & E-Sign
- Analytics & Reports

## 🎯 **Benefits**

### **For Users**

- ✅ **Customized Experience**: See only relevant functions
- ✅ **Reduced Clutter**: Clean, focused interface
- ✅ **Role Optimization**: Functions tailored to user needs
- ✅ **Easy Management**: Simple toggle system

### **For Administrators**

- ✅ **Flexible Control**: Easy function management
- ✅ **Subscription Management**: Control based on plan
- ✅ **User Onboarding**: Guided function selection
- ✅ **Analytics**: Track function usage

### **For Business**

- ✅ **Scalable Architecture**: Easy to add new functions
- ✅ **Subscription Tiers**: Different function sets per plan
- ✅ **User Adoption**: Gradual feature introduction
- ✅ **Cost Control**: Function-based pricing

## 🚀 **Implementation Details**

### **State Management**

```typescript
interface TMSUser {
  activeFunctions: TMSFunction[];
  // ... other user properties
}

type TMSFunction =
  | 'dashboard'
  | 'loads'
  | 'fleet'
  | 'financial'
  | 'communication'
  | 'analytics'
  | 'settings'
  | 'directory'
  | 'rates'
  | 'marketplace'
  | 'edi'
  | 'financials'
  | 'crm'
  | 'loadboard'
  | 'factoring'
  | 'onboarding';
```

### **Dynamic Menu Generation**

```typescript
const getFilteredMenuConfig = (activeFunctions: TMSFunction[]) => {
  const allMenuConfig = getAllMenuConfig();
  const filteredMenu: any = {};

  activeFunctions.forEach(func => {
    if (allMenuConfig[func]) {
      filteredMenu[func] = allMenuConfig[func];
    }
  });

  return filteredMenu;
};
```

### **Function Toggle Handler**

```typescript
const handleFunctionToggle = (functionName: TMSFunction) => {
  const currentFunctions = state.user.activeFunctions;
  const newFunctions = currentFunctions.includes(functionName)
    ? currentFunctions.filter(f => f !== functionName)
    : [...currentFunctions, functionName];

  setState(prev => ({
    ...prev,
    user: { ...prev.user, activeFunctions: newFunctions },
  }));
};
```

## 📱 **Responsive Design**

### **Desktop (1024px+)**

- 3-column function grid
- Full sidebar with descriptions
- Hover effects and animations

### **Tablet (768px - 1023px)**

- 2-column function grid
- Collapsible sidebar
- Touch-friendly toggles

### **Mobile (320px - 767px)**

- 1-column function grid
- Bottom navigation
- Swipe gestures

## 🔮 **Future Enhancements**

### **Planned Features**

- **Function Dependencies**: Some functions require others
- **Usage Analytics**: Track which functions are used most
- **Bulk Activation**: Activate multiple functions at once
- **Function Presets**: Pre-configured function sets
- **Admin Override**: Super admin can force function activation
- **Function Limits**: Subscription-based function limits

### **Advanced Features**

- **Function Scheduling**: Time-based function activation
- **Role Templates**: Pre-defined function sets per role
- **Function Groups**: Organize functions into categories
- **Custom Functions**: User-defined function categories
- **Function Permissions**: Granular access control

## 📝 **Usage Examples**

### **Shipper Setup**

1. Activate: Load Management, Financial Management, Communication Hub
2. Optional: Directory, Rates, Analytics
3. Result: Clean interface focused on shipping needs

### **Broker Setup**

1. Activate: Load Management, CRM, Load Board, Marketplace
2. Optional: Financial Management, Directory, Analytics
3. Result: Broker-focused interface for freight matching

### **Carrier Setup**

1. Activate: Load Management, Fleet Management, Load Board
2. Optional: Financial Management, Marketplace, Factoring
3. Result: Fleet management focused interface

### **Owner Operator Setup**

1. Activate: Load Management, Fleet Management, Factoring
2. Optional: Load Board, Financial Management
3. Result: Small fleet management interface

## 🎉 **Conclusion**

The TMS Dynamic Function System provides a flexible, user-friendly way to customize the TMS experience. Users can activate only the functions they need, creating a clean, focused interface that adapts to their role and business requirements.

This system enables:

- **Better User Experience**: Relevant functions only
- **Easier Onboarding**: Gradual feature introduction
- **Subscription Flexibility**: Function-based pricing
- **Scalable Architecture**: Easy to extend and modify

The implementation is complete and ready for use, providing a solid foundation for the TMS application's growth and customization.

---

**Status**: ✅ **Complete** - Dynamic function system implemented and ready
**Next**: Begin implementing individual function modules
**Timeline**: Ready for module development based on priorities
