const express = require('express');
const { protectedMiddleware } = require('../middleware/authMiddleware');
const { createProduct, getAllProducts, getProductById } = require('../controllers/productController');
const upload = require('../middleware/upload');
const router = express.Router();

// Admin: get all users (protected route, admin role required)

router.get('/', getAllProducts);

router.post('/', protectedMiddleware, upload.single('image'), createProduct);

router.get('/:id', getProductById);

module.exports = router;
