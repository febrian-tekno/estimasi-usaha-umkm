const asyncHandler = require("../middleware/asyncHandler");
// const Resep = require("../models/Resep");
// const { scrapeResep } = require("../services/scrapper");

const getResepHandler = asyncHandler(async (req, res, next) => {
  try {
   const test = false
    if (!test) {
      throw createError(500, `internal server error`);
    }

    // resep = new Resep(result);
    res.status(200).json({ status: "success", });
  } catch (err) {
    next(err);
  }
});

function createError(statusCode, message) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

module.exports = { getResepHandler };
