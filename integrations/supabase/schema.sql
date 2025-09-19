-- Trans Bot AI Database Schema
-- This file contains the complete database schema for the Trans Bot AI platform

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'user', 'super_admin');
CREATE TYPE agent_status AS ENUM ('active', 'inactive', 'testing', 'error');
CREATE TYPE agent_type AS ENUM ('refactoring', 'security', 'monitoring', 'deployment');

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    avatar_url TEXT,
    role user_role DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- MCP Agents table
CREATE TABLE IF NOT EXISTS mcp_agents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status agent_status DEFAULT 'inactive',
    type agent_type NOT NULL,
    health_score INTEGER DEFAULT 100 CHECK (health_score >= 0 AND health_score <= 100),
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    assigned_tasks INTEGER DEFAULT 0,
    cpu_usage INTEGER DEFAULT 0 CHECK (cpu_usage >= 0 AND cpu_usage <= 100),
    memory_usage INTEGER DEFAULT 0 CHECK (memory_usage >= 0 AND memory_usage <= 100),
    disk_usage INTEGER DEFAULT 0 CHECK (disk_usage >= 0 AND disk_usage <= 100),
    network_latency INTEGER DEFAULT 0,
    error_rate DECIMAL(5,2) DEFAULT 0.0,
    uptime DECIMAL(5,2) DEFAULT 100.0,
    location VARCHAR(100) NOT NULL,
    ip_address INET NOT NULL,
    version VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System metrics table
CREATE TABLE IF NOT EXISTS system_metrics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    total_agents INTEGER NOT NULL DEFAULT 0,
    active_agents INTEGER NOT NULL DEFAULT 0,
    inactive_agents INTEGER NOT NULL DEFAULT 0,
    testing_agents INTEGER NOT NULL DEFAULT 0,
    error_agents INTEGER NOT NULL DEFAULT 0,
    average_health_score DECIMAL(5,2) DEFAULT 0.0,
    total_tasks_completed INTEGER DEFAULT 0,
    total_errors_fixed INTEGER DEFAULT 0,
    system_uptime DECIMAL(5,2) DEFAULT 100.0,
    last_update TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Communication hub table
CREATE TABLE IF NOT EXISTS communication_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'phone', 'chat', 'email', 'sms', 'crm'
    title VARCHAR(255) NOT NULL,
    content TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'failed'
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity logs table
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    agent_id UUID REFERENCES mcp_agents(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    description TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System settings table
CREATE TABLE IF NOT EXISTS system_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'general',
    description TEXT,
    is_encrypted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_mcp_agents_status ON mcp_agents(status);
CREATE INDEX IF NOT EXISTS idx_mcp_agents_type ON mcp_agents(type);
CREATE INDEX IF NOT EXISTS idx_mcp_agents_health_score ON mcp_agents(health_score);
CREATE INDEX IF NOT EXISTS idx_communication_logs_type ON communication_logs(type);
CREATE INDEX IF NOT EXISTS idx_communication_logs_status ON communication_logs(status);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_system_settings_key ON system_settings(key);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mcp_agents_updated_at BEFORE UPDATE ON mcp_agents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_communication_logs_updated_at BEFORE UPDATE ON communication_logs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE mcp_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE communication_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Super admins can read all data
CREATE POLICY "Super admins can read all users" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );

-- Super admins can manage all users
CREATE POLICY "Super admins can manage all users" ON users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );

-- MCP agents - super admins can manage all
CREATE POLICY "Super admins can manage mcp_agents" ON mcp_agents
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );

-- System metrics - super admins can manage all
CREATE POLICY "Super admins can manage system_metrics" ON system_metrics
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );

-- Communication logs - users can read their own, super admins can read all
CREATE POLICY "Users can read own communication logs" ON communication_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Super admins can manage communication logs" ON communication_logs
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );

-- Activity logs - super admins can read all
CREATE POLICY "Super admins can read activity logs" ON activity_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );

-- System settings - super admins can manage all
CREATE POLICY "Super admins can manage system settings" ON system_settings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );

-- Insert initial system settings
INSERT INTO system_settings (key, value, category, description) VALUES
('app_name', 'Trans Bot AI', 'general', 'Application name'),
('app_version', '1.0.0', 'general', 'Application version'),
('mcp_agents_count', '302', 'agents', 'Total number of MCP agents'),
('system_health_threshold', '80', 'monitoring', 'System health warning threshold'),
('auto_restart_agents', 'true', 'agents', 'Automatically restart failed agents'),
('max_concurrent_tasks', '50', 'performance', 'Maximum concurrent tasks per agent')
ON CONFLICT (key) DO NOTHING;

-- Insert sample MCP agents (you can modify this as needed)
INSERT INTO mcp_agents (name, type, location, ip_address, version) VALUES
('MCP Agent 1', 'refactoring', 'US-East', '192.168.1.1', 'v2.1.0'),
('MCP Agent 2', 'security', 'US-West', '192.168.1.2', 'v2.1.0'),
('MCP Agent 3', 'monitoring', 'EU-Central', '192.168.1.3', 'v2.1.0'),
('MCP Agent 4', 'deployment', 'Asia-Pacific', '192.168.1.4', 'v2.1.0')
ON CONFLICT DO NOTHING;

-- Insert initial system metrics
INSERT INTO system_metrics (
    total_agents, 
    active_agents, 
    inactive_agents, 
    testing_agents, 
    error_agents, 
    average_health_score, 
    total_tasks_completed, 
    total_errors_fixed, 
    system_uptime
) VALUES (
    302, 285, 12, 3, 2, 94.5, 15420, 8932, 99.8
) ON CONFLICT DO NOTHING;
