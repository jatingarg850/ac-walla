import { pool } from './index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initializeDatabase() {
  try {
    console.log('Starting database initialization...');
    
    // Read the schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split into individual statements
    const statements = schema
      .split(';')
      .filter(stmt => stmt.trim())
      .map(stmt => stmt + ';');
    
    // Execute each statement
    for (const statement of statements) {
      try {
        await pool.query(statement);
        console.log('Successfully executed statement:', statement.substring(0, 50) + '...');
      } catch (error) {
        console.error('Error executing statement:', statement.substring(0, 50) + '...');
        console.error('Error details:', error.message);
        // Continue with other statements even if one fails
      }
    }
    
    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
  } finally {
    await pool.end();
  }
}

// Run the initialization
initializeDatabase(); 