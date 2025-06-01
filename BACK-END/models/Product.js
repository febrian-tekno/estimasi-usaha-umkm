const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: String,
    tags: [String],
    views: {
      type: Number,
      default: 0,
    },
    stars: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: ['food', 'drink', 'lainnya'],
      required: true,
    },
    steps: [String],
    tips: [String],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    ingredients: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Ingredient',
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
      },
    ],

    packaging: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Packaging',
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
      },
    ],

    tools: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Tool',
          required: true,
        },
        qty: {
          type: Number,
          required: false, // optional, bisa dipakai untuk peralatan sekali pakai
        },
      },
    ],

    isVerified: {
      type: Boolean,
      default: false,
    },

    estimatedSellingPrice: Number, // estimasiHargaJual
    productionYield: Number, // hasilPerProduksi
    dailySalesTarget: Number, // targetPenjualanPerHari
    capital: Number, // totalModalTanpaPeralatan
    profit: Number, // estimasiKeuntunganPerHari
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
