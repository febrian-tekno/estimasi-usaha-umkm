const express = require('express');
const upload = require('../middleware/upload');
const {
  addIngredientHandler,
  getAllIngredients,
  deleteIngredient,
  updateIngredient,
  getIngredientById,
} = require('../controllers/ingredientController');
const { protectedMiddleware, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllIngredients);

router.post('/', protectedMiddleware, isAdmin, upload.single('image'), addIngredientHandler);

router.put('/', protectedMiddleware, isAdmin, upload.single('image'), updateIngredient);

router.get('/:id', getIngredientById);

router.delete('/:id', protectedMiddleware, isAdmin, deleteIngredient);

module.exports = router;
