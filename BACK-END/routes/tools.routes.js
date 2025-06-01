const express = require('express');
const upload = require('../middleware/upload');
const { protectedMiddleware, isAdmin } = require('../middleware/authMiddleware');
const { getAllTools, addToolHandler, deleteTool, updateTool, getToolById } = require('../controllers/toolsController');

const router = express.Router();

router.get('/', getAllTools);

router.post('/', protectedMiddleware, isAdmin, upload.single('image'), addToolHandler);

router.put('/', protectedMiddleware, isAdmin, upload.single('image'), updateTool);

router.get('/:id', getToolById);

router.delete('/:id', protectedMiddleware, isAdmin, deleteTool);

module.exports = router;
