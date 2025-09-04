# 🔒 Supabase Security Fix Guide

## 🚨 CRITICAL SECURITY ISSUE FOUND

**Problem**: The `public.agent_registry` table (and other tables) are public but don't have Row Level Security (RLS) enabled.

**Impact**: This is a **CRITICAL SECURITY VULNERABILITY** that could expose sensitive data.

## ✅ IMMEDIATE FIX REQUIRED

### Step 1: Apply the RLS Security Fix

1. **Go to your Supabase Dashboard**:
   - Visit: https://supabase.com/dashboard
   - Select your project: `tms-logistics-lynx`

2. **Open SQL Editor**:
   - Click "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run the Security Fix Script**:
   - Copy the entire content from: `fix-supabase-rls-security.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute

### Step 2: Verify the Fix

After running the script, you should see:
- ✅ All tables now have RLS enabled
- ✅ Proper security policies created
- ✅ No more security warnings

## 🔧 What the Fix Does

### 1. Enables Row Level Security (RLS)
```sql
ALTER TABLE IF EXISTS public.agent_registry ENABLE ROW LEVEL SECURITY;
```

### 2. Creates Security Policies
- **Select Policy**: Only authenticated users and service roles can read data
- **Insert Policy**: Only authenticated users and service roles can create data
- **Update Policy**: Only authenticated users and service roles can modify data
- **Delete Policy**: Only service roles can delete data (restricted)

### 3. Protects All Tables
- `agent_registry` ✅
- `agent_tasks` ✅
- `agent_events` ✅
- `agent_decisions` ✅
- `portals` ✅
- `dashboards` ✅
- `autonomous_agents` ✅
- All business tables ✅

## 🛡️ Security Policies Applied

### For Agent Tables:
```sql
-- Only authenticated users and service roles can access
CREATE POLICY "agent_registry_select_policy" ON public.agent_registry
    FOR SELECT USING (
        auth.role() = 'authenticated' OR 
        auth.role() = 'service_role'
    );
```

### For Business Tables:
```sql
-- Only authenticated users and service roles can access
CREATE POLICY "carrier_loads_select_policy" ON public.carrier_loads
    FOR SELECT USING (
        auth.role() = 'authenticated' OR 
        auth.role() = 'service_role'
    );
```

## 🔍 Verification Commands

### Check RLS Status:
```sql
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'agent_registry';
```

### Check All Tables:
```sql
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN (
    'agent_registry',
    'agent_tasks', 
    'agent_events',
    'agent_decisions'
)
ORDER BY tablename;
```

## 🚀 After Applying the Fix

### 1. Test the Application
```bash
npm run dev
```

### 2. Verify MCP API Still Works
```bash
Invoke-WebRequest -Uri "http://localhost:3001/api/mcp/system/health" -Method GET
```

### 3. Test Autonomous Agents
```bash
npm run test:autonomous
```

## 🔐 Security Best Practices

### 1. Environment Variables
Make sure your `.env` file has:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2. Service Role Usage
- Use service role key only for server-side operations
- Use anon key for client-side operations
- Never expose service role key in client code

### 3. Authentication
- Always require authentication for sensitive operations
- Use proper user roles and permissions
- Implement proper session management

## 🚨 Emergency Rollback (If Needed)

If something breaks after applying the fix:

```sql
-- Disable RLS temporarily (NOT RECOMMENDED for production)
ALTER TABLE public.agent_registry DISABLE ROW LEVEL SECURITY;

-- Drop policies if needed
DROP POLICY IF EXISTS "agent_registry_select_policy" ON public.agent_registry;
```

## 📞 Support

If you encounter issues:
1. Check Supabase dashboard for error messages
2. Verify your environment variables
3. Test with the verification commands above
4. Check the application logs for authentication errors

## ✅ Success Indicators

After applying the fix, you should see:
- ✅ No more "RLS Disabled in Public" warnings
- ✅ All tables show `rowsecurity: true`
- ✅ Application still functions normally
- ✅ MCP API responds correctly
- ✅ Autonomous agents work properly

---

**🎯 Priority**: **CRITICAL** - Fix this immediately to secure your data!
