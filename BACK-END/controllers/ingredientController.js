const asyncHandler = require('../middleware/asyncHandler');
const models = require('../models/index');
const UploadImageService = require('../services/uploadImageService');
const fs = require('fs');
const path = require('path');

const Ingredient = models.Ingredient;

const addIngredientHandler = asyncHandler(async (req, res) => {
  const { name, amount, price } = req.body;
  if (!req.file) return res.status(400).json({ status: 'failed', message: 'foto harus ada' });

  const file = req.file;
  if (!name || !amount || !price) {
    return res.status(400).json({ message: 'Name, amount, unit, and price are required' });
  }

  let imageData = null;

  if (file) {
    imageData = await UploadImageService.saveImage(file);
  }

  const ingredient = await Ingredient.create({
    name,
    amount,
    price,
    image: imageData?.imageUrl || null,
  });

  res.status(201).json({ status: 'success', message: 'Ingredient added successfully', data: ingredient });
});

// GET all ingredients (with optional search query)
const getAllIngredients = asyncHandler(async (req, res, next) => {
  try {
    const searchQuery = req.query.q;

    // Filter jika ada query pencarian
    const filter = searchQuery
      ? { name: { $regex: searchQuery, $options: 'i' } } // case-insensitive search
      : {};

    const ingredients = await Ingredient.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ status: 'success', message: ' berhasil mendapatkan data ingredients', data: ingredients });
  } catch (err) {
    console.error('Error fetching ingredients:', err);
    next(err);
  }
});

// DELETE ingredient by ID
const deleteIngredient = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    const ingredient = await Ingredient.findById(id);
    if (!ingredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    // Jika ada image dan path-nya lokal, hapus file
    if (ingredient.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', path.basename(ingredient.image));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await ingredient.deleteOne();

    res.status(200).json({ status: 'success', message: 'Ingredient deleted successfully' });
  } catch (err) {
    console.error('Error deleting ingredient:', err);
    next(err);
  }
});

const updateIngredient = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, amount, price } = req.body;
    const file = req.file;

    const ingredient = await Ingredient.findById(id);
    if (!ingredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    if (!name || !amount || !price) {
      return res.status(400).json({ message: 'Name, amount, and price are required' });
    }

    // Jika ada file baru, hapus gambar lama lalu simpan gambar baru
    if (file) {
      if (ingredient.image) {
        const oldImagePath = path.join(__dirname, '..', 'uploads', path.basename(ingredient.image));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      const newImageData = await UploadImageService.saveImage(file);
      ingredient.image = newImageData?.imageUrl || ingredient.image;
    }

    // Update data lainnya
    ingredient.name = name;
    ingredient.amount = amount;
    ingredient.price = price;

    await ingredient.save();

    res.status(200).json({
      status: 'success',
      message: 'Ingredient updated successfully',
      data: ingredient,
    });
  } catch (err) {
    console.error('Error updating ingredient:', err);
    next(err);
  }
});

const getIngredientById = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    const ingredient = await Ingredient.findById(id);
    if (!ingredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Berhasil mendapatkan data ingredient',
      data: ingredient,
    });
  } catch (err) {
    console.error('Error fetching ingredient by ID:', err);
    next(err);
  }
});

module.exports = {
  addIngredientHandler,
  getAllIngredients,
  deleteIngredient,
  updateIngredient,
  getIngredientById,
};
