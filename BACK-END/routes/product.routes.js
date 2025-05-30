const express = require('express');

const { getDummyProducts } = require('../controllers/productController');
const router = express.Router();

// Admin: get all users (protected route, admin role required)
router.get('/', getDummyProducts);

module.exports = router;
