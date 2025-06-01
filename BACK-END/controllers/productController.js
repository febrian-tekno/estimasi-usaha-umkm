// controllers/productController.js

const asyncHandler = require('../middleware/asyncHandler');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const UploadImageService = require('../services/uploadImageService');

// Helper: kirim error response
const sendError = (res, statusCode, message) => res.status(statusCode).json({ status: 'error', message });

// Helper: validasi array item (item: ObjectId, qty: Number)
const validateItemArray = (arr, name, qtyRequired = true) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return `${name} must be a non-empty array`;
  }
  for (const entry of arr) {
    if (!entry.item || !mongoose.Types.ObjectId.isValid(entry.item)) {
      return `${name}: Each entry must have a valid 'item' ObjectId`;
    }
    if (qtyRequired && (!Number.isFinite(Number(entry.qty)) || Number(entry.qty) < 1)) {
      return `${name}: Each entry must have 'qty' as a number ≥ 1`;
    }
  }
  return null;
};

/**
 * POST /api/v1/products
 * Create a new product
 */
const createProduct = asyncHandler(async (req, res) => {
  // 1) Ambil langsung fields dari req.body (FormData)
  const {
    title,
    tags,
    steps,
    tips,
    ingredients,
    packaging,
    tools,
    estimatedSellingPrice,
    productionYield,
    dailySalesTarget,
    capital,
    profit,
    category,
  } = req.body;

  // 2) Validasi mandatory
  if (!title || typeof title !== 'string' || title.trim().length < 3) {
    return sendError(res, 400, 'Title is required and must be at least 3 characters');
  }
  if (!category || !['food', 'drink'].includes(category)) {
    return sendError(res, 400, "Field 'category' wajib bernilai 'food' atau 'drink'");
  }

  // 3) Convert angka
  const estPriceNum = Number(estimatedSellingPrice);
  const prodYieldNum = Number(productionYield);
  const dailyTargetNum = Number(dailySalesTarget);
  const capitalNum = Number(capital);
  const profitNum = Number(profit);

  if (!Number.isFinite(estPriceNum) || estPriceNum < 0) {
    return sendError(res, 400, 'Estimated selling price must be a number ≥ 0');
  }
  if (!Number.isFinite(prodYieldNum) || prodYieldNum < 1) {
    return sendError(res, 400, 'Production yield must be a number ≥ 1');
  }
  if (!Number.isFinite(dailyTargetNum) || dailyTargetNum < 1) {
    return sendError(res, 400, 'Daily sales target must be a number ≥ 1');
  }
  if (!Number.isFinite(capitalNum) || capitalNum < 0) {
    return sendError(res, 400, 'Capital must be a number ≥ 0');
  }
  if (!Number.isFinite(profitNum) || profitNum < 0) {
    return sendError(res, 400, 'Profit must be a number ≥ 0');
  }

  // 4) Parse JSON (array) langsung
  let parsedTags = [];
  let parsedSteps = [];
  let parsedTips = [];
  let parsedIngredients = [];
  let parsedPackaging = [];
  let parsedTools = [];

  try {
    parsedTags = tags ? JSON.parse(tags) : [];
    if (!Array.isArray(parsedTags)) throw new Error();
    for (const t of parsedTags) if (typeof t !== 'string') throw new Error();
  } catch {
    return sendError(res, 400, 'Tags must be a JSON array of strings');
  }

  try {
    parsedSteps = steps ? JSON.parse(steps) : [];
    if (!Array.isArray(parsedSteps)) throw new Error();
    for (const s of parsedSteps) if (typeof s !== 'string') throw new Error();
  } catch {
    return sendError(res, 400, 'Steps must be a JSON array of strings');
  }

  try {
    parsedTips = tips ? JSON.parse(tips) : [];
    if (!Array.isArray(parsedTips)) throw new Error();
    for (const t of parsedTips) if (typeof t !== 'string') throw new Error();
  } catch {
    return sendError(res, 400, 'Tips must be a JSON array of strings');
  }

  try {
    parsedIngredients = ingredients ? JSON.parse(ingredients) : [];
    if (!Array.isArray(parsedIngredients)) throw new Error();
  } catch {
    return sendError(res, 400, 'Ingredients must be a JSON array');
  }

  try {
    parsedPackaging = packaging ? JSON.parse(packaging) : [];
    if (!Array.isArray(parsedPackaging)) throw new Error();
  } catch {
    return sendError(res, 400, 'Packaging must be a JSON array');
  }

  try {
    parsedTools = tools ? JSON.parse(tools) : [];
    if (!Array.isArray(parsedTools)) throw new Error();
  } catch {
    return sendError(res, 400, 'Tools must be a JSON array');
  }

  // 5) Validasi isi tiap array item
  let err = validateItemArray(parsedIngredients, 'Ingredients');
  if (err) return sendError(res, 400, err);

  err = validateItemArray(parsedPackaging, 'Packaging');
  if (err) return sendError(res, 400, err);

  if (Array.isArray(parsedTools) && parsedTools.length > 0) {
    err = validateItemArray(parsedTools, 'Tools', false);
    if (err) return sendError(res, 400, err);
  }

  // 6) Upload image kalau ada
  let imageUrl = null;
  if (req.file) {
    try {
      const imageData = await UploadImageService.saveImage(req.file);
      imageUrl = imageData.imageUrl;
    } catch {
      return sendError(res, 400, 'Image upload failed');
    }
  }

  const product = new Product({
    title: title.trim(),
    image: imageUrl,
    tags: parsedTags,
    steps: parsedSteps,
    tips: parsedTips,
    category: category,
    createdBy: new mongoose.Types.ObjectId(req.user._id),
    ingredients: parsedIngredients.map((it) => ({
      item: new mongoose.Types.ObjectId(it.item),
      qty: Number(it.qty),
    })),
    packaging: parsedPackaging.map((it) => ({
      item: new mongoose.Types.ObjectId(it.item),
      qty: Number(it.qty),
    })),
    tools: parsedTools.map((it) => ({
      item: new mongoose.Types.ObjectId(it.item),
      qty: it.qty != null ? Number(it.qty) : null,
    })),
    estimatedSellingPrice: estPriceNum,
    productionYield: prodYieldNum,
    dailySalesTarget: dailyTargetNum,
    capital: capitalNum,
    profit: profitNum,
    isVerified: false,
  });

  const saved = await product.save();
  res.status(201).json({
    status: 'success',
    message: 'Product created successfully',
    data: saved,
  });
});

/**
 * GET /api/v1/products
 * Get all products (search, filter, sort, pagination)
 * Response hanya berisi fields: views, title, image, stars, profit, isVerified
 *
 * Query Params:
 * - q            : string (search by title, case-insensitive)
 * - sort         : 'popularity' | 'profit' | 'capital' (default sort by createdAt desc)
 * - order        : 'asc' | 'desc' (default 'asc')
 * - page         : number (default 1)
 * - limit        : number (default 12)
 * - category     : string (filter by category, harus 'food' | 'drink' | 'lainnya')
 * - maxCapital   : number (filter capital <= maxCapital)
 * - createdBy    : ObjectId (filter by user ID pembuat)
 */
const getAllProducts = asyncHandler(async (req, res) => {
  const { q, sort, order = 'asc', page = 1, limit = 12, category, maxCapital, createdBy } = req.query;

  // Build filter object
  const filter = {};
  if (q) {
    filter.title = { $regex: q, $options: 'i' };
  }
  if (category) {
    filter.category = category;
  }
  if (maxCapital !== undefined && maxCapital !== '') {
    const mc = Number(maxCapital);
    if (!isNaN(mc)) {
      filter.capital = { $lte: mc };
    }
  }
  if (createdBy) {
    filter.createdBy = createdBy;
  }

  // Build sort object
  const direction = order === 'desc' ? -1 : 1;
  let sortObj;
  if (sort) {
    if (sort === 'popularity') {
      sortObj = { views: direction };
    } else if (sort === 'profit' || sort === 'capital') {
      sortObj = { [sort]: direction };
    } else {
      sortObj = { createdAt: -1 };
    }
  } else {
    sortObj = { createdAt: -1 };
  }

  // Pagination logic
  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const perPage = Math.max(parseInt(limit, 10) || 12, 1);
  const skip = (pageNum - 1) * perPage;

  // Hitung total dokumen untuk pagination info
  const totalDocs = await Product.countDocuments(filter);
  const totalPages = Math.ceil(totalDocs / perPage);

  // Query dengan filter, select field yang ditentukan, sort, skip & limit
  const products = await Product.find(filter)
    .select('views title image stars profit isVerified')
    .sort(sortObj)
    .skip(skip)
    .limit(perPage);

  res.status(200).json({
    status: 'success',
    message: 'Products retrieved successfully',
    data: {
      totalDocs,
      totalPages,
      page: pageNum,
      perPage,
      products,
    },
  });
});

/**
 * GET /api/v1/products/:id
 * Get product details by ID (dengan populate)
 * Response berisi semua field, termasuk objek referensi
 */
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendError(res, 400, 'Invalid product ID');
  }

  const product = await Product.findById(id)
    .populate('ingredients.item', 'name price image amount')
    .populate('packaging.item', 'name price image amount')
    .populate('createdBy', 'username')
    .populate('tools.item', 'name price image amount');

  if (!product) {
    return sendError(res, 404, 'Product not found');
  }
  product.views += 1;
  product.save();
  res.json({
    status: 'success',
    message: 'Product details retrieved successfully',
    data: product,
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};
