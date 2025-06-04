-- Connect to the database
\c ac_wallah;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create user_profiles table for additional user information
CREATE TABLE IF NOT EXISTS user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(255),
    phone_number VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create password_reset_tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better query performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
CREATE INDEX idx_password_reset_tokens_token ON password_reset_tokens(token);

-- Sample queries for managing users

-- Insert a new user
-- INSERT INTO users (username, email, password) 
-- VALUES ('john_doe', 'john@example.com', 'hashed_password');

-- Get user by email
-- SELECT * FROM users WHERE email = 'john@example.com';

-- Update user password
-- UPDATE users 
-- SET password = 'new_hashed_password' 
-- WHERE email = 'john@example.com';

-- Delete user and all related data (cascading)
-- DELETE FROM users WHERE id = 1;

-- Create user profile
-- INSERT INTO user_profiles (user_id, full_name, phone_number, address, city, state, country)
-- VALUES (1, 'John Doe', '+1234567890', '123 Main St', 'New York', 'NY', 'USA');

-- Get user with profile
-- SELECT u.*, up.*
-- FROM users u
-- LEFT JOIN user_profiles up ON u.id = up.user_id
-- WHERE u.id = 1;

-- Create session
-- INSERT INTO sessions (user_id, token, expires_at)
-- VALUES (1, 'session_token', CURRENT_TIMESTAMP + INTERVAL '1 hour');

-- Get valid session
-- SELECT * FROM sessions 
-- WHERE token = 'session_token' 
-- AND expires_at > CURRENT_TIMESTAMP;

-- Delete expired sessions
-- DELETE FROM sessions WHERE expires_at <= CURRENT_TIMESTAMP;

-- Create password reset token
-- INSERT INTO password_reset_tokens (user_id, token, expires_at)
-- VALUES (1, 'reset_token', CURRENT_TIMESTAMP + INTERVAL '1 hour');

-- Get valid reset token
-- SELECT * FROM password_reset_tokens
-- WHERE token = 'reset_token'
-- AND expires_at > CURRENT_TIMESTAMP; 