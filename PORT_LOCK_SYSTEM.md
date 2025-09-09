# 🔒 **PORT LOCK SYSTEM - CRITICAL CONFIGURATION**

## 🚨 **MCP AGENTS: DO NOT MODIFY THESE PORTS!**

**Date**: January 9, 2025  
**Status**: 🔒 **PORTS LOCKED - DO NOT CHANGE**  
**Reason**: Multi-time MCP agent interference causing errors

---

## 🔒 **LOCKED PORT CONFIGURATION**

### **CRITICAL: THESE PORTS ARE LOCKED AND MUST NOT BE CHANGED**

| Port     | Service      | Status        | Lock Reason                      |
| -------- | ------------ | ------------- | -------------------------------- |
| **3000** | Main Website | 🔒 **LOCKED** | Primary application server       |
| **3001** | MCP API      | 🔒 **LOCKED** | API server for autonomous agents |
| **3006** | Login System | 🔒 **LOCKED** | Authentication portal            |

---

## 🚨 **MCP AGENT WARNINGS**

### **⚠️ CRITICAL INSTRUCTIONS FOR MCP AGENTS:**

1. **DO NOT MODIFY** port configurations in any files
2. **DO NOT CHANGE** vite.config.ts port settings
3. **DO NOT ALTER** package.json scripts
4. **DO NOT UPDATE** server configurations
5. **DO NOT MODIFY** any port-related environment variables

### **🔒 PROTECTED FILES:**

- `vite.config.ts` - Port 3000 configuration
- `portal-app/vite.config.ts` - Port 3006 configuration
- `server/mcp-server.js` - Port 3001 configuration
- `package.json` - Script configurations
- Any port-related configuration files

---

## 🛡️ **PORT PROTECTION MECHANISMS**

### **1. Configuration Locks**

```javascript
// PORT LOCK - DO NOT MODIFY
const LOCKED_PORTS = {
  MAIN_WEBSITE: 3000, // LOCKED
  MCP_API: 3001, // LOCKED
  LOGIN_SYSTEM: 3006, // LOCKED
};
```

### **2. Environment Variable Protection**

```env
# PORT LOCK - DO NOT MODIFY
MAIN_PORT=3000
MCP_PORT=3001
LOGIN_PORT=3006
```

### **3. Script Protection**

```json
{
  "scripts": {
    "dev": "vite --port 3000", // LOCKED
    "dev:mcp": "node server/mcp-server.js --port 3001", // LOCKED
    "dev:portal": "vite --port 3006" // LOCKED
  }
}
```

---

## 🔧 **CURRENT WORKING CONFIGURATION**

### **Port 3000 - Main Website**

- **File**: `vite.config.ts`
- **Command**: `npm run dev`
- **URL**: `http://localhost:3000`
- **Status**: ✅ **RUNNING & LOCKED**

### **Port 3001 - MCP API**

- **File**: `server/mcp-server.js`
- **Command**: `npm run dev:mcp`
- **URL**: `http://localhost:3001`
- **Status**: ✅ **RUNNING & LOCKED**

### **Port 3006 - Login System**

- **File**: `portal-app/vite.config.ts`
- **Command**: `cd portal-app && npm run dev`
- **URL**: `http://localhost:3006`
- **Status**: ✅ **RUNNING & LOCKED**

---

## 🚨 **EMERGENCY PROCEDURES**

### **If Ports Are Changed by MCP Agents:**

1. **Immediate Action**: Restore original configuration
2. **Check Files**: Verify all port configurations
3. **Restart Services**: Restart all three services
4. **Verify Status**: Confirm all ports are working
5. **Document Issue**: Report MCP agent interference

### **Restoration Commands:**

```bash
# Kill any processes on locked ports
npx kill-port 3000
npx kill-port 3001
npx kill-port 3006

# Restart services with correct ports
npm run dev          # Port 3000
npm run dev:mcp      # Port 3001
cd portal-app && npm run dev  # Port 3006
```

---

## 📋 **VERIFICATION CHECKLIST**

### **Before Any Changes:**

- [ ] Check if change affects port configuration
- [ ] Verify change doesn't modify locked ports
- [ ] Test changes don't interfere with running services
- [ ] Document any necessary modifications

### **After Any Changes:**

- [ ] Verify all three ports are still running
- [ ] Test all services are accessible
- [ ] Confirm no port conflicts
- [ ] Update documentation if needed

---

## 🔍 **MONITORING & ALERTS**

### **Port Status Monitoring:**

```bash
# Check port status
netstat -ano | findstr ":300"

# Expected output:
# TCP    0.0.0.0:3000     LISTENING  (Main Website)
# TCP    0.0.0.0:3001     LISTENING  (MCP API)
# TCP    127.0.0.1:3006   LISTENING  (Login System)
```

### **Service Health Checks:**

- **Port 3000**: `curl http://localhost:3000`
- **Port 3001**: `curl http://localhost:3001/api/mcp/system/health`
- **Port 3006**: `curl http://localhost:3006`

---

## 🎯 **MCP AGENT COMPLIANCE**

### **✅ ALLOWED ACTIONS:**

- Update application code (non-port related)
- Modify business logic
- Enhance features and functionality
- Update documentation
- Improve performance (non-port related)

### **❌ FORBIDDEN ACTIONS:**

- Change port numbers
- Modify port configurations
- Update server port settings
- Alter environment port variables
- Modify package.json port scripts

---

## 📞 **SUPPORT & ESCALATION**

### **If MCP Agents Violate Port Locks:**

1. **Immediate**: Restore configuration
2. **Document**: Record violation details
3. **Escalate**: Report to system administrator
4. **Prevent**: Implement additional safeguards

---

## ✅ **LOCK STATUS CONFIRMATION**

**🔒 ALL THREE PORTS ARE LOCKED AND PROTECTED**

- **Port 3000**: Main Website - 🔒 **LOCKED**
- **Port 3001**: MCP API - 🔒 **LOCKED**
- **Port 3006**: Login System - 🔒 **LOCKED**

**MCP AGENTS: DO NOT MODIFY THESE PORTS!**

---

**Last Updated**: January 9, 2025  
**Lock Status**: 🔒 **ACTIVE**  
**Next Review**: Manual verification only
