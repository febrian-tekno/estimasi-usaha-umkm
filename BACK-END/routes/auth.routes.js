const express = require('express');
const {
  verifyEmailRegist,
  createSession,
  deleteSession,
} = require('../controllers/authController');
const { protectedMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// verifikasi email
router.get('/verify-email', verifyEmailRegist);

// user login
router.post('/sessions', createSession);

// user logout
router.delete('/sessions', protectedMiddleware, deleteSession);

module.exports = router;
