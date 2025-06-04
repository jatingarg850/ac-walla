import pg from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres', // Connect to default postgres database first
  password: '1234',
  port: 5432,
});

const setup = async () => {
  try {
    // Create database if it doesn't exist
    await pool.query(`
      CREATE DATABASE ac_wallah
      WITH 
      OWNER = postgres
      TEMPLATE = template0
      ENCODING = 'UTF8'
      CONNECTION LIMIT = -1;
    `);
  } catch (error) {
    if (error.code !== '42P04') { // Ignore "database already exists" error
      console.error('Error creating database:', error);
    }
  }

  // Connect to ac_wallah database
  const acWallahPool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ac_wallah',
    password: '1234',
    port: 5432,
  });

  try {
    // Create tables
    await acWallahPool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

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

      CREATE TABLE IF NOT EXISTS ac_listings (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        brand VARCHAR(100) NOT NULL,
        manufacturing_year INTEGER NOT NULL,
        ac_type VARCHAR(50) NOT NULL,
        dimensions VARCHAR(100),
        no_of_ac INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        photos TEXT[],
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS buyer_inquiries (
        id SERIAL PRIMARY KEY,
        ac_listing_id INTEGER REFERENCES ac_listings(id) ON DELETE CASCADE,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        address TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        message TEXT,
        preferred_contact_time VARCHAR(50),
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin123!', salt);

    await acWallahPool.query(`
      INSERT INTO users (username, email, password, is_admin)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO NOTHING
      RETURNING id;
    `, ['admin', 'admin@acwallah.com', hashedPassword, true]);

    console.log('Database setup completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
};

setup(); 