-- Enhanced Super Admin Database Schema
-- Complete schema for TransBot AI Super Admin Portal
-- Production-ready with RLS, indexes, and constraints

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create custom types
CREATE TYPE user_role AS ENUM (
  'Super Admin', 'Admin', 'Manager', 'User', 'Viewer',
  'Broker Admin', 'Shipper Admin', 'Carrier Admin', 'Driver',
  'Owner Operator', 'Analyst', 'Ops', 'Billing Admin', 'Auditor'
);
CREATE TYPE user_status AS ENUM ('Active', 'Inactive', 'Suspended', 'Pending');
CREATE TYPE company_plan AS ENUM ('Basic', 'Standard', 'Professional', 'Enterprise');
CREATE TYPE company_status AS ENUM ('Active', 'Trial', 'Suspended', 'Inactive');
CREATE TYPE billing_cycle AS ENUM ('monthly', 'yearly');
CREATE TYPE portal_type AS ENUM (
  'super-admin', 'admin', 'broker', 'shipper', 'carrier', 'driver',
  'owner-operator', 'analytics', 'crm', 'financials', 'load-board',
  'marketplace', 'edi', 'autonomous', 'workers', 'rates', 'directory',
  'factoring', 'warehouse', 'fleet', 'dispatch', 'maintenance'
);
CREATE TYPE ai_agent_status AS ENUM ('Active', 'Inactive', 'Training', 'Deployed', 'Error');
CREATE TYPE ticket_status AS ENUM ('Open', 'In Progress', 'Resolved', 'Closed');
CREATE TYPE ticket_priority AS ENUM ('Low', 'Medium', 'High', 'Critical');
CREATE TYPE security_event_type AS ENUM (
  'Login', 'Logout', 'Permission Change', 'Data Access', 'Data Modification',
  'Failed Login', 'Suspicious Activity', 'Security Violation'
);

-- Companies table
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255) UNIQUE NOT NULL,
    plan company_plan DEFAULT 'Basic',
    status company_status DEFAULT 'Trial',
    max_users INTEGER DEFAULT 10,
    storage_limit INTEGER DEFAULT 10, -- in GB
    api_calls_limit INTEGER DEFAULT 1000,
    custom_branding BOOLEAN DEFAULT false,
    sso_enabled BOOLEAN DEFAULT false,
    audit_logs BOOLEAN DEFAULT false,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50),
    contact_address TEXT,
    billing_email VARCHAR(255),
    billing_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role user_role DEFAULT 'User',
    status user_status DEFAULT 'Pending',
    phone VARCHAR(50),
    department VARCHAR(100),
    title VARCHAR(100),
    permissions TEXT[] DEFAULT '{}',
    two_factor_enabled BOOLEAN DEFAULT false,
    password_last_changed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    login_attempts INTEGER DEFAULT 0,
    last_failed_login TIMESTAMP WITH TIME ZONE,
    last_login TIMESTAMP WITH TIME ZONE,
    avatar_url TEXT,
    timezone VARCHAR(50) DEFAULT 'UTC',
    language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portal configurations table
CREATE TABLE portal_configs (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    portal_type portal_type NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    config JSONB DEFAULT '{}',
    theme_config JSONB DEFAULT '{}',
    header_config JSONB DEFAULT '{}',
    sidebar_config JSONB DEFAULT '{}',
    dashboard_config JSONB DEFAULT '{}',
    permissions JSONB DEFAULT '{}',
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Agents table
CREATE TABLE ai_agents (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    agent_type VARCHAR(100) NOT NULL,
    status ai_agent_status DEFAULT 'Inactive',
    config JSONB DEFAULT '{}',
    model_config JSONB DEFAULT '{}',
    training_data JSONB DEFAULT '{}',
    performance_metrics JSONB DEFAULT '{}',
    permissions JSONB DEFAULT '{}',
    created_by INTEGER REFERENCES users(id),
    last_trained TIMESTAMP WITH TIME ZONE,
    last_deployed TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Agent workflows table
CREATE TABLE ai_agent_workflows (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    agent_id INTEGER REFERENCES ai_agents(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    workflow_config JSONB DEFAULT '{}',
    trigger_conditions JSONB DEFAULT '{}',
    actions JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System metrics table
CREATE TABLE system_metrics (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metric_type VARCHAR(100) NOT NULL,
    metric_name VARCHAR(255) NOT NULL,
    metric_value DECIMAL(15,4) NOT NULL,
    metric_unit VARCHAR(50),
    tags JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System logs table
CREATE TABLE system_logs (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    level VARCHAR(20) NOT NULL, -- DEBUG, INFO, WARN, ERROR, FATAL
    component VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    context JSONB DEFAULT '{}',
    user_id INTEGER REFERENCES users(id),
    company_id INTEGER REFERENCES companies(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System alerts table
CREATE TABLE system_alerts (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    alert_type VARCHAR(100) NOT NULL,
    severity VARCHAR(20) NOT NULL, -- LOW, MEDIUM, HIGH, CRITICAL
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'Open', -- Open, Acknowledged, Resolved, Closed
    source VARCHAR(100),
    metadata JSONB DEFAULT '{}',
    assigned_to INTEGER REFERENCES users(id),
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolved_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Security events table
CREATE TABLE security_events (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    event_type security_event_type NOT NULL,
    severity VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    ip_address INET,
    user_agent TEXT,
    user_id INTEGER REFERENCES users(id),
    company_id INTEGER REFERENCES companies(id),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API keys table
CREATE TABLE api_keys (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    key_hash VARCHAR(255) NOT NULL UNIQUE,
    permissions TEXT[] DEFAULT '{}',
    rate_limit INTEGER DEFAULT 1000,
    expires_at TIMESTAMP WITH TIME ZONE,
    last_used TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Support tickets table
CREATE TABLE support_tickets (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100),
    status ticket_status DEFAULT 'Open',
    priority ticket_priority DEFAULT 'Medium',
    assigned_to INTEGER REFERENCES users(id),
    metadata JSONB DEFAULT '{}',
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolved_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ticket comments table
CREATE TABLE ticket_comments (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    ticket_id INTEGER REFERENCES support_tickets(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    comment TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Communication messages table
CREATE TABLE communication_messages (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    from_user_id INTEGER REFERENCES users(id),
    to_user_id INTEGER REFERENCES users(id),
    message_type VARCHAR(50) NOT NULL, -- chat, email, sms, voice, video
    subject VARCHAR(255),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CRM contacts table
CREATE TABLE crm_contacts (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    company VARCHAR(255),
    title VARCHAR(100),
    department VARCHAR(100),
    lead_source VARCHAR(100),
    status VARCHAR(50) DEFAULT 'New',
    notes TEXT,
    metadata JSONB DEFAULT '{}',
    assigned_to INTEGER REFERENCES users(id),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CRM opportunities table
CREATE TABLE crm_opportunities (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    contact_id INTEGER REFERENCES crm_contacts(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    value DECIMAL(15,2),
    currency VARCHAR(3) DEFAULT 'USD',
    stage VARCHAR(50) DEFAULT 'Prospecting',
    probability INTEGER DEFAULT 0,
    close_date DATE,
    metadata JSONB DEFAULT '{}',
    assigned_to INTEGER REFERENCES users(id),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit logs table
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    user_id INTEGER REFERENCES users(id),
    company_id INTEGER REFERENCES companies(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id VARCHAR(255),
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Deployment logs table
CREATE TABLE deployment_logs (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    deployment_type VARCHAR(100) NOT NULL,
    environment VARCHAR(50) NOT NULL,
    version VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL, -- Started, In Progress, Completed, Failed, Rolled Back
    details JSONB DEFAULT '{}',
    logs TEXT,
    deployed_by INTEGER REFERENCES users(id),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_users_company_id ON users(company_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_last_login ON users(last_login);

CREATE INDEX idx_portal_configs_company_id ON portal_configs(company_id);
CREATE INDEX idx_portal_configs_type ON portal_configs(portal_type);
CREATE INDEX idx_portal_configs_active ON portal_configs(is_active);

CREATE INDEX idx_ai_agents_company_id ON ai_agents(company_id);
CREATE INDEX idx_ai_agents_status ON ai_agents(status);
CREATE INDEX idx_ai_agents_type ON ai_agents(agent_type);

CREATE INDEX idx_system_metrics_timestamp ON system_metrics(timestamp);
CREATE INDEX idx_system_metrics_type ON system_metrics(metric_type);
CREATE INDEX idx_system_metrics_name ON system_metrics(metric_name);

CREATE INDEX idx_system_logs_timestamp ON system_logs(timestamp);
CREATE INDEX idx_system_logs_level ON system_logs(level);
CREATE INDEX idx_system_logs_component ON system_logs(component);
CREATE INDEX idx_system_logs_user_id ON system_logs(user_id);

CREATE INDEX idx_security_events_timestamp ON security_events(created_at);
CREATE INDEX idx_security_events_type ON security_events(event_type);
CREATE INDEX idx_security_events_user_id ON security_events(user_id);
CREATE INDEX idx_security_events_severity ON security_events(severity);

CREATE INDEX idx_api_keys_company_id ON api_keys(company_id);
CREATE INDEX idx_api_keys_hash ON api_keys(key_hash);
CREATE INDEX idx_api_keys_active ON api_keys(is_active);

CREATE INDEX idx_support_tickets_company_id ON support_tickets(company_id);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_support_tickets_priority ON support_tickets(priority);
CREATE INDEX idx_support_tickets_assigned_to ON support_tickets(assigned_to);

CREATE INDEX idx_communication_messages_company_id ON communication_messages(company_id);
CREATE INDEX idx_communication_messages_from_user ON communication_messages(from_user_id);
CREATE INDEX idx_communication_messages_to_user ON communication_messages(to_user_id);
CREATE INDEX idx_communication_messages_type ON communication_messages(message_type);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_company_id ON audit_logs(company_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(created_at);

-- Enable Row Level Security
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_agent_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE communication_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE deployment_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Companies: Super admins can see all, others can see their own
CREATE POLICY "Companies visibility" ON companies
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.company_id = companies.id 
            AND users.auth_user_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.auth_user_id = auth.uid() 
            AND users.role = 'Super Admin'
        )
    );

-- Users: Super admins can see all, others can see users in their company
CREATE POLICY "Users visibility" ON users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users u1 
            WHERE u1.auth_user_id = auth.uid() 
            AND (u1.role = 'Super Admin' OR u1.company_id = users.company_id)
        )
    );

-- Portal configs: Company users can see their company's portals
CREATE POLICY "Portal configs visibility" ON portal_configs
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.company_id = portal_configs.company_id 
            AND users.auth_user_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.auth_user_id = auth.uid() 
            AND users.role = 'Super Admin'
        )
    );

-- AI Agents: Company users can see their company's agents
CREATE POLICY "AI agents visibility" ON ai_agents
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.company_id = ai_agents.company_id 
            AND users.auth_user_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.auth_user_id = auth.uid() 
            AND users.role = 'Super Admin'
        )
    );

-- System metrics: Super admins and system users can see all
CREATE POLICY "System metrics visibility" ON system_metrics
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.auth_user_id = auth.uid() 
            AND users.role IN ('Super Admin', 'Admin', 'Manager')
        )
    );

-- System logs: Company users can see their company's logs
CREATE POLICY "System logs visibility" ON system_logs
    FOR ALL USING (
        company_id IS NULL OR
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.company_id = system_logs.company_id 
            AND users.auth_user_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.auth_user_id = auth.uid() 
            AND users.role = 'Super Admin'
        )
    );

-- Security events: Super admins and security users can see all
CREATE POLICY "Security events visibility" ON security_events
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.auth_user_id = auth.uid() 
            AND users.role IN ('Super Admin', 'Admin')
        )
    );

-- API keys: Company users can see their company's keys
CREATE POLICY "API keys visibility" ON api_keys
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.company_id = api_keys.company_id 
            AND users.auth_user_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.auth_user_id = auth.uid() 
            AND users.role = 'Super Admin'
        )
    );

-- Support tickets: Company users can see their company's tickets
CREATE POLICY "Support tickets visibility" ON support_tickets
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.company_id = support_tickets.company_id 
            AND users.auth_user_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.auth_user_id = auth.uid() 
            AND users.role = 'Super Admin'
        )
    );

-- Communication messages: Users can see their own messages
CREATE POLICY "Communication messages visibility" ON communication_messages
    FOR ALL USING (
        from_user_id = (SELECT id FROM users WHERE auth_user_id = auth.uid()) OR
        to_user_id = (SELECT id FROM users WHERE auth_user_id = auth.uid()) OR
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.auth_user_id = auth.uid() 
            AND users.role = 'Super Admin'
        )
    );

-- CRM contacts: Company users can see their company's contacts
CREATE POLICY "CRM contacts visibility" ON crm_contacts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.company_id = crm_contacts.company_id 
            AND users.auth_user_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.auth_user_id = auth.uid() 
            AND users.role = 'Super Admin'
        )
    );

-- CRM opportunities: Company users can see their company's opportunities
CREATE POLICY "CRM opportunities visibility" ON crm_opportunities
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.company_id = crm_opportunities.company_id 
            AND users.auth_user_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.auth_user_id = auth.uid() 
            AND users.role = 'Super Admin'
        )
    );

-- Audit logs: Super admins and admins can see audit logs
CREATE POLICY "Audit logs visibility" ON audit_logs
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.auth_user_id = auth.uid() 
            AND users.role IN ('Super Admin', 'Admin')
        )
    );

-- Deployment logs: Super admins and deployment users can see deployment logs
CREATE POLICY "Deployment logs visibility" ON deployment_logs
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.company_id = deployment_logs.company_id 
            AND users.auth_user_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.auth_user_id = auth.uid() 
            AND users.role = 'Super Admin'
        )
    );

-- Create functions for common operations
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portal_configs_updated_at BEFORE UPDATE ON portal_configs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_agents_updated_at BEFORE UPDATE ON ai_agents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_agent_workflows_updated_at BEFORE UPDATE ON ai_agent_workflows
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_alerts_updated_at BEFORE UPDATE ON system_alerts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_api_keys_updated_at BEFORE UPDATE ON api_keys
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON support_tickets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crm_contacts_updated_at BEFORE UPDATE ON crm_contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crm_opportunities_updated_at BEFORE UPDATE ON crm_opportunities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create audit log entry
CREATE OR REPLACE FUNCTION create_audit_log(
    p_user_id INTEGER,
    p_company_id INTEGER,
    p_action VARCHAR,
    p_resource_type VARCHAR,
    p_resource_id VARCHAR DEFAULT NULL,
    p_old_values JSONB DEFAULT NULL,
    p_new_values JSONB DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO audit_logs (
        user_id, company_id, action, resource_type, resource_id,
        old_values, new_values, ip_address, user_agent
    ) VALUES (
        p_user_id, p_company_id, p_action, p_resource_type, p_resource_id,
        p_old_values, p_new_values,
        inet_client_addr(), current_setting('request.headers', true)::json->>'user-agent'
    );
END;
$$ LANGUAGE plpgsql;

-- Function to check user permissions
CREATE OR REPLACE FUNCTION has_permission(
    p_user_id INTEGER,
    p_permission VARCHAR
)
RETURNS BOOLEAN AS $$
DECLARE
    user_permissions TEXT[];
BEGIN
    SELECT permissions INTO user_permissions FROM users WHERE id = p_user_id;
    
    -- Super Admin has all permissions
    IF EXISTS (SELECT 1 FROM users WHERE id = p_user_id AND role = 'Super Admin') THEN
        RETURN TRUE;
    END IF;
    
    -- Check if user has the specific permission
    RETURN p_permission = ANY(user_permissions) OR '*' = ANY(user_permissions);
END;
$$ LANGUAGE plpgsql;

-- Insert default super admin user (this should be done after auth setup)
-- Note: This is a placeholder - actual implementation should be done through the auth system
INSERT INTO companies (name, domain, plan, status, contact_email) VALUES
('TransBot AI', 'transbot.ai', 'Enterprise', 'Active', 'admin@transbot.ai');

-- Create full-text search indexes
CREATE INDEX idx_users_search ON users USING gin(to_tsvector('english', name || ' ' || email || ' ' || COALESCE(department, '') || ' ' || COALESCE(title, '')));
CREATE INDEX idx_companies_search ON companies USING gin(to_tsvector('english', name || ' ' || domain));
CREATE INDEX idx_support_tickets_search ON support_tickets USING gin(to_tsvector('english', title || ' ' || description));
CREATE INDEX idx_crm_contacts_search ON crm_contacts USING gin(to_tsvector('english', name || ' ' || COALESCE(email, '') || ' ' || COALESCE(company, '') || ' ' || COALESCE(title, '')));

-- Create materialized views for common queries
CREATE MATERIALIZED VIEW user_stats AS
SELECT 
    c.id as company_id,
    c.name as company_name,
    COUNT(u.id) as total_users,
    COUNT(CASE WHEN u.status = 'Active' THEN 1 END) as active_users,
    COUNT(CASE WHEN u.status = 'Inactive' THEN 1 END) as inactive_users,
    COUNT(CASE WHEN u.status = 'Suspended' THEN 1 END) as suspended_users,
    COUNT(CASE WHEN u.role = 'Super Admin' THEN 1 END) as super_admins,
    COUNT(CASE WHEN u.role = 'Admin' THEN 1 END) as admins,
    COUNT(CASE WHEN u.role = 'Manager' THEN 1 END) as managers,
    COUNT(CASE WHEN u.role = 'User' THEN 1 END) as users,
    MAX(u.last_login) as last_user_login
FROM companies c
LEFT JOIN users u ON c.id = u.company_id
GROUP BY c.id, c.name;

CREATE UNIQUE INDEX idx_user_stats_company_id ON user_stats(company_id);

-- Refresh function for materialized views
CREATE OR REPLACE FUNCTION refresh_user_stats()
RETURNS VOID AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY user_stats;
END;
$$ LANGUAGE plpgsql;

-- Create a function to get system health status
CREATE OR REPLACE FUNCTION get_system_health()
RETURNS JSONB AS $$
DECLARE
    result JSONB;
BEGIN
    SELECT jsonb_build_object(
        'total_companies', (SELECT COUNT(*) FROM companies),
        'total_users', (SELECT COUNT(*) FROM users),
        'active_users', (SELECT COUNT(*) FROM users WHERE status = 'Active'),
        'total_ai_agents', (SELECT COUNT(*) FROM ai_agents),
        'active_ai_agents', (SELECT COUNT(*) FROM ai_agents WHERE status = 'Active'),
        'open_tickets', (SELECT COUNT(*) FROM support_tickets WHERE status = 'Open'),
        'critical_alerts', (SELECT COUNT(*) FROM system_alerts WHERE severity = 'CRITICAL' AND status = 'Open'),
        'system_uptime', (SELECT EXTRACT(EPOCH FROM NOW() - MIN(created_at)) FROM system_logs),
        'last_updated', NOW()
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Grant service role permissions for system operations
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO service_role;
