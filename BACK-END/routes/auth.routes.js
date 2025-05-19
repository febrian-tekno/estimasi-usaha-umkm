const express = require('express');
const {
  verifyEmailRegist,
  createSession,
  deleteSession,
  InitiatesGoogleFlow,
  googleCallbackHandler,
  resetPasswordRequest,
  confirmResetAndUpdatePassword,
} = require('../controllers/authController');
const { protectedMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// verifikasi email
router.get('/verify-email', verifyEmailRegist);

// user login
router.post('/sessions', createSession);

// user logout
router.delete('/sessions', protectedMiddleware, deleteSession);

// Initiates the Google Login flow
router.get('/google', InitiatesGoogleFlow);

// handler redirect dari google callback
router.get('/google/callback', googleCallbackHandler);

// request link reset password
router.post('/reset-password', resetPasswordRequest);

// reset password dengan password baru
router.post('/reset-password/confirm', confirmResetAndUpdatePassword);

module.exports = router;
