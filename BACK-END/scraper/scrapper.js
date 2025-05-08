
const axios = require("axios");
const cheerio = require("cheerio");

const scrapeResep = async (url) => {
  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);
    console.log($)
    const title = $("div.single-title h1").first().text().trim();
    const ingredients = [];

    $("div.print-ingredient").each((i, el) => {
      const name = $(el).find(".ingredient-name").text().trim();
      const amount = $(el).find(".ingredient-amount").text().trim();
    
      if (name) {
        ingredients.push({ name, amount });
      }
    });

    const steps = [];

    $("div.single-step-description-i").each((i, el) => {
        const text = $(el).text().trim();
        if (text) {
          steps.push({ step: i + 1, description: text });
        }
      });

    const hasil = {
      title,
      ingredients,
      steps,
      sourceUrl: url,
    };

    console.log(hasil);
    return hasil;

  } catch (err) {
    console.error("Gagal scrape:", err.message);
  }
}
module.exports = {scrapeResep};