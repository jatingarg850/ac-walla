import { pool } from './index.js';

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to the database!');
    
    // Test a simple query
    const result = await client.query('SELECT NOW()');
    console.log('Current database time:', result.rows[0].now);
    
    // Release the client
    client.release();
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
    console.error('Stack trace:', err.stack);
  } finally {
    // Close the pool
    await pool.end();
  }
}

testConnection(); 