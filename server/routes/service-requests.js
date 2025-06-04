import express from 'express';
import { pool } from '../db/index.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Create service request
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      service_type,
      address,
      preferred_date,
      message
    } = req.body;

    const result = await pool.query(
      `INSERT INTO service_requests 
       (name, email, phone, service_type, address, preferred_date, message) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [name, email, phone, service_type, address, preferred_date, message]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating service request:', err);
    res.status(500).json({
      message: 'Failed to create service request',
      error: err.message
    });
  }
});

// Get all service requests (admin only)
router.get('/', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.is_admin) {
      return res.status(403).json({ message: 'Not authorized to view all service requests' });
    }

    const result = await pool.query(
      'SELECT * FROM service_requests ORDER BY created_at DESC'
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching service requests:', err);
    res.status(500).json({
      message: 'Failed to fetch service requests',
      error: err.message
    });
  }
});

// Get service requests by email
router.get('/user/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const result = await pool.query(
      'SELECT * FROM service_requests WHERE email = $1 ORDER BY created_at DESC',
      [email]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching user service requests:', err);
    res.status(500).json({
      message: 'Failed to fetch user service requests',
      error: err.message
    });
  }
});

// Get single service request
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM service_requests WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Service request not found' });
    }

    // Only allow admin or the user who created the request to view it
    if (!req.user.is_admin && result.rows[0].email !== req.user.email) {
      return res.status(403).json({ message: 'Not authorized to view this service request' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching service request:', err);
    res.status(500).json({
      message: 'Failed to fetch service request',
      error: err.message
    });
  }
});

// Update service request status (admin only)
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Check if user is admin
    if (!req.user.is_admin) {
      return res.status(403).json({ message: 'Not authorized to update service request status' });
    }

    const result = await pool.query(
      'UPDATE service_requests SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Service request not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating service request status:', err);
    res.status(500).json({
      message: 'Failed to update service request status',
      error: err.message
    });
  }
});

// Delete service request (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user is admin
    if (!req.user.is_admin) {
      return res.status(403).json({ message: 'Not authorized to delete service requests' });
    }

    const result = await pool.query(
      'DELETE FROM service_requests WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Service request not found' });
    }

    res.json({ message: 'Service request deleted successfully' });
  } catch (err) {
    console.error('Error deleting service request:', err);
    res.status(500).json({
      message: 'Failed to delete service request',
      error: err.message
    });
  }
});

export default router; 