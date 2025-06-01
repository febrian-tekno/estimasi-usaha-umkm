const express = require('express');
const {
  registerUser,
  currentUser,
  getAllUserHandler,
  deleteUserById,
  getUserById,
  updatePasswordHandler,
  updateUserProfile,
  addStarredProduct,
  removeStarredProduct,
  checkIfProductIsStarred,
} = require('../controllers/userController');
const { protectedMiddleware, isAdmin, protectedUser } = require('../middleware/authMiddleware');
const router = express.Router();

/// Register a new user (public access, no authentication needed)
router.post('/', registerUser);

// Admin: get all users (protected route, admin role required)
router.get('/', protectedMiddleware, isAdmin, getAllUserHandler);

// Get current logged-in user's info (protected route, any authenticated user)
router.get('/me', protectedMiddleware, currentUser);

// Update password for a user (protected route, accessible by the user themself or admin)
router.put('/:id/password', protectedMiddleware, protectedUser, updatePasswordHandler);

// Get user by ID (protected route, accessible by the user themself or admin)
router.get('/:id', protectedMiddleware, protectedUser, getUserById);

// Update user profile (protected route, accessible by the user themself or admin)
router.put('/:id', protectedMiddleware, protectedUser, updateUserProfile);

// Delete user by ID (protected route, accessible by the user themself or admin)
router.delete('/:id', protectedMiddleware, protectedUser, deleteUserById);

// stared products
router.post('/:id/starred', protectedMiddleware, protectedUser, addStarredProduct);

//unstared product
router.delete('/:id/starred/:productId', protectedMiddleware, protectedUser, removeStarredProduct);

// check product is already stred or not
router.get('/:id/starred/:productId', protectedMiddleware, protectedUser, checkIfProductIsStarred);

module.exports = router;
