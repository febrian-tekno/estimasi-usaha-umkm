const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const productsRoutes = require('./product.routes');

// endpoint user
router.use('/users', userRoutes);

// endpoint auth
router.use('/auth', authRoutes);

//endpoint products
router.use('/products', productsRoutes);
module.exports = router;
