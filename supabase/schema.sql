-- Trans Bot AI Super Admin Portal Database Schema
-- Production-ready schema with RLS, indexes, and constraints

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_role AS ENUM ('Super Admin', 'Admin', 'Manager', 'User', 'Viewer');
CREATE TYPE user_status AS ENUM ('Active', 'Inactive', 'Suspended', 'Pending');
CREATE TYPE company_plan AS ENUM ('Basic', 'Standard', 'Professional', 'Enterprise');
CREATE TYPE company_status AS ENUM ('Active', 'Trial', 'Suspended', 'Inactive');
CREATE TYPE billing_cycle AS ENUM ('monthly', 'yearly');

-- Companies table
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role user_role DEFAULT 'User',
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System metrics table
CREATE TABLE system_metrics (
    id SERIAL PRIMARY KEY,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(15,2) NOT NULL,
    metric_unit VARCHAR(20) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit logs table
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id INTEGER NOT NULL,
    details JSONB DEFAULT '{}',
    ip_address INET NOT NULL,
    user_agent TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portal configurations table
CREATE TABLE portal_configurations (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    portal_name VARCHAR(100) NOT NULL,
    enabled BOOLEAN DEFAULT true,
    features TEXT[] DEFAULT '{}',
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Billing information table
CREATE TABLE billing_info (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    billing_cycle billing_cycle DEFAULT 'monthly',
    next_billing_date DATE,
    payment_method VARCHAR(100),
    subscription_id VARCHAR(255),
    amount DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI agents table
CREATE TABLE ai_agents (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'inactive',
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    configuration JSONB DEFAULT '{}',
    performance_metrics JSONB DEFAULT '{}',
    last_activity TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Security events table
CREATE TABLE security_events (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL,
    severity VARCHAR(20) NOT NULL, -- low, medium, high, critical
    description TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    ip_address INET,
    user_agent TEXT,
    details JSONB DEFAULT '{}',
    resolved BOOLEAN DEFAULT false,
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_companies_domain ON companies(domain);
CREATE INDEX idx_companies_status ON companies(status);
CREATE INDEX idx_companies_plan ON companies(plan);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_company_id ON users(company_id);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_system_metrics_name ON system_metrics(metric_name);
CREATE INDEX idx_system_metrics_timestamp ON system_metrics(timestamp);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_portal_configs_company_id ON portal_configurations(company_id);
CREATE INDEX idx_billing_info_company_id ON billing_info(company_id);
CREATE INDEX idx_ai_agents_company_id ON ai_agents(company_id);
CREATE INDEX idx_ai_agents_status ON ai_agents(status);
CREATE INDEX idx_security_events_severity ON security_events(severity);
CREATE INDEX idx_security_events_resolved ON security_events(resolved);
CREATE INDEX idx_security_events_created_at ON security_events(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portal_configurations_updated_at BEFORE UPDATE ON portal_configurations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_billing_info_updated_at BEFORE UPDATE ON billing_info
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_agents_updated_at BEFORE UPDATE ON ai_agents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for companies
CREATE POLICY "Super admins can view all companies" ON companies
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid()::integer 
            AND users.role = 'Super Admin'
        )
    );

CREATE POLICY "Super admins can insert companies" ON companies
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid()::integer 
            AND users.role = 'Super Admin'
        )
    );

CREATE POLICY "Super admins can update companies" ON companies
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid()::integer 
            AND users.role = 'Super Admin'
        )
    );

CREATE POLICY "Super admins can delete companies" ON companies
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid()::integer 
            AND users.role = 'Super Admin'
        )
    );

-- RLS Policies for users
CREATE POLICY "Super admins can view all users" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users u
            WHERE u.id = auth.uid()::integer 
            AND u.role = 'Super Admin'
        )
    );

CREATE POLICY "Admins can view users in their company" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users u
            WHERE u.id = auth.uid()::integer 
            AND (u.role = 'Admin' OR u.role = 'Super Admin')
            AND u.company_id = users.company_id
        )
    );

CREATE POLICY "Super admins can insert users" ON users
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid()::integer 
            AND users.role = 'Super Admin'
        )
    );

CREATE POLICY "Super admins can update users" ON users
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid()::integer 
            AND users.role = 'Super Admin'
        )
    );

CREATE POLICY "Super admins can delete users" ON users
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid()::integer 
            AND users.role = 'Super Admin'
        )
    );

-- RLS Policies for system_metrics (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view system metrics" ON system_metrics
    FOR SELECT USING (auth.role() = 'authenticated');

-- RLS Policies for audit_logs (read-only for super admins)
CREATE POLICY "Super admins can view audit logs" ON audit_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid()::integer 
            AND users.role = 'Super Admin'
        )
    );

-- Insert initial system metrics
INSERT INTO system_metrics (metric_name, metric_value, metric_unit) VALUES
('total_companies', 0, 'count'),
('total_users', 0, 'count'),
('monthly_revenue', 0, 'USD'),
('system_uptime', 99.97, 'percent'),
('api_calls_per_minute', 0, 'count'),
('database_queries_per_minute', 0, 'count'),
('storage_used_gb', 0, 'GB'),
('bandwidth_gb', 0, 'GB');

-- Insert sample data for development
INSERT INTO companies (name, domain, plan, status, max_users, storage_limit, api_calls_limit, custom_branding, sso_enabled, audit_logs, contact_email, contact_phone, contact_address) VALUES
('Global Logistics Corp', 'globallogistics.com', 'Enterprise', 'Active', 2000, 1000, 100000, true, true, true, 'admin@globallogistics.com', '+1-555-0123', '123 Business Ave, New York, NY 10001'),
('Swift Transport Ltd', 'swifttransport.com', 'Professional', 'Active', 1000, 500, 50000, true, false, true, 'contact@swifttransport.com', '+1-555-0456', '456 Transport St, Los Angeles, CA 90210'),
('Metro Freight Inc', 'metrofreight.com', 'Standard', 'Active', 500, 100, 10000, false, false, false, 'info@metrofreight.com', '+1-555-0789', '789 Freight Blvd, Chicago, IL 60601'),
('Coastal Shipping Co', 'coastalshipping.com', 'Basic', 'Trial', 50, 10, 1000, false, false, false, 'hello@coastalshipping.com', '+1-555-0321', '321 Harbor Dr, Miami, FL 33101');

-- Insert sample users
INSERT INTO users (name, email, role, company_id, status, phone, department, title, permissions, two_factor_enabled) VALUES
('Super Administrator', 'admin@transbot.ai', 'Super Admin', 1, 'Active', '+1-555-0000', 'IT', 'System Administrator', ARRAY['*'], true),
('John Smith', 'john.smith@globallogistics.com', 'Admin', 1, 'Active', '+1-555-0123', 'Operations', 'Operations Manager', ARRAY['user_management', 'company_settings', 'billing', 'analytics'], true),
('Sarah Johnson', 'sarah.johnson@swifttransport.com', 'Manager', 2, 'Active', '+1-555-0456', 'Logistics', 'Logistics Coordinator', ARRAY['user_management', 'project_management', 'reports'], false),
('Mike Davis', 'mike.davis@metrofreight.com', 'User', 3, 'Active', '+1-555-0789', 'Fleet', 'Fleet Coordinator', ARRAY['basic_access', 'view_reports'], true),
('Emily Wilson', 'emily.wilson@coastalshipping.com', 'Viewer', 4, 'Pending', '+1-555-0321', 'Finance', 'Financial Analyst', ARRAY['view_only'], false);

-- Insert sample portal configurations
INSERT INTO portal_configurations (company_id, portal_name, enabled, features, settings) VALUES
(1, 'TMS Core', true, ARRAY['load_management', 'fleet_tracking', 'analytics'], '{"theme": "dark", "notifications": true}'),
(1, 'Load Board', true, ARRAY['load_posting', 'carrier_matching'], '{"auto_match": true, "notifications": true}'),
(1, 'Fleet Management', true, ARRAY['vehicle_tracking', 'maintenance'], '{"gps_enabled": true, "maintenance_alerts": true}'),
(2, 'TMS Core', true, ARRAY['load_management', 'basic_analytics'], '{"theme": "light", "notifications": true}'),
(2, 'Load Board', true, ARRAY['load_posting'], '{"auto_match": false, "notifications": true}'),
(3, 'TMS Core', true, ARRAY['load_management'], '{"theme": "light", "notifications": false}'),
(4, 'TMS Core', true, ARRAY['load_management'], '{"theme": "light", "notifications": false}');

-- Insert sample billing information
INSERT INTO billing_info (company_id, billing_cycle, next_billing_date, payment_method, amount, status) VALUES
(1, 'yearly', '2024-12-15', 'Credit Card', 45000.00, 'active'),
(2, 'monthly', '2024-02-15', 'Bank Transfer', 28500.00, 'active'),
(3, 'monthly', '2024-02-15', 'Credit Card', 15200.00, 'active'),
(4, 'monthly', '2024-02-14', 'Trial', 0.00, 'trial');

-- Insert sample AI agents
INSERT INTO ai_agents (name, type, status, company_id, configuration, performance_metrics, last_activity) VALUES
('Route Optimizer', 'optimization', 'active', 1, '{"algorithm": "genetic", "constraints": ["time", "fuel"]}', '{"success_rate": 95.2, "avg_savings": 12.5}', NOW()),
('Load Matcher', 'matching', 'active', 1, '{"matching_algorithm": "ml", "preferences": ["distance", "rate"]}', '{"match_rate": 87.3, "avg_time": 2.5}', NOW()),
('Demand Forecaster', 'prediction', 'active', 2, '{"model": "lstm", "lookback_days": 30}', '{"accuracy": 89.1, "mape": 8.2}', NOW()),
('Fleet Manager', 'management', 'inactive', 3, '{"auto_dispatch": true, "fuel_optimization": true}', '{"efficiency": 78.5, "cost_savings": 15.2}', NOW() - INTERVAL '1 day');

-- Insert sample security events
INSERT INTO security_events (event_type, severity, description, user_id, company_id, ip_address, details) VALUES
('failed_login', 'medium', 'Multiple failed login attempts detected', 2, 1, '192.168.1.100', '{"attempts": 5, "timeframe": "10 minutes"}'),
('suspicious_activity', 'high', 'Unusual API usage pattern detected', 3, 2, '10.0.0.50', '{"api_calls": 1000, "timeframe": "1 hour"}'),
('password_change', 'low', 'User changed password', 4, 3, '172.16.0.25', '{"user_agent": "Mozilla/5.0..."}'),
('admin_action', 'low', 'Company settings updated', 1, 1, '127.0.0.1', '{"settings_changed": ["max_users", "storage_limit"]}');

-- Create views for common queries
CREATE VIEW company_stats AS
SELECT 
    c.id,
    c.name,
    c.plan,
    c.status,
    COUNT(u.id) as user_count,
    COALESCE(b.amount, 0) as monthly_revenue,
    COUNT(pc.id) as active_portals
FROM companies c
LEFT JOIN users u ON c.id = u.company_id AND u.status = 'Active'
LEFT JOIN billing_info b ON c.id = b.company_id AND b.status = 'active'
LEFT JOIN portal_configurations pc ON c.id = pc.company_id AND pc.enabled = true
GROUP BY c.id, c.name, c.plan, c.status, b.amount;

CREATE VIEW user_activity AS
SELECT 
    u.id,
    u.name,
    u.email,
    u.role,
    c.name as company_name,
    u.status,
    u.last_login,
    u.login_attempts,
    u.two_factor_enabled,
    COUNT(al.id) as audit_actions
FROM users u
LEFT JOIN companies c ON u.company_id = c.id
LEFT JOIN audit_logs al ON u.id = al.user_id
GROUP BY u.id, u.name, u.email, u.role, c.name, u.status, u.last_login, u.login_attempts, u.two_factor_enabled;

-- Create functions for common operations
CREATE OR REPLACE FUNCTION get_company_metrics(company_id_param INTEGER)
RETURNS TABLE (
    total_users INTEGER,
    active_users INTEGER,
    monthly_revenue DECIMAL,
    active_portals INTEGER,
    ai_agents INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(u.id)::INTEGER as total_users,
        COUNT(CASE WHEN u.status = 'Active' THEN 1 END)::INTEGER as active_users,
        COALESCE(b.amount, 0) as monthly_revenue,
        COUNT(CASE WHEN pc.enabled THEN 1 END)::INTEGER as active_portals,
        COUNT(aa.id)::INTEGER as ai_agents
    FROM companies c
    LEFT JOIN users u ON c.id = u.company_id
    LEFT JOIN billing_info b ON c.id = b.company_id AND b.status = 'active'
    LEFT JOIN portal_configurations pc ON c.id = pc.company_id
    LEFT JOIN ai_agents aa ON c.id = aa.company_id AND aa.status = 'active'
    WHERE c.id = company_id_param
    GROUP BY c.id, b.amount;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_system_metrics()
RETURNS VOID AS $$
BEGIN
    -- Update total companies
    UPDATE system_metrics 
    SET metric_value = (SELECT COUNT(*) FROM companies)
    WHERE metric_name = 'total_companies';
    
    -- Update total users
    UPDATE system_metrics 
    SET metric_value = (SELECT COUNT(*) FROM users)
    WHERE metric_name = 'total_users';
    
    -- Update monthly revenue
    UPDATE system_metrics 
    SET metric_value = (SELECT COALESCE(SUM(amount), 0) FROM billing_info WHERE status = 'active')
    WHERE metric_name = 'monthly_revenue';
    
    -- Update storage used (mock calculation)
    UPDATE system_metrics 
    SET metric_value = (SELECT COALESCE(SUM(storage_limit), 0) FROM companies)
    WHERE metric_name = 'storage_used_gb';
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled job to update metrics (requires pg_cron extension)
-- SELECT cron.schedule('update-system-metrics', '*/5 * * * *', 'SELECT update_system_metrics();');

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Create a function to check if user is super admin
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM users 
        WHERE users.id = auth.uid()::integer 
        AND users.role = 'Super Admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get user's company
CREATE OR REPLACE FUNCTION get_user_company()
RETURNS INTEGER AS $$
BEGIN
    RETURN (
        SELECT company_id FROM users 
        WHERE users.id = auth.uid()::integer
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
