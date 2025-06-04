import jwt from 'jsonwebtoken';
import { pool } from '../db/index.js';

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ac_walla_secret_key_2024');

    // Check if token exists in sessions table
    const session = await pool.query(
      'SELECT * FROM sessions WHERE user_id = $1 AND token = $2 AND expires_at > NOW()',
      [decoded.id, token]
    );

    if (session.rows.length === 0) {
      return res.status(401).json({ message: 'Token is invalid or expired' });
    }

    // Get user from database
    const result = await pool.query(
      'SELECT id, email, is_admin FROM users WHERE id = $1',
      [decoded.id]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Add user info to request
    req.user = result.rows[0];
    req.token = token;

    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(401).json({ message: 'Token is invalid', error: err.message });
  }
};

export default auth; 