import pg from 'pg';
const { Pool } = pg;

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ac_wallah',
  password: '1234',
  port: 5432,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool; 