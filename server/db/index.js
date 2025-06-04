import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
});

// Log connection status
pool.on('connect', () => {
  console.log('Connected to the database');
  console.log('Environment:', process.env.NODE_ENV);
  console.log('SSL enabled:', process.env.NODE_ENV === 'production');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export { pool };
export default pool; 