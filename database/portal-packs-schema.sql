-- Portal Pack System Database Schema
-- This replaces the separate portal architecture with a composable pack system

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Portal Packs Table
CREATE TABLE portal_packs (
    code TEXT PRIMARY KEY CHECK (code ~ '^[A-Z_]+$'),
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Core', 'Business', 'Admin')),
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    color TEXT NOT NULL,
    sort_order INTEGER DEFAULT 100,
    is_active BOOLEAN DEFAULT true,
    required_plan TEXT NOT NULL CHECK (required_plan IN ('starter', 'pro', 'enterprise')),
    dependencies TEXT[] DEFAULT '{}',
    features TEXT[] DEFAULT '{}',
    version TEXT DEFAULT '1.0.0',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organization Pack Entitlements
CREATE TABLE org_pack_entitlements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    pack_code TEXT NOT NULL REFERENCES portal_packs(code) ON DELETE CASCADE,
    enabled BOOLEAN DEFAULT true,
    plan_tier TEXT NOT NULL DEFAULT 'starter' CHECK (plan_tier IN ('starter', 'pro', 'enterprise')),
    enabled_at TIMESTAMPTZ DEFAULT NOW(),
    disabled_at TIMESTAMPTZ,
    enabled_by UUID REFERENCES app_users(id),
    disabled_by UUID REFERENCES app_users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(org_id, pack_code)
);

-- Role Pack Capabilities
CREATE TABLE role_pack_caps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_code TEXT NOT NULL REFERENCES roles(code) ON DELETE CASCADE,
    pack_code TEXT NOT NULL REFERENCES portal_packs(code) ON DELETE CASCADE,
    permissions TEXT[] DEFAULT '{}',
    can_read BOOLEAN DEFAULT false,
    can_write BOOLEAN DEFAULT false,
    can_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(role_code, pack_code)
);

-- User Layouts (per-user saved dashboards)
CREATE TABLE user_layouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    layout_json JSONB NOT NULL,
    is_default BOOLEAN DEFAULT false,
    device_type TEXT NOT NULL DEFAULT 'desktop' CHECK (device_type IN ('desktop', 'tablet', 'mobile')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pack Usage Analytics
CREATE TABLE pack_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    pack_code TEXT NOT NULL REFERENCES portal_packs(code) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
    action TEXT NOT NULL CHECK (action IN ('view', 'create', 'update', 'delete', 'export')),
    resource TEXT NOT NULL,
    resource_id TEXT,
    metadata JSONB DEFAULT '{}',
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT
);

-- Pack Configurations (per-org settings)
CREATE TABLE pack_configs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pack_code TEXT NOT NULL REFERENCES portal_packs(code) ON DELETE CASCADE,
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    settings JSONB DEFAULT '{}',
    customizations JSONB DEFAULT '{}',
    integrations JSONB DEFAULT '{}',
    webhooks JSONB DEFAULT '{}',
    api_keys JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(pack_code, org_id)
);

-- Pack Notifications
CREATE TABLE pack_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pack_code TEXT NOT NULL REFERENCES portal_packs(code) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('info', 'success', 'warning', 'error')),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    action_url TEXT,
    action_text TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent'))
);

-- Quick Actions
CREATE TABLE quick_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pack_code TEXT NOT NULL REFERENCES portal_packs(code) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT NOT NULL,
    action_type TEXT NOT NULL,
    action_data JSONB DEFAULT '{}',
    required_permissions TEXT[] DEFAULT '{}',
    category TEXT NOT NULL,
    is_visible BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 100,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Quick Action Preferences
CREATE TABLE user_quick_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    quick_action_id UUID NOT NULL REFERENCES quick_actions(id) ON DELETE CASCADE,
    is_pinned BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 100,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, org_id, quick_action_id)
);

-- Indexes for performance
CREATE INDEX idx_org_pack_entitlements_org_id ON org_pack_entitlements(org_id);
CREATE INDEX idx_org_pack_entitlements_pack_code ON org_pack_entitlements(pack_code);
CREATE INDEX idx_org_pack_entitlements_enabled ON org_pack_entitlements(enabled);

CREATE INDEX idx_role_pack_caps_role_code ON role_pack_caps(role_code);
CREATE INDEX idx_role_pack_caps_pack_code ON role_pack_caps(pack_code);

CREATE INDEX idx_user_layouts_user_org ON user_layouts(user_id, org_id);
CREATE INDEX idx_user_layouts_device_type ON user_layouts(device_type);

CREATE INDEX idx_pack_usage_org_pack ON pack_usage(org_id, pack_code);
CREATE INDEX idx_pack_usage_user ON pack_usage(user_id);
CREATE INDEX idx_pack_usage_timestamp ON pack_usage(timestamp);

CREATE INDEX idx_pack_configs_org_pack ON pack_configs(org_id, pack_code);

CREATE INDEX idx_pack_notifications_user_org ON pack_notifications(user_id, org_id);
CREATE INDEX idx_pack_notifications_pack_code ON pack_notifications(pack_code);
CREATE INDEX idx_pack_notifications_created_at ON pack_notifications(created_at);

CREATE INDEX idx_quick_actions_pack_code ON quick_actions(pack_code);
CREATE INDEX idx_quick_actions_category ON quick_actions(category);
CREATE INDEX idx_quick_actions_visible ON quick_actions(is_visible);

CREATE INDEX idx_user_quick_actions_user_org ON user_quick_actions(user_id, org_id);

-- Row Level Security (RLS) Policies
ALTER TABLE org_pack_entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_pack_caps ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_layouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE pack_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE pack_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE pack_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quick_actions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for org_pack_entitlements
CREATE POLICY "Users can view entitlements for their organization" ON org_pack_entitlements
    FOR SELECT USING (org_id = current_setting('app.current_org_id')::UUID);

CREATE POLICY "Super admins can manage all entitlements" ON org_pack_entitlements
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM app_users u
            JOIN user_org_memberships uom ON u.id = uom.user_id
            WHERE u.id = auth.uid() 
            AND uom.role_code = 'SUPER_ADMIN'
        )
    );

-- RLS Policies for user_layouts
CREATE POLICY "Users can manage their own layouts" ON user_layouts
    FOR ALL USING (
        user_id = auth.uid() 
        AND org_id = current_setting('app.current_org_id')::UUID
    );

-- RLS Policies for pack_usage
CREATE POLICY "Users can view usage for their organization" ON pack_usage
    FOR SELECT USING (org_id = current_setting('app.current_org_id')::UUID);

-- RLS Policies for pack_configs
CREATE POLICY "Users can view configs for their organization" ON pack_configs
    FOR SELECT USING (org_id = current_setting('app.current_org_id')::UUID);

CREATE POLICY "Admins can manage configs for their organization" ON pack_configs
    FOR ALL USING (
        org_id = current_setting('app.current_org_id')::UUID
        AND EXISTS (
            SELECT 1 FROM app_users u
            JOIN user_org_memberships uom ON u.id = uom.user_id
            WHERE u.id = auth.uid() 
            AND uom.role_code IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

-- RLS Policies for pack_notifications
CREATE POLICY "Users can view their own notifications" ON pack_notifications
    FOR SELECT USING (
        user_id = auth.uid() 
        AND org_id = current_setting('app.current_org_id')::UUID
    );

-- RLS Policies for user_quick_actions
CREATE POLICY "Users can manage their own quick actions" ON user_quick_actions
    FOR ALL USING (
        user_id = auth.uid() 
        AND org_id = current_setting('app.current_org_id')::UUID
    );

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_portal_packs_updated_at BEFORE UPDATE ON portal_packs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_org_pack_entitlements_updated_at BEFORE UPDATE ON org_pack_entitlements
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_role_pack_caps_updated_at BEFORE UPDATE ON role_pack_caps
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_layouts_updated_at BEFORE UPDATE ON user_layouts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pack_configs_updated_at BEFORE UPDATE ON pack_configs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quick_actions_updated_at BEFORE UPDATE ON quick_actions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Functions for common operations
CREATE OR REPLACE FUNCTION get_user_entitled_packs(user_uuid UUID, org_uuid UUID)
RETURNS TABLE(pack_code TEXT, enabled BOOLEAN, plan_tier TEXT) AS $$
BEGIN
    RETURN QUERY
    SELECT ope.pack_code, ope.enabled, ope.plan_tier
    FROM org_pack_entitlements ope
    WHERE ope.org_id = org_uuid AND ope.enabled = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_user_pack_permissions(user_uuid UUID, org_uuid UUID, pack_code TEXT)
RETURNS TABLE(permissions TEXT[], can_read BOOLEAN, can_write BOOLEAN, can_admin BOOLEAN) AS $$
BEGIN
    RETURN QUERY
    SELECT rpc.permissions, rpc.can_read, rpc.can_write, rpc.can_admin
    FROM role_pack_caps rpc
    JOIN user_org_memberships uom ON rpc.role_code = uom.role_code
    WHERE uom.user_id = user_uuid 
    AND uom.org_id = org_uuid 
    AND rpc.pack_code = get_user_pack_permissions.pack_code;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comments
COMMENT ON TABLE portal_packs IS 'Available portal packs that can be enabled per organization';
COMMENT ON TABLE org_pack_entitlements IS 'Which packs are enabled for each organization';
COMMENT ON TABLE role_pack_caps IS 'Role-based capabilities for each pack';
COMMENT ON TABLE user_layouts IS 'User-specific dashboard layouts saved per device type';
COMMENT ON TABLE pack_usage IS 'Analytics tracking for pack usage';
COMMENT ON TABLE pack_configs IS 'Organization-specific configurations for each pack';
COMMENT ON TABLE pack_notifications IS 'Pack-specific notifications for users';
COMMENT ON TABLE quick_actions IS 'Quick action definitions for each pack';
COMMENT ON TABLE user_quick_actions IS 'User preferences for quick actions';
