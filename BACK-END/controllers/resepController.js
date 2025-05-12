const asyncHandler = require("../middleware/asyncHandler");
const Resep = require("../models/Resep");
const { scrapeResep } = require("../services/scraper/scrapper");
const logger = require("../utils/logger");

const getResepHandler = asyncHandler(async (req, res) => {
  const title = "resep-ayam-kecap-goreng-mentereng";
  try {
    let resep = await Resep.findOne({ title });
    if (resep) {
      console.log("database save running");
      return res.status(200).json({ status: "success", data: resep });
    }

    const result = await scrapeResep(`https://resepkoki.id/resep/${title}`);
    if (!result) {
      throw createError(404, `Resep not found: ${title}`);
    }

    resep = new Resep(result);
    await resep.save();
    res.status(200).json({ status: "success", data: resep });
  } catch (err) {
    logger.error(`Error fetching recipe: ${err.message}`, {
      stack: err.stack,
      method: req.method,
      url: req.url,
    });
    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({
      status: "error",
      message,
    });
  }
});

function createError(statusCode, message) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

module.exports = { getResepHandler };
