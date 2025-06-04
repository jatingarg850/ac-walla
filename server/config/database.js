import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: 'ep-muddy-sun-a841goek-pooler.eastus2.azure.neon.tech',
  database: 'neondb',
  user: 'neondb_owner',
  password: 'npg_Ybrl6uhX2LVc',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test the connection
pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Successfully connected to database');
  }
});

export default pool; 