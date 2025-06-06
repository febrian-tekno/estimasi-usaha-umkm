const asyncHandler = require('../middleware/asyncHandler');
const models = require('../models/index');
const UploadImageService = require('../services/uploadImageService');
const fs = require('fs');
const path = require('path');

const Packaging = models.Packaging;

const addPackagingHandler = asyncHandler(async (req, res) => {
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

  const packaging = await Packaging.create({
    name,
    amount,
    price,
    image: imageData?.imageUrl || null,
  });

  res.status(201).json({ status: 'success', message: 'Packaging added successfully', data: packaging });
});

// GET all packaging optional search query)
const getAllPackaging = asyncHandler(async (req, res, next) => {
  try {
    const searchQuery = req.query.q;

    // Filter jika ada query pencarian
    const filter = searchQuery
      ? { name: { $regex: searchQuery, $options: 'i' } } // case-insensitive search
      : {};

    const packaging = await Packaging.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ status: 'success', message: ' berhasil mendapatkan data packages', data: packaging });
  } catch (err) {
    console.error('Error fetching ingredients:', err);
    next(err);
  }
});

// DELETE ingredient by ID
const deletePackaging = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    const packaging = await Packaging.findById(id);
    if (!packaging) {
      return res.status(404).json({ message: 'packaging not found' });
    }

    // Jika ada image dan path-nya lokal, hapus file
    if (packaging.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', path.basename(packaging.image));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await packaging.deleteOne();

    res.status(200).json({ status: 'success', message: 'packaging deleted successfully' });
  } catch (err) {
    console.error('Error deleting packaging:', err);
    next(err);
  }
});

const updatePackaging = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, amount, price } = req.body;
    const file = req.file;

    const packaging = await Packaging.findById(id);
    if (!packaging) {
      return res.status(404).json({ message: 'packaging not found' });
    }

    // Validasi data wajib
    if (!name || !amount || !price) {
      return res.status(400).json({ message: 'Name, amount, and price are required' });
    }

    // Jika ada file baru, hapus gambar lama dan simpan yang baru
    if (file) {
      // Hapus gambar lama (jika ada dan berada di folder lokal)
      if (packaging.image) {
        const oldImagePath = path.join(__dirname, '..', 'uploads', path.basename(packaging.image));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Simpan gambar baru
      const newImageData = await UploadImageService.saveImage(file);
      packaging.image = newImageData?.imageUrl || packaging.image;
    }

    // Update field lain
    packaging.name = name;
    packaging.amount = amount;
    packaging.price = price;

    await packaging.save();

    res.status(200).json({
      status: 'success',
      message: 'Packaging updated successfully',
      data: packaging,
    });
  } catch (err) {
    console.error('Error updating packaging:', err);
    next(err);
  }
});

const getPackagingById = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    const packaging = await Packaging.findById(id);
    if (!packaging) {
      return res.status(404).json({ message: 'Packaging not found' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Berhasil mendapatkan data packaging',
      data: packaging,
    });
  } catch (err) {
    console.error('Error fetching packaging by ID:', err);
    next(err);
  }
});

module.exports = {
  addPackagingHandler,
  getAllPackaging,
  deletePackaging,
  updatePackaging,
  getPackagingById,
};
