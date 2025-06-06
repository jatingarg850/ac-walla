import pg from 'pg';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pg;

// Database configuration
const databaseConfig = {
  connectionString: 'postgresql://neondb_owner:npg_Ybrl6uhX2LVc@ep-muddy-sun-a841goek-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',
  ssl: {
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

const pool = new Pool(databaseConfig);

// Log connection status
pool.on('connect', () => {
  console.log('Connected to the database');
  console.log('Environment: production');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Test the connection
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Database connection test successful');
    client.release();
  } catch (err) {
    console.error('Error testing database connection:', err);
    process.exit(1);
  }
};

testConnection();

export { pool };
export default pool; 