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
    name CHARACTER VARYING(100),
    email CHARACTER VARYING(100),
    phone CHARACTER VARYING(20),
    service_type CHARACTER VARYING(100),
    address TEXT,
    preferred_date DATE,
    message TEXT,
    status CHARACTER VARYING(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create ac_listings table
CREATE TABLE IF NOT EXISTS ac_listings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title CHARACTER VARYING(255) NOT NULL,
    description TEXT,
    brand CHARACTER VARYING(100) NOT NULL,
    manufacturing_year INTEGER NOT NULL,
    ac_type CHARACTER VARYING(50) NOT NULL,
    dimensions CHARACTER VARYING(100),
    no_of_ac INTEGER NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    photos TEXT[],
    status CHARACTER VARYING(20) DEFAULT 'active',
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