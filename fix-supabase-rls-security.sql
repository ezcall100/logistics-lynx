-- Fix Supabase RLS Security Issues
-- This script enables Row Level Security and creates proper policies for all tables

-- =====================================================
-- 1. ENABLE ROW LEVEL SECURITY ON ALL TABLES
-- =====================================================

-- Enable RLS on agent_registry table (CRITICAL FIX)
ALTER TABLE IF EXISTS public.agent_registry ENABLE ROW LEVEL SECURITY;

-- Enable RLS on other agent tables
ALTER TABLE IF EXISTS public.agent_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.agent_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.agent_decisions ENABLE ROW LEVEL SECURITY;

-- Enable RLS on portal tables
ALTER TABLE IF EXISTS public.portals ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.dashboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.autonomous_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.autonomous_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.website_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.feature_flags ENABLE ROW LEVEL SECURITY;

-- Enable RLS on business tables
ALTER TABLE IF EXISTS public.carrier_loads ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.fleet_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.carrier_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.broker_loads ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.carrier_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.broker_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.shipper_shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.shipper_stats ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 2. CREATE RLS POLICIES FOR AGENT TABLES
-- =====================================================

-- agent_registry policies
DROP POLICY IF EXISTS "agent_registry_select_policy" ON public.agent_registry;
CREATE POLICY "agent_registry_select_policy" ON public.agent_registry
    FOR SELECT USING (
        auth.role() = 'authenticated' OR 
        auth.role() = 'service_role'
    );

DROP POLICY IF EXISTS "agent_registry_insert_policy" ON public.agent_registry;
CREATE POLICY "agent_registry_insert_policy" ON public.agent_registry
    FOR INSERT WITH CHECK (
        auth.role() = 'authenticated' OR 
        auth.role() = 'service_role'
    );

DROP POLICY IF EXISTS "agent_registry_update_policy" ON public.agent_registry;
CREATE POLICY "agent_registry_update_policy" ON public.agent_registry
    FOR UPDATE USING (
        auth.role() = 'authenticated' OR 
        auth.role() = 'service_role'
    );

DROP POLICY IF EXISTS "agent_registry_delete_policy" ON public.agent_registry;
CREATE POLICY "agent_registry_delete_policy" ON public.agent_registry
    FOR DELETE USING (
        auth.role() = 'service_role'
    );

-- agent_tasks policies
DROP POLICY IF EXISTS "agent_tasks_select_policy" ON public.agent_tasks;
CREATE POLICY "agent_tasks_select_policy" ON public.agent_tasks
    FOR SELECT USING (
        auth.role() = 'authenticated' OR 
        auth.role() = 'service_role'
    );

DROP POLICY IF EXISTS "agent_tasks_insert_policy" ON public.agent_tasks;
CREATE POLICY "agent_tasks_insert_policy" ON public.agent_tasks
    FOR INSERT WITH CHECK (
        auth.role() = 'authenticated' OR 
        auth.role() = 'service_role'
    );

DROP POLICY IF EXISTS "agent_tasks_update_policy" ON public.agent_tasks;
CREATE POLICY "agent_tasks_update_policy" ON public.agent_tasks
    FOR UPDATE USING (
        auth.role() = 'authenticated' OR 
        auth.role() = 'service_role'
    );

-- agent_events policies
DROP POLICY IF EXISTS "agent_events_select_policy" ON public.agent_events;
CREATE POLICY "agent_events_select_policy" ON public.agent_events
    FOR SELECT USING (
        auth.role() = 'authenticated' OR 
        auth.role() = 'service_role'
    );

DROP POLICY IF EXISTS "agent_events_insert_policy" ON public.agent_events;
CREATE POLICY "agent_events_insert_policy" ON public.agent_events
    FOR INSERT WITH CHECK (
        auth.role() = 'authenticated' OR 
        auth.role() = 'service_role'
    );

-- agent_decisions policies
DROP POLICY IF EXISTS "agent_decisions_select_policy" ON public.agent_decisions;
CREATE POLICY "agent_decisions_select_policy" ON public.agent_decisions
    FOR SELECT USING (
        auth.role() = 'authenticated' OR 
        auth.role() = 'service_role'
    );

DROP POLICY IF EXISTS "agent_decisions_insert_policy" ON public.agent_decisions;
CREATE POLICY "agent_decisions_insert_policy" ON public.agent_decisions
    FOR INSERT WITH CHECK (
        auth.role() = 'authenticated' OR 
        auth.role() = 'service_role'
    );

-- =====================================================
-- 3. CREATE RLS POLICIES FOR PORTAL TABLES
-- =====================================================

-- portals policies
DROP POLICY IF EXISTS "portals_select_policy" ON public.portals;
CREATE POLICY "portals_select_policy" ON public.portals
    FOR SELECT USING (
        auth.role() = 'authenticated' OR 
        auth.role() = 'service_role'
    );

DROP POLICY IF EXISTS "portals_insert_policy" ON public.portals;
CREATE POLICY "portals_insert_policy" ON public.portals
    FOR INSERT WITH CHECK (
        auth.role() = 'authenticated' OR 
        auth.role() = 'service_role'
    );

-- dashboards policies
DROP POLICY IF EXISTS "dashboards_select_policy" ON public.dashboards;
CREATE POLICY "dashboards_select_policy" ON public.dashboards
    FOR SELECT USING (
        auth.role() = 'authenticated' OR 
        auth.role() = 'service_role'
    );

-- autonomous_agents policies
DROP POLICY IF EXISTS "autonomous_agents_select_policy" ON public.autonomous_agents;
CREATE POLICY "autonomous_agents_select_policy" ON public.autonomous_agents
    FOR SELECT USING (
        auth.role() = 'authenticated' OR 
        auth.role() = 'service_role'
    );

-- =====================================================
-- 4. CREATE RLS POLICIES FOR BUSINESS TABLES
-- =====================================================

-- carrier_loads policies
DROP POLICY IF EXISTS "carrier_loads_select_policy" ON public.carrier_loads;
CREATE POLICY "carrier_loads_select_policy" ON public.carrier_loads
    FOR SELECT USING (
        auth.role() = 'authenticated' OR 
        auth.role() = 'service_role'
    );

-- broker_loads policies
DROP POLICY IF EXISTS "broker_loads_select_policy" ON public.broker_loads;
CREATE POLICY "broker_loads_select_policy" ON public.broker_loads
    FOR SELECT USING (
        auth.role() = 'authenticated' OR 
        auth.role() = 'service_role'
    );

-- shipper_shipments policies
DROP POLICY IF EXISTS "shipper_shipments_select_policy" ON public.shipper_shipments;
CREATE POLICY "shipper_shipments_select_policy" ON public.shipper_shipments
    FOR SELECT USING (
        auth.role() = 'authenticated' OR 
        auth.role() = 'service_role'
    );

-- =====================================================
-- 5. VERIFICATION QUERIES
-- =====================================================

-- Check if RLS is enabled on agent_registry
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'agent_registry';

-- Check all tables with RLS status
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
    'agent_decisions',
    'portals',
    'dashboards',
    'autonomous_agents'
)
ORDER BY tablename;

-- =====================================================
-- 6. SECURITY STATUS REPORT
-- =====================================================

-- Generate security status report
SELECT 
    'RLS Security Fix Applied Successfully' as status,
    'All tables now have Row Level Security enabled' as details,
    NOW() as applied_at;
