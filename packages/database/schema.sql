-- GBAKI Digital Solutions Database Schema
-- PostgreSQL 15+

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users & Authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    password_hash VARCHAR(255) NOT NULL,
    country_of_origin VARCHAR(100),
    languages VARCHAR[],
    immigration_status VARCHAR(50),
    email_verified BOOLEAN DEFAULT false,
    phone_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    is_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);

-- Packages
CREATE TABLE packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    tier VARCHAR(50) NOT NULL, -- starter, growth, premium
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    services JSONB NOT NULL, -- flexible service list
    features TEXT[],
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_packages_tier ON packages(tier);
CREATE INDEX idx_packages_active ON packages(active);

-- Orders
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    package_id UUID REFERENCES packages(id),
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, processing, completed, cancelled
    total_amount DECIMAL(10,2) NOT NULL,
    payment_status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, paid, failed, refunded
    payment_method VARCHAR(50),
    stripe_payment_intent_id VARCHAR(255),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);

-- Businesses
CREATE TABLE businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id),
    business_name VARCHAR(255) NOT NULL,
    legal_structure VARCHAR(50), -- LLC, Corp, etc
    state_of_formation VARCHAR(2),
    ein VARCHAR(20),
    formation_date DATE,
    industry VARCHAR(100),
    status VARCHAR(50) DEFAULT 'forming', -- forming, active, inactive
    website_url VARCHAR(255),
    phone_number VARCHAR(20),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(2),
    zip_code VARCHAR(10),
    country VARCHAR(100) DEFAULT 'USA',
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_businesses_user_id ON businesses(user_id);
CREATE INDEX idx_businesses_status ON businesses(status);

-- Services Delivered
CREATE TABLE services_delivered (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    business_id UUID REFERENCES businesses(id) ON DELETE SET NULL,
    service_type VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, in_progress, completed, failed
    assigned_to VARCHAR(255),
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    notes TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_services_order_id ON services_delivered(order_id);
CREATE INDEX idx_services_status ON services_delivered(status);
CREATE INDEX idx_services_type ON services_delivered(service_type);

-- Documents
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    document_type VARCHAR(100) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(50),
    s3_key VARCHAR(500),
    is_public BOOLEAN DEFAULT false,
    uploaded_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_documents_business_id ON documents(business_id);
CREATE INDEX idx_documents_type ON documents(document_type);

-- Websites
CREATE TABLE websites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
    domain VARCHAR(255),
    subdomain VARCHAR(255),
    hosting_provider VARCHAR(100),
    cms_platform VARCHAR(50),
    theme_template VARCHAR(100),
    status VARCHAR(50) DEFAULT 'building', -- building, live, maintenance, archived
    ssl_enabled BOOLEAN DEFAULT false,
    deployed_at TIMESTAMP,
    launched_at TIMESTAMP,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_websites_business_id ON websites(business_id);
CREATE INDEX idx_websites_status ON websites(status);

-- AI Services Usage
CREATE TABLE ai_services_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
    service_type VARCHAR(100) NOT NULL, -- chatbot, content_gen, voice, etc
    usage_count INTEGER DEFAULT 0,
    last_used TIMESTAMP,
    subscription_tier VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ai_services_user_id ON ai_services_usage(user_id);
CREATE INDEX idx_ai_services_type ON ai_services_usage(service_type);

-- Communications
CREATE TABLE communications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    business_id UUID REFERENCES businesses(id) ON DELETE SET NULL,
    channel VARCHAR(50) NOT NULL, -- email, sms, whatsapp, call
    direction VARCHAR(20) NOT NULL, -- inbound, outbound
    recipient VARCHAR(255),
    subject VARCHAR(255),
    content TEXT,
    status VARCHAR(50) DEFAULT 'sent', -- sent, delivered, failed, read
    external_id VARCHAR(255), -- ID from Twilio, SendGrid, etc
    metadata JSONB,
    sent_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_communications_user_id ON communications(user_id);
CREATE INDEX idx_communications_channel ON communications(channel);

-- Support Tickets
CREATE TABLE support_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium', -- low, medium, high, urgent
    status VARCHAR(50) DEFAULT 'open', -- open, in_progress, resolved, closed
    assigned_to VARCHAR(255),
    resolved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tickets_user_id ON support_tickets(user_id);
CREATE INDEX idx_tickets_status ON support_tickets(status);
CREATE INDEX idx_tickets_priority ON support_tickets(priority);

-- Audit Log
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100),
    resource_id UUID,
    changes JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_created_at ON audit_logs(created_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_packages_updated_at BEFORE UPDATE ON packages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON businesses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services_delivered
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_websites_updated_at BEFORE UPDATE ON websites
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_services_updated_at BEFORE UPDATE ON ai_services_usage
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON support_tickets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

