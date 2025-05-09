const asyncHandler = require("../middleware/asyncHandler");
const { scrapeResep } = require("../scraper/scrapper");


const getResepHandler = asyncHandler (async (req, res) => {
    res.status(200)
    const result = await scrapeResep(`https://resepkoki.id/resep/resep-ayam-kecap-goreng-mentega`);
    res.json({status:'success', data: result});
  });

module.exports = {getResepHandler};