const mongoose = require("mongoose");
const { Schema } = mongoose;

const resepSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title harus diisi"],
    },
    ingredients: [
      {
        name: { type: String, required: true },
        amount: { type: String, required: true },
        estimatedPrice: { type: Number, default: 0 },
      },
    ],
    steps: [
      {
        step: { type: Number, required: true },
        description: { type: String, required: true },
      },
    ],
    tips: { type: String },
    sourceUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

const Resep = mongoose.model("Resep", resepSchema);

module.exports = Resep;
