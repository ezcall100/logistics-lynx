# 🔒 PORT LOCK SYSTEM

## MCP AGENTS: CRITICAL PORT CONFIGURATION

**⚠️ DO NOT MODIFY THESE PORTS WITHOUT EXPLICIT AUTHORIZATION ⚠️**

### Port Allocation:

| Port     | Service            | Purpose                      | Status    |
| -------- | ------------------ | ---------------------------- | --------- |
| **3000** | Main Website       | Primary Trans Bot AI website | 🔒 LOCKED |
| **3001** | MCP API            | Model Context Protocol API   | 🔒 LOCKED |
| **3002** | MCP Dashboard      | MCP Dashboard interface      | 🔒 LOCKED |
| **3005** | Super Admin Portal | Main Super Admin dashboard   | 🔒 LOCKED |
| **3006** | Login Portal       | Dedicated login service      | 🔒 LOCKED |

### Configuration Files:

- **Main Project**: `vite.config.ts` → Port 3000 (Main Website)
- **Portal App**: `portal-app/vite.config.ts` → Port 3006 (Login Portal)
- **Super Admin Portal**: `super-admin-portal/vite.config.ts` → Port 3005 (Super Admin Portal)
- **MCP Dashboard**: `mcp-server/vite.config.ts` → Port 3002 (MCP Dashboard)
- **MCP API**: `server/mcp-server.js` → Port 3001 (MCP API)

### Access URLs:

- **Main Website**: `http://localhost:3000`
- **MCP API**: `http://localhost:3001`
- **MCP Dashboard**: `http://localhost:3002`
- **Super Admin Portal**: `http://localhost:3005`
- **Login Portal**: `http://localhost:3006`

### Login Credentials:

- **Email**: `superadmin@transbotai.com`
- **Password**: `password123`

### Security Notes:

- All ports use `strictPort: true` to prevent automatic port changes
- Port conflicts will cause startup failures (by design)
- Each service has isolated configuration
- HMR (Hot Module Reload) configured per port

### Troubleshooting:

If ports are in use:

1. Check running processes: `netstat -an | findstr ":300[0-6]"`
2. Kill conflicting processes
3. Restart services in order: MCP API → Main Website → Super Admin → Login Portal

### MCP Agent Instructions:

- **NEVER** change port numbers without explicit user permission
- **ALWAYS** use `strictPort: true` in vite configurations
- **DOCUMENT** any port changes in this file
- **TEST** all services after any configuration changes

---

**Last Updated**: $(date)
**MCP Agent**: Super Admin Portal System
**Status**: ✅ ALL PORTS LOCKED AND CONFIGURED
