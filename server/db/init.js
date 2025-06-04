import pool from '../config/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createTables = async () => {
  try {
    // Read the schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Split the schema into individual statements
    const statements = schema.split(';').filter(stmt => stmt.trim());

    // Execute each statement
    for (let statement of statements) {
      if (statement.trim()) {
        await pool.query(statement);
        console.log('Executed statement successfully');
      }
    }

    console.log('All tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  } finally {
    // Close the pool
    await pool.end();
  }
};

// Run the initialization
createTables().catch(console.error); 