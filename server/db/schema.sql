-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address TEXT,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    token CHARACTER VARYING(255),
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create password_reset_tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    token CHARACTER VARYING(255),
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create service_requests table
CREATE TABLE IF NOT EXISTS service_requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    service_type VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    preferred_date TIMESTAMP NOT NULL,
    message TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create ac_listings table
CREATE TABLE IF NOT EXISTS ac_listings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    brand VARCHAR(100) NOT NULL,
    manufacturing_year INTEGER NOT NULL,
    ac_type VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    photos TEXT[] DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'available',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    full_name CHARACTER VARYING(255),
    phone_number CHARACTER VARYING(20),
    address TEXT,
    city CHARACTER VARYING(100),
    state CHARACTER VARYING(100),
    country CHARACTER VARYING(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create buyer_inquiries table
CREATE TABLE IF NOT EXISTS buyer_inquiries (
    id SERIAL PRIMARY KEY,
    ac_listing_id INTEGER REFERENCES ac_listings(id),
    full_name CHARACTER VARYING(255),
    email CHARACTER VARYING(255),
    phone CHARACTER VARYING(20),
    address TEXT,
    city CHARACTER VARYING(100),
    state CHARACTER VARYING(100),
    message TEXT,
    preferred_contact_time CHARACTER VARYING(50),
    status CHARACTER VARYING(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add some sample AC listings for testing
INSERT INTO ac_listings (title, brand, manufacturing_year, ac_type, price, description, photos, status)
VALUES 
    ('Samsung 1.5 Ton Split AC', 'Samsung', 2022, 'Split', 35000.00, '5 star rating, excellent condition', ARRAY['https://rukminim2.flixcart.com/image/850/1000/xif0q/air-conditioner-new/4/p/q/-original-imah79hh4fjrfxyn.jpeg?q=90&crop=false'], 'available'),
    ('LG Window AC', 'LG', 2021, 'Window', 25000.00, '3 star rating, good condition', ARRAY['https://rukminim2.flixcart.com/image/850/1000/xif0q/air-conditioner-new/4/p/q/-original-imah79hh4fjrfxyn.jpeg?q=90&crop=false'], 'available'),
    ('Voltas 2 Ton Split AC', 'Voltas', 2023, 'Split', 45000.00, 'Brand new condition', ARRAY['https://rukminim2.flixcart.com/image/850/1000/xif0q/air-conditioner-new/4/p/q/-original-imah79hh4fjrfxyn.jpeg?q=90&crop=false'], 'available')
ON CONFLICT DO NOTHING; 