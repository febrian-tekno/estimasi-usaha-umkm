const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
require('dotenv').config();


// host dan port
const host =
  process.env.NODE_ENV === 'production' ? process.env.HOST : 'localhost';
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 3000;

// mengijinkan semua cors
app.use(cors());

// middleware parsing body request
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

// cookies
app.use(cookieParser());

app.get('/', (req, res) => {
  res.redirect('/api-docs');
})
// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Contoh API
app.get('/api/users', (req, res) => {
  res.status(200)
  res.json([{ id: 1, name: 'User1' }, { id: 2, name: 'User2' }]);
});

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
