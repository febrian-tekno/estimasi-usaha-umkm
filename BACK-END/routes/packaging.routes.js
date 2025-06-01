const express = require('express');
const upload = require('../middleware/upload');
const { protectedMiddleware, isAdmin } = require('../middleware/authMiddleware');
const {
  getAllPackaging,
  addPackagingHandler,
  deletePackaging,
  updatePackaging,
  getPackagingById,
} = require('../controllers/packagingController');

const router = express.Router();

router.get('/', getAllPackaging);

router.post('/', protectedMiddleware, isAdmin, upload.single('image'), addPackagingHandler);

router.put('/:id', protectedMiddleware, isAdmin, upload.single('image'), updatePackaging);

router.get('/:id', getPackagingById);

router.delete('/:id', protectedMiddleware, isAdmin, deletePackaging);

module.exports = router;
