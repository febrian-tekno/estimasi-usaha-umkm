 
const express = require('express');
const { getResepHandler } = require('../controllers/resepController');
const router = express.Router();

router.get('/resep1', getResepHandler);

module.exports = router;
