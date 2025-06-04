import pg from 'pg';

const connectionString = "postgresql://neondb_owner:npg_Ybrl6uhX2LVc@ep-muddy-sun-a841goek-pooler.eastus2.azure.neon.tech/neondb?sslmode=require";

const client = new pg.Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function testConnection() {
  try {
    await client.connect();
    console.log('Connected to database successfully!');
    
    const result = await client.query('SELECT NOW()');
    console.log('Database time:', result.rows[0].now);
  } catch (err) {
    console.error('Error connecting to database:', err.message);
    console.error('Stack:', err.stack);
  } finally {
    await client.end();
  }
}

testConnection(); 