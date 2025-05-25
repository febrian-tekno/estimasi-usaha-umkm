const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const endpointApi = require('./routes/index');
const { errorHandler, notFoundPath } = require('./middleware/errorHandler');
require('dotenv').config();

// host dan  port
const host = process.env.NODE_ENV === 'production' ? process.env.HOST : 'localhost';
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 3000;
const baseUrlFE = process.env.FRONT_END_URL;
const allowedOrigins = ['http://localhost:3000', 'http://api.localhost:3000', baseUrlFE];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// middleware parsing body request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookies
app.use(cookieParser());

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, {
    swaggerOptions: {
      requestInterceptor: (req) => {
        req.credentials = 'include';
        return req;
      },
    },
  })
);

// endpoint api
app.use('/api/v1', endpointApi);

// error path Not found
app.use(notFoundPath);
// error Handler
app.use(errorHandler);

// check memory usage every 5 minutes
setInterval(
  () => {
    const usage = process.memoryUsage();
    const now = new Date();
    const timestamp = now.toISOString();

    console.log(`\n[MEMORY CHECK - ${timestamp}]`);
    console.log(`- RSS         : ${(usage.rss / 1024 / 1024).toFixed(2)} MB`);
    console.log(`- Heap Total  : ${(usage.heapTotal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`- Heap Used   : ${(usage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`- External    : ${(usage.external / 1024 / 1024).toFixed(2)} MB`);
    console.log('-------------------------------------------');
  },
  5 * 60 * 1000
);

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
