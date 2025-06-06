const asyncHandler = require('../middleware/asyncHandler');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const UploadImageService = require('../services/uploadImageService');

/**
 * Helper: kirim error response
 */
const sendError = (res, statusCode, message) => res.status(statusCode).json({ status: 'error', message });

/**
 * Helper: validasi array item (item: ObjectId atau objek dengan _id, qty: Number)
 */
const validateItemArray = (arr, fieldName) => {
  for (let i = 0; i < arr.length; i++) {
    const it = arr[i];

    // 1) Pastikan ada properti 'item' dan 'qty'
    if (it.item == null || it.qty == null) {
      return `${fieldName}: setiap elemen harus ada properti 'item' dan 'qty'`;
    }

    // 2) Validasi qty
    if (isNaN(Number(it.qty)) || Number(it.qty) < 1) {
      return `${fieldName}: 'qty' harus berupa angka ≥ 1 pada elemen ke-${i}`;
    }

    // 3) Validasi 'item' boleh string atau objek {_id: ...}
    let rawId;
    if (typeof it.item === 'string') {
      rawId = it.item;
    } else if (typeof it.item === 'object' && it.item !== null && typeof it.item._id === 'string') {
      rawId = it.item._id;
    } else {
      return `${fieldName}: 'item' pada elemen ke-${i} harus string ID atau objek yang punya properti _id`;
    }

    // 4) Validasi rawId sebagai valid ObjectId MongoDB
    if (!mongoose.Types.ObjectId.isValid(rawId)) {
      return `${fieldName}: setiap 'item' harus menjadi ObjectId yang valid (periksa elemen ke-${i})`;
    }
  }
  return null;
};

/**
 * Helper: parse JSON array dari form-data string
 */
function parseJsonArray(fieldValue, fieldName, enforceStringItems = false) {
  let arr = [];
  if (!fieldValue) return [];
  try {
    arr = JSON.parse(fieldValue);
    if (!Array.isArray(arr)) throw new Error();
    if (enforceStringItems) {
      for (const el of arr) {
        if (typeof el !== 'string') throw new Error();
      }
    }
    return arr;
  } catch {
    const tipe = enforceStringItems ? 'string' : 'object';
    throw new Error(`${fieldName} harus berupa JSON array of ${tipe}${enforceStringItems ? 's' : ''}`);
  }
}

/**
 * POST /api/v1/products
 * Create a new product
 */
const createProduct = asyncHandler(async (req, res) => {
  // 1) Ambil fields dari req.body
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
    category,
  } = req.body;

  // 2) Validasi mandatory: title & category
  if (!title || typeof title !== 'string' || title.trim().length < 3) {
    return sendError(res, 400, 'Title wajib diisi dan minimal 3 karakter');
  }
  const cat = typeof category === 'string' ? category.trim().toLowerCase() : '';
  if (!['food', 'drink'].includes(cat)) {
    return sendError(res, 400, "Field 'category' wajib bernilai 'food' atau 'drink'");
  }

  // 3) Konversi angka
  const estPriceNum = Number(estimatedSellingPrice);
  const prodYieldNum = Number(productionYield);
  const dailyTargetNum = Number(dailySalesTarget);
  const capitalNum = Number(capital);

  if (!Number.isFinite(estPriceNum) || estPriceNum < 0) {
    return sendError(res, 400, 'Estimated selling price harus angka ≥ 0');
  }
  if (!Number.isFinite(prodYieldNum) || prodYieldNum < 1) {
    return sendError(res, 400, 'Production yield harus angka ≥ 1');
  }
  if (!Number.isFinite(dailyTargetNum) || dailyTargetNum < 1) {
    return sendError(res, 400, 'Daily sales target harus angka ≥ 1');
  }
  if (!Number.isFinite(capitalNum) || capitalNum < 0) {
    return sendError(res, 400, 'Capital harus angka ≥ 0');
  }

  // 4) Parse JSON array: tags, steps, tips, ingredients, packaging, tools
  let parsedTags, parsedSteps, parsedTips, parsedIngredients, parsedPackaging, parsedTools;
  try {
    parsedTags = parseJsonArray(tags, 'Tags', true);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
  try {
    parsedSteps = parseJsonArray(steps, 'Steps', true);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
  try {
    parsedTips = parseJsonArray(tips, 'Tips', false);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
  try {
    parsedIngredients = parseJsonArray(ingredients, 'Ingredients');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
  try {
    parsedPackaging = parseJsonArray(packaging, 'Packaging');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
  try {
    parsedTools = parseJsonArray(tools, 'Tools');
  } catch (err) {
    return sendError(res, 400, err.message);
  }

  // 5) Validasi isi tiap array item untuk Ingredients, Packaging, Tools
  let errMsg = validateItemArray(parsedIngredients, 'Ingredients');
  if (errMsg) return sendError(res, 400, errMsg);
  errMsg = validateItemArray(parsedPackaging, 'Packaging');
  if (errMsg) return sendError(res, 400, errMsg);
  if (parsedTools.length > 0) {
    errMsg = validateItemArray(parsedTools, 'Tools');
    if (errMsg) return sendError(res, 400, errMsg);
  }

  // 6) Upload image jika ada (req.file dari multer)
  let imageUrl = null;
  if (req.file) {
    try {
      const imageData = await UploadImageService.saveImage(req.file);
      imageUrl = imageData.imageUrl;
    } catch {
      return sendError(res, 400, 'Gagal mengunggah gambar');
    }
  } else {
    return sendError(res, 400, 'Gambar produk wajib diunggah');
  }

  // 7) Mapping ke ObjectId sebelum buat instance Product
  const mappedIngredients = parsedIngredients.map((it) => {
    const rawId = typeof it.item === 'string' ? it.item : it.item._id;
    return {
      item: new mongoose.Types.ObjectId(rawId),
      qty: Number(it.qty),
    };
  });
  const mappedPackaging = parsedPackaging.map((it) => {
    const rawId = typeof it.item === 'string' ? it.item : it.item._id;
    return {
      item: new mongoose.Types.ObjectId(rawId),
      qty: Number(it.qty),
    };
  });
  const mappedTools = parsedTools.map((it) => {
    const rawId = typeof it.item === 'string' ? it.item : it.item._id;
    return {
      item: new mongoose.Types.ObjectId(rawId),
      qty: Number(it.qty),
    };
  });

  // 8) Buat instance Product
  const product = new Product({
    title: title.trim(),
    image: imageUrl,
    tags: parsedTags,
    steps: parsedSteps,
    tips: parsedTips,
    category: cat,
    createdBy: new mongoose.Types.ObjectId(req.user._id),
    ingredients: mappedIngredients,
    packaging: mappedPackaging,
    tools: mappedTools,
    estimatedSellingPrice: estPriceNum,
    productionYield: prodYieldNum,
    dailySalesTarget: dailyTargetNum,
    capital: capitalNum,
    isVerified: false,
  });

  // 9) Simpan ke database
  const saved = await product.save();
  return res.status(201).json({
    status: 'success',
    message: 'Product berhasil dibuat',
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
    .select('views title image stars capital isVerified')
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
