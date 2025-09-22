# 🚀 LOGISTICS LYNX SUPER ADMIN - API DOCUMENTATION

## 📋 **OVERVIEW**

Comprehensive RESTful API for the Super Admin portal supporting all 71+ components across 8 major modules with enterprise-grade security, real-time capabilities, and automated workflows.

**Created by:** MCP 302 Agents - Phase 2B API Development  
**Timestamp:** 2025-01-20T21:30:00.000Z  
**Base URL:** `/api/v1`  
**Authentication:** Bearer Token (Supabase JWT)  
**Rate Limiting:** Role-based limits  

---

## 🔐 **AUTHENTICATION**

### **Authentication Flow**
1. **Login** → Get access token and refresh token
2. **Include token** in Authorization header: `Bearer <access_token>`
3. **Refresh token** when expired using refresh endpoint
4. **Logout** to invalidate session

### **Headers**
```
Authorization: Bearer <access_token>
Content-Type: application/json
Accept: application/json
```

---

## 📚 **API ENDPOINTS**

### 🔑 **Authentication APIs**

#### **POST /api/auth/login**
Authenticate user and return session tokens.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "remember": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "organization_id": "uuid",
      "organization_name": "Acme Corp",
      "roles": [
        {
          "id": "uuid",
          "name": "Super Admin",
          "permissions": ["users.view", "users.create", ...]
        }
      ]
    },
    "session": {
      "access_token": "jwt_token",
      "refresh_token": "refresh_token",
      "expires_at": 1640995200
    }
  },
  "message": "Login successful"
}
```

#### **POST /api/auth/logout**
Logout user and invalidate session.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Logged out successfully"
  }
}
```

#### **POST /api/auth/refresh**
Refresh access token using refresh token.

**Request:**
```json
{
  "refresh_token": "refresh_token_here"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "access_token": "new_jwt_token",
    "refresh_token": "new_refresh_token",
    "expires_at": 1640995200
  }
}
```

---

### 👥 **User Management APIs**

#### **GET /api/users**
Get paginated list of users with filtering and search.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20, max: 100)
- `search` (string): Search across name, email, title, department
- `is_active` (boolean): Filter by active status
- `department` (string): Filter by department
- `role_id` (string): Filter by role
- `orderBy` (string): Sort field (default: created_at)
- `orderDirection` (string): asc or desc (default: desc)

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "title": "Developer",
      "department": "Engineering",
      "is_active": true,
      "created_at": "2025-01-20T21:00:00Z",
      "roles": [
        {
          "role": {
            "id": "uuid",
            "name": "Developer",
            "color": "#3B82F6"
          }
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

#### **POST /api/users**
Create new user with role assignments.

**Request:**
```json
{
  "email": "newuser@example.com",
  "first_name": "Jane",
  "last_name": "Smith",
  "phone": "+1234567890",
  "title": "Manager",
  "department": "Sales",
  "roles": ["role_uuid_1", "role_uuid_2"],
  "send_invitation": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "newuser@example.com",
    "first_name": "Jane",
    "last_name": "Smith",
    "roles": [...]
  },
  "message": "User created successfully"
}
```

#### **GET /api/users/{id}**
Get user by ID with complete details and permissions.

#### **PUT /api/users/{id}**
Update user information.

**Request:**
```json
{
  "first_name": "Updated Name",
  "title": "Senior Developer",
  "department": "Engineering",
  "is_active": true
}
```

#### **DELETE /api/users/{id}**
Deactivate user (soft delete).

---

### 📊 **System Health APIs**

#### **GET /api/system/metrics**
Get system metrics with filtering and aggregation.

**Query Parameters:**
- `start_time` (ISO string): Start time for metrics (default: 24h ago)
- `end_time` (ISO string): End time for metrics (default: now)
- `metric_type` (string): Filter by metric type
- `metric_name` (string): Filter by metric name
- `tags` (object): Filter by tags

**Response:**
```json
{
  "success": true,
  "data": {
    "metrics": [
      {
        "id": "uuid",
        "metric_type": "cpu",
        "metric_name": "usage",
        "value": 45.5,
        "unit": "%",
        "tags": {"host": "server-1"},
        "timestamp": "2025-01-20T21:00:00Z"
      }
    ],
    "summary": {
      "total_metrics": 1250,
      "time_range": {
        "start": "2025-01-19T21:00:00Z",
        "end": "2025-01-20T21:00:00Z"
      },
      "metric_types": ["cpu", "memory", "disk", "network"]
    }
  },
  "pagination": {...}
}
```

#### **POST /api/system/metrics**
Create new system metric (for external integrations).

**Request:**
```json
{
  "metric_type": "cpu",
  "metric_name": "usage",
  "value": 45.5,
  "unit": "%",
  "tags": {"host": "server-1"},
  "timestamp": "2025-01-20T21:00:00Z"
}
```

#### **GET /api/system/alerts**
Get system alerts with filtering and statistics.

**Query Parameters:**
- `status` (string): active, acknowledged, resolved
- `severity` (string): low, medium, high, critical
- `alert_type` (string): Filter by alert type
- `source_system` (string): Filter by source system
- `start_date` (ISO string): Filter by date range
- `end_date` (ISO string): Filter by date range

**Response:**
```json
{
  "success": true,
  "data": {
    "alerts": [
      {
        "id": "uuid",
        "title": "High CPU Usage",
        "description": "CPU usage exceeded 90%",
        "severity": "high",
        "status": "active",
        "alert_type": "performance",
        "source_system": "monitoring",
        "threshold_value": 90,
        "current_value": 95.5,
        "created_at": "2025-01-20T21:00:00Z"
      }
    ],
    "statistics": {
      "high_active": 5,
      "medium_active": 12,
      "low_resolved": 25
    }
  },
  "pagination": {...}
}
```

#### **POST /api/system/alerts**
Create new system alert.

**Request:**
```json
{
  "title": "Disk Space Low",
  "description": "Disk usage exceeded 85%",
  "severity": "medium",
  "alert_type": "storage",
  "source_system": "monitoring",
  "threshold_value": 85,
  "current_value": 87.2
}
```

#### **PUT /api/system/alerts/bulk**
Bulk update alerts (acknowledge, resolve, reactivate).

**Request:**
```json
{
  "alert_ids": ["uuid1", "uuid2", "uuid3"],
  "action": "acknowledge",
  "resolution_notes": "Issue being investigated"
}
```

---

## 🔒 **SECURITY FEATURES**

### **Rate Limiting**
- **Users:** 100 requests/minute
- **System APIs:** 200 requests/minute
- **Bulk Operations:** 50 requests/minute
- **Authentication:** 20 requests/minute

### **Permissions System**
All endpoints require specific permissions:

**User Management:**
- `users.view` - View users
- `users.create` - Create users
- `users.edit` - Edit users
- `users.delete` - Delete users

**System Management:**
- `system.view` - View system data
- `system.manage` - Manage system data

**Security:**
- `security.view` - View security data
- `security.manage` - Manage security data

### **Audit Logging**
All API requests are automatically logged with:
- User ID and organization
- Action performed
- Resource accessed
- Timestamp and IP address
- Request details

---

## 📈 **REAL-TIME FEATURES**

### **WebSocket Connections**
Real-time updates available for:
- System metrics
- System alerts
- Audit logs
- Chat messages
- Security incidents

### **Event Types**
- `system_metrics:INSERT` - New metric data
- `system_alerts:*` - Alert status changes
- `audit_logs:INSERT` - New audit entries
- `chat_messages:INSERT` - New chat messages

---

## 🚀 **UPCOMING ENDPOINTS**

### **Phase 2B - In Development:**
- **Roles & Permissions APIs** (`/api/roles`, `/api/permissions`)
- **Security APIs** (`/api/security/incidents`, `/api/security/policies`)
- **Deployment APIs** (`/api/deployments`, `/api/environments`)
- **API Management** (`/api/keys`, `/api/endpoints`)
- **AI Agent APIs** (`/api/ai/agents`, `/api/ai/workflows`)
- **Communication APIs** (`/api/chat`, `/api/email`)
- **CRM APIs** (`/api/crm/contacts`, `/api/crm/opportunities`)
- **Ticket APIs** (`/api/tickets`, `/api/support`)
- **Backup APIs** (`/api/backup`, `/api/maintenance`)

### **Phase 2C - AI Integration:**
- **OpenAI Integration** (`/api/ai/chat`, `/api/ai/automation`)
- **Smart Analytics** (`/api/analytics/insights`)
- **Automated Workflows** (`/api/workflows/execute`)

### **Phase 2D - n8n Integration:**
- **Workflow Management** (`/api/workflows`)
- **Automation Triggers** (`/api/automation/triggers`)
- **External Integrations** (`/api/integrations`)

---

## 🔧 **ERROR HANDLING**

### **Standard Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "details": {
    "field": "validation error details"
  }
}
```

### **HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `429` - Rate Limited
- `500` - Internal Server Error

---

## 📝 **USAGE EXAMPLES**

### **JavaScript/TypeScript:**
```typescript
// Login
const loginResponse = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const { data } = await loginResponse.json();
const token = data.session.access_token;

// Get users
const usersResponse = await fetch('/api/users?page=1&limit=10', {
  headers: { 'Authorization': `Bearer ${token}` }
});

// Create alert
const alertResponse = await fetch('/api/system/alerts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'High Memory Usage',
    severity: 'high',
    alert_type: 'performance'
  })
});
```

### **cURL Examples:**
```bash
# Login
curl -X POST /api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get users
curl -X GET /api/users \
  -H "Authorization: Bearer <token>"

# Create metric
curl -X POST /api/system/metrics \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"metric_type":"cpu","metric_name":"usage","value":45.5}'
```

---

## 🎯 **NEXT STEPS**

1. **Deploy API endpoints** to production environment
2. **Integrate with frontend** Super Admin portal
3. **Set up monitoring** and logging
4. **Implement remaining endpoints** for all modules
5. **Add AI integration** with OpenAI APIs
6. **Connect n8n workflows** for automation

**API Development Status: 25% Complete**  
**Ready for frontend integration and testing!** 🚀
