
const axios = require("axios");
const cheerio = require("cheerio");

const scrapeResep = async (url) => {
  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    const result = {
      title:'',
      ingredients: [],
      steps: [],
      imageUrl:'',
      tips: '',
      sourceUrl: url,
    };

    result.title = $("div.single-title h1").first().text().trim();

    $("div.print-ingredient").each((i, el) => {
      const name = $(el).find(".ingredient-name").text().trim();
      const amount = $(el).find(".ingredient-amount").text().trim();
    
      if (name) {
        result.ingredients.push({ name, amount });
      }
    });


    $("div.single-step-description-i").each((i, el) => {
        const text = $(el).text().trim();
        if(i === $("div.single-step-description-i").length - 1) {
          result.tips = text;
        } else if(text) {
          result.steps.push({ step: i + 1, description: text });
        }
      });

      result.imageUrl = $('img.wp-post-image').attr('src');
    return result;

  } catch (err) {
    console.error("Gagal scrape:", err.message);
  }
}
module.exports = {scrapeResep};