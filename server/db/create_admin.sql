-- Create admin user
INSERT INTO users (username, email, password, is_admin)
VALUES (
    'admin',
    'admin@acwallah.com',
    'Admin123!',  -- Plain password, will be hashed by the backend
    true
)
ON CONFLICT (email) DO NOTHING;

-- Create admin profile
INSERT INTO user_profiles (
    user_id,
    full_name,
    phone_number
)
SELECT 
    id,
    'Admin User',
    '+911234567890'
FROM users
WHERE email = 'admin@acwallah.com'
AND NOT EXISTS (
    SELECT 1 FROM user_profiles WHERE user_id = users.id
); 