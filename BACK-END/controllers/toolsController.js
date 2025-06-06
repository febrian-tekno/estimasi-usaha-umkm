const asyncHandler = require('../middleware/asyncHandler');
const models = require('../models/index');
const UploadImageService = require('../services/uploadImageService');
const fs = require('fs');
const path = require('path');

const Tool = models.Tool;

const addToolHandler = asyncHandler(async (req, res) => {
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

  const tool = await Tool.create({
    name,
    amount,
    price,
    image: imageData?.imageUrl || null,
  });

  res.status(201).json({ status: 'success', message: 'Tool added successfully', data: tool });
});

// GET all packaging optional search query)
const getAllTools = asyncHandler(async (req, res, next) => {
  try {
    const searchQuery = req.query.q;

    // Filter jika ada query pencarian
    const filter = searchQuery
      ? { name: { $regex: searchQuery, $options: 'i' } } // case-insensitive search
      : {};

    const Tools = await Tool.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ status: 'success', message: ' berhasil mendapatkan data packages', data: Tools });
  } catch (err) {
    console.error('Error fetching ingredients:', err);
    next(err);
  }
});

// DELETE ingredient by ID
const deleteTool = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    const tool = await Tool.findById(id);
    if (!tool) {
      return res.status(404).json({ message: 'Tools not found' });
    }

    // Jika ada image dan path-nya lokal, hapus file
    if (tool.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', path.basename(tool.image));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await tool.deleteOne();

    res.status(200).json({ status: 'success', message: 'packaging deleted successfully' });
  } catch (err) {
    console.error('Error deleting packaging:', err);
    next(err);
  }
});

const updateTool = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, amount, price } = req.body;
    const file = req.file;

    const tool = await Tool.findById(id);
    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }

    if (!name || !amount || !price) {
      return res.status(400).json({ message: 'Name, amount, and price are required' });
    }

    // Jika ada file baru, hapus gambar lama lalu simpan gambar baru
    if (file) {
      if (tool.image) {
        const oldImagePath = path.join(__dirname, '..', 'uploads', path.basename(tool.image));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      const newImageData = await UploadImageService.saveImage(file);
      tool.image = newImageData?.imageUrl || tool.image;
    }

    // Update data lainnya
    tool.name = name;
    tool.amount = amount;
    tool.price = price;

    await tool.save();

    res.status(200).json({
      status: 'success',
      message: 'Tool updated successfully',
      data: tool,
    });
  } catch (err) {
    console.error('Error updating tool:', err);
    next(err);
  }
});

const getToolById = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    const tool = await Tool.findById(id);
    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Berhasil mendapatkan data tool',
      data: tool,
    });
  } catch (err) {
    console.error('Error fetching tool by ID:', err);
    next(err);
  }
});

module.exports = {
  addToolHandler,
  deleteTool,
  getAllTools,
  updateTool,
  getToolById,
};
