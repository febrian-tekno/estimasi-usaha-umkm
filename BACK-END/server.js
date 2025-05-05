const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

// host dan port
const host =
  process.env.NODE_ENV === 'production' ? process.env.HOST : 'localhost';
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 3000;

// mengijinkan semua cors
app.use(cors());

// middleware parsing body request
app.use(express.json()); // Middleware untuk parsing JSON
app.use(express.urlencoded({extended: true})); // (Opsional) Parsing form-urlencoded

// cookies
app.use(cookieParser());

// connect mongodb
async function start() {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log('berhasil terhubung ke database..');
  } catch (error) {
    console.log(`gagal terhubung ke databse : ${error.message}`);
  }
}

app.listen(port, host, () => {
  console.log(`server running on http://${host}:${port}`);
});

module.exports = start;
