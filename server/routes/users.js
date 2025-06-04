import express from 'express';
import { pool } from '../db/index.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Ensure user can only access their own profile
    if (req.user.id !== parseInt(id)) {
      return res.status(403).json({ message: 'Not authorized to access this profile' });
    }

    const result = await pool.query(
      `SELECT u.id, u.username, u.email, up.address, up.phone_number, up.city, up.state, up.country
       FROM users u
       LEFT JOIN user_profiles up ON u.id = up.user_id
       WHERE u.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, address, phone_number, city, state, country } = req.body;

    // Ensure user can only update their own profile
    if (req.user.id !== parseInt(id)) {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }

    // Start a transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Update users table
      const userResult = await client.query(
        `UPDATE users 
         SET username = $1, email = $2
         WHERE id = $3 
         RETURNING id, username, email`,
        [username, email, id]
      );

      // Update or insert user_profile
      const profileResult = await client.query(
        `INSERT INTO user_profiles (user_id, address, phone_number, city, state, country)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (user_id) 
         DO UPDATE SET 
           address = $2,
           phone_number = $3,
           city = $4,
           state = $5,
           country = $6,
           updated_at = CURRENT_TIMESTAMP
         RETURNING *`,
        [id, address, phone_number, city, state, country]
      );

      await client.query('COMMIT');

      // Combine the results
      const response = {
        ...userResult.rows[0],
        ...profileResult.rows[0]
      };

      res.json(response);
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 