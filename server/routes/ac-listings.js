import express from 'express';
import { pool } from '../db/index.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all AC listings
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT l.*, u.username as seller_name, u.email as seller_email FROM ac_listings l LEFT JOIN users u ON l.user_id = u.id WHERE l.status = $1 ORDER BY l.created_at DESC',
      ['available']
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching AC listings:', err);
    res.status(500).json({ 
      message: 'Failed to fetch AC listings',
      error: err.message 
    });
  }
});

// Get single AC listing
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT l.*, u.username as seller_name, u.email as seller_email FROM ac_listings l LEFT JOIN users u ON l.user_id = u.id WHERE l.id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching AC listing:', err);
    res.status(500).json({ 
      message: 'Failed to fetch AC listing',
      error: err.message 
    });
  }
});

// Create AC listing
router.post('/', auth, async (req, res) => {
  try {
    const { 
      title, 
      description, 
      brand, 
      manufacturing_year, 
      ac_type, 
      price,
      photos = []
    } = req.body;

    const result = await pool.query(
      `INSERT INTO ac_listings 
       (user_id, title, description, brand, manufacturing_year, ac_type, price, photos) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [req.user.id, title, description, brand, manufacturing_year, ac_type, price, photos]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating AC listing:', err);
    res.status(500).json({ 
      message: 'Failed to create AC listing',
      error: err.message 
    });
  }
});

// Update AC listing
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      description, 
      brand, 
      manufacturing_year, 
      ac_type, 
      price,
      photos,
      status 
    } = req.body;

    // Check if listing exists and belongs to user
    const listing = await pool.query(
      'SELECT * FROM ac_listings WHERE id = $1',
      [id]
    );

    if (listing.rows.length === 0) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.rows[0].user_id !== req.user.id && !req.user.is_admin) {
      return res.status(403).json({ message: 'Not authorized to update this listing' });
    }

    const result = await pool.query(
      `UPDATE ac_listings 
       SET title = $1, description = $2, brand = $3, manufacturing_year = $4, 
           ac_type = $5, price = $6, photos = $7, status = $8, updated_at = NOW()
       WHERE id = $9 
       RETURNING *`,
      [title, description, brand, manufacturing_year, ac_type, price, photos, status, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating AC listing:', err);
    res.status(500).json({ 
      message: 'Failed to update AC listing',
      error: err.message 
    });
  }
});

// Delete AC listing
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if listing exists and belongs to user
    const listing = await pool.query(
      'SELECT * FROM ac_listings WHERE id = $1',
      [id]
    );

    if (listing.rows.length === 0) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.rows[0].user_id !== req.user.id && !req.user.is_admin) {
      return res.status(403).json({ message: 'Not authorized to delete this listing' });
    }

    await pool.query(
      'DELETE FROM ac_listings WHERE id = $1',
      [id]
    );

    res.json({ message: 'Listing deleted successfully' });
  } catch (err) {
    console.error('Error deleting AC listing:', err);
    res.status(500).json({ 
      message: 'Failed to delete AC listing',
      error: err.message 
    });
  }
});

// Get user's AC listings
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;

    // Ensure user can only access their own listings unless admin
    if (req.user.id !== parseInt(userId) && !req.user.is_admin) {
      return res.status(403).json({ message: 'Not authorized to access these listings' });
    }

    const result = await pool.query(
      'SELECT * FROM ac_listings WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching user AC listings:', err);
    res.status(500).json({ 
      message: 'Failed to fetch user AC listings',
      error: err.message 
    });
  }
});

export default router; 