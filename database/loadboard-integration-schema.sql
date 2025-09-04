-- Load Board Integration Database Schema
-- This schema supports integration with DAT, Internet Truckstop, Loadboard 123, Trucker Tool, and Trucker Path

-- External Load Boards Configuration
CREATE TABLE IF NOT EXISTS external_load_boards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  api_endpoint TEXT NOT NULL,
  api_key TEXT,
  api_secret TEXT,
  username TEXT,
  password TEXT,
  is_active BOOLEAN DEFAULT true,
  rate_limit_requests_per_minute INTEGER DEFAULT 60,
  rate_limit_requests_per_hour INTEGER DEFAULT 1000,
  features JSONB DEFAULT '[]',
  last_sync TIMESTAMP WITH TIME ZONE,
  sync_status TEXT DEFAULT 'disabled' CHECK (sync_status IN ('active', 'error', 'disabled')),
  sync_interval_minutes INTEGER DEFAULT 15,
  max_loads_per_sync INTEGER DEFAULT 1000,
  retry_attempts INTEGER DEFAULT 3,
  retry_delay_seconds INTEGER DEFAULT 30,
  filters JSONB DEFAULT '{}',
  notifications JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- External Loads
CREATE TABLE IF NOT EXISTS external_loads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  external_id TEXT NOT NULL,
  load_board_id UUID NOT NULL REFERENCES external_load_boards(id) ON DELETE CASCADE,
  origin_city TEXT NOT NULL,
  origin_state TEXT NOT NULL,
  origin_zip_code TEXT,
  origin_latitude NUMERIC(10, 8),
  origin_longitude NUMERIC(11, 8),
  destination_city TEXT NOT NULL,
  destination_state TEXT NOT NULL,
  destination_zip_code TEXT,
  destination_latitude NUMERIC(10, 8),
  destination_longitude NUMERIC(11, 8),
  equipment TEXT NOT NULL,
  weight NUMERIC(10, 2),
  rate NUMERIC(10, 2),
  rate_type TEXT DEFAULT 'flat' CHECK (rate_type IN ('flat', 'per_mile', 'negotiable')),
  pickup_date DATE,
  delivery_date DATE,
  distance INTEGER,
  commodity TEXT,
  special_requirements TEXT[],
  broker_name TEXT,
  broker_phone TEXT,
  broker_email TEXT,
  broker_mc_number TEXT,
  contact_name TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  posted_date TIMESTAMP WITH TIME ZONE,
  expires_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'awarded', 'cancelled')),
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(load_board_id, external_id)
);

-- Load Board Bids
CREATE TABLE IF NOT EXISTS load_board_bids (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  load_id UUID NOT NULL REFERENCES external_loads(id) ON DELETE CASCADE,
  external_load_id TEXT NOT NULL,
  load_board_id UUID NOT NULL REFERENCES external_load_boards(id) ON DELETE CASCADE,
  carrier_id UUID NOT NULL,
  rate NUMERIC(10, 2) NOT NULL,
  notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'expired')),
  response_time INTEGER, -- in seconds
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Load Board Postings (Internal loads posted to external boards)
CREATE TABLE IF NOT EXISTS load_board_postings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  load_board_id UUID NOT NULL REFERENCES external_load_boards(id) ON DELETE CASCADE,
  shipper_id UUID NOT NULL,
  origin_city TEXT NOT NULL,
  origin_state TEXT NOT NULL,
  origin_zip_code TEXT,
  origin_address TEXT,
  destination_city TEXT NOT NULL,
  destination_state TEXT NOT NULL,
  destination_zip_code TEXT,
  destination_address TEXT,
  equipment TEXT NOT NULL,
  weight NUMERIC(10, 2),
  rate NUMERIC(10, 2),
  rate_type TEXT DEFAULT 'flat' CHECK (rate_type IN ('flat', 'per_mile', 'negotiable')),
  pickup_date DATE,
  delivery_date DATE,
  commodity TEXT,
  special_requirements TEXT[],
  contact_name TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  contact_email TEXT,
  notes TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'posted', 'awarded', 'cancelled')),
  posted_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  external_post_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Load Board Sync Status
CREATE TABLE IF NOT EXISTS load_board_sync_status (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  load_board_id UUID NOT NULL REFERENCES external_load_boards(id) ON DELETE CASCADE,
  last_sync TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sync_duration INTEGER, -- in seconds
  loads_synced INTEGER DEFAULT 0,
  errors TEXT[],
  status TEXT DEFAULT 'success' CHECK (status IN ('success', 'partial', 'error')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Load Board Analytics
CREATE TABLE IF NOT EXISTS load_board_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  load_board_id UUID NOT NULL REFERENCES external_load_boards(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_loads INTEGER DEFAULT 0,
  average_rate NUMERIC(10, 2),
  top_lanes JSONB DEFAULT '[]',
  equipment_breakdown JSONB DEFAULT '[]',
  rate_trends JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(load_board_id, date)
);

-- Load Board Integration Status
CREATE TABLE IF NOT EXISTS load_board_integration_status (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  load_board_id UUID NOT NULL REFERENCES external_load_boards(id) ON DELETE CASCADE,
  is_connected BOOLEAN DEFAULT false,
  last_heartbeat TIMESTAMP WITH TIME ZONE,
  api_status TEXT DEFAULT 'down' CHECK (api_status IN ('healthy', 'degraded', 'down')),
  error_count INTEGER DEFAULT 0,
  success_rate NUMERIC(5, 2),
  average_response_time INTEGER, -- in milliseconds
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(load_board_id)
);

-- Unified Loads View (Combines internal and external loads)
CREATE TABLE IF NOT EXISTS unified_loads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source TEXT NOT NULL CHECK (source IN ('dat', 'truckstop', 'loadboard123', 'truckertool', 'truckerpath', 'internal')),
  internal_id UUID,
  external_load_id UUID REFERENCES external_loads(id) ON DELETE CASCADE,
  origin_city TEXT NOT NULL,
  origin_state TEXT NOT NULL,
  origin_zip_code TEXT,
  origin_latitude NUMERIC(10, 8),
  origin_longitude NUMERIC(11, 8),
  destination_city TEXT NOT NULL,
  destination_state TEXT NOT NULL,
  destination_zip_code TEXT,
  destination_latitude NUMERIC(10, 8),
  destination_longitude NUMERIC(11, 8),
  equipment TEXT NOT NULL,
  weight NUMERIC(10, 2),
  rate NUMERIC(10, 2),
  rate_type TEXT DEFAULT 'flat',
  pickup_date DATE,
  delivery_date DATE,
  distance INTEGER,
  commodity TEXT,
  special_requirements TEXT[],
  broker_name TEXT,
  broker_phone TEXT,
  broker_email TEXT,
  contact_name TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  posted_date TIMESTAMP WITH TIME ZONE,
  expires_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'active',
  is_favorite BOOLEAN DEFAULT false,
  is_bidded BOOLEAN DEFAULT false,
  bid_amount NUMERIC(10, 2),
  bid_status TEXT CHECK (bid_status IN ('pending', 'accepted', 'rejected')),
  notes TEXT,
  tags TEXT[],
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Load Board Search History
CREATE TABLE IF NOT EXISTS load_board_search_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  search_criteria JSONB NOT NULL,
  results_count INTEGER DEFAULT 0,
  search_time INTEGER, -- in milliseconds
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Load Board Favorites
CREATE TABLE IF NOT EXISTS load_board_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  unified_load_id UUID NOT NULL REFERENCES unified_loads(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, unified_load_id)
);

-- Load Board Alerts
CREATE TABLE IF NOT EXISTS load_board_alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('new_loads', 'rate_changes', 'lane_alerts', 'equipment_alerts')),
  criteria JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  notification_method TEXT DEFAULT 'email' CHECK (notification_method IN ('email', 'sms', 'push', 'all')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_external_loads_load_board_id ON external_loads(load_board_id);
CREATE INDEX IF NOT EXISTS idx_external_loads_status ON external_loads(status);
CREATE INDEX IF NOT EXISTS idx_external_loads_origin ON external_loads(origin_city, origin_state);
CREATE INDEX IF NOT EXISTS idx_external_loads_destination ON external_loads(destination_city, destination_state);
CREATE INDEX IF NOT EXISTS idx_external_loads_equipment ON external_loads(equipment);
CREATE INDEX IF NOT EXISTS idx_external_loads_rate ON external_loads(rate);
CREATE INDEX IF NOT EXISTS idx_external_loads_pickup_date ON external_loads(pickup_date);
CREATE INDEX IF NOT EXISTS idx_external_loads_posted_date ON external_loads(posted_date);

CREATE INDEX IF NOT EXISTS idx_load_board_bids_load_id ON load_board_bids(load_id);
CREATE INDEX IF NOT EXISTS idx_load_board_bids_carrier_id ON load_board_bids(carrier_id);
CREATE INDEX IF NOT EXISTS idx_load_board_bids_status ON load_board_bids(status);

CREATE INDEX IF NOT EXISTS idx_unified_loads_source ON unified_loads(source);
CREATE INDEX IF NOT EXISTS idx_unified_loads_origin ON unified_loads(origin_city, origin_state);
CREATE INDEX IF NOT EXISTS idx_unified_loads_destination ON unified_loads(destination_city, destination_state);
CREATE INDEX IF NOT EXISTS idx_unified_loads_equipment ON unified_loads(equipment);
CREATE INDEX IF NOT EXISTS idx_unified_loads_rate ON unified_loads(rate);
CREATE INDEX IF NOT EXISTS idx_unified_loads_status ON unified_loads(status);

CREATE INDEX IF NOT EXISTS idx_load_board_favorites_user_id ON load_board_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_load_board_alerts_user_id ON load_board_alerts(user_id);

-- GIN Indexes for JSONB fields
CREATE INDEX IF NOT EXISTS idx_external_loads_raw_data ON external_loads USING GIN (raw_data);
CREATE INDEX IF NOT EXISTS idx_unified_loads_raw_data ON unified_loads USING GIN (raw_data);
CREATE INDEX IF NOT EXISTS idx_load_board_search_history_criteria ON load_board_search_history USING GIN (search_criteria);

-- Trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_external_load_boards_updated_at BEFORE UPDATE ON external_load_boards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_external_loads_updated_at BEFORE UPDATE ON external_loads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_load_board_bids_updated_at BEFORE UPDATE ON load_board_bids FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_load_board_postings_updated_at BEFORE UPDATE ON load_board_postings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_load_board_integration_status_updated_at BEFORE UPDATE ON load_board_integration_status FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_unified_loads_updated_at BEFORE UPDATE ON unified_loads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_load_board_alerts_updated_at BEFORE UPDATE ON load_board_alerts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE external_loads ENABLE ROW LEVEL SECURITY;
ALTER TABLE load_board_bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE load_board_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE load_board_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE load_board_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE load_board_search_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for external_loads (read-only for authenticated users)
CREATE POLICY "External loads are viewable by authenticated users" ON external_loads
  FOR SELECT USING (auth.role() = 'authenticated');

-- RLS Policies for load_board_bids
CREATE POLICY "Users can view their own bids" ON load_board_bids
  FOR SELECT USING (auth.uid() = carrier_id);

CREATE POLICY "Users can insert their own bids" ON load_board_bids
  FOR INSERT WITH CHECK (auth.uid() = carrier_id);

CREATE POLICY "Users can update their own bids" ON load_board_bids
  FOR UPDATE USING (auth.uid() = carrier_id);

-- RLS Policies for load_board_postings
CREATE POLICY "Users can view their own postings" ON load_board_postings
  FOR SELECT USING (auth.uid() = shipper_id);

CREATE POLICY "Users can insert their own postings" ON load_board_postings
  FOR INSERT WITH CHECK (auth.uid() = shipper_id);

CREATE POLICY "Users can update their own postings" ON load_board_postings
  FOR UPDATE USING (auth.uid() = shipper_id);

-- RLS Policies for load_board_favorites
CREATE POLICY "Users can view their own favorites" ON load_board_favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites" ON load_board_favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites" ON load_board_favorites
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for load_board_alerts
CREATE POLICY "Users can view their own alerts" ON load_board_alerts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own alerts" ON load_board_alerts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own alerts" ON load_board_alerts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own alerts" ON load_board_alerts
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for load_board_search_history
CREATE POLICY "Users can view their own search history" ON load_board_search_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own search history" ON load_board_search_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert default external load board configurations
INSERT INTO external_load_boards (name, display_name, api_endpoint, is_active, features) VALUES
('dat', 'DAT Load Board', 'https://api.dat.com/v1', true, '["load_search", "rate_analysis", "broker_ratings"]'),
('truckstop', 'Internet Truckstop', 'https://api.truckstop.com/v2', true, '["load_search", "rate_analysis", "broker_ratings"]'),
('loadboard123', 'Loadboard 123', 'https://api.loadboard123.com/v1', true, '["load_search", "rate_analysis"]'),
('truckertool', 'Trucker Tool', 'https://api.truckertool.com/v1', true, '["load_search", "route_optimization"]'),
('truckerpath', 'Trucker Path', 'https://api.truckerpath.com/v1', true, '["load_search", "truck_stops", "fuel_prices"]')
ON CONFLICT (name) DO NOTHING;

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
