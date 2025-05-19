/* eslint-disable no-unused-vars */
const logger = require('../utils/logger');

// Handler utama untuk semua error
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  console.log('status code : ' + statusCode);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
  }

  // Hanya log kalau error server yang akan di save di logs (500 ke atas)
  if (statusCode >= 500) {
    logger.error(`Server Error: ${message}`, {
      method: req.method,
      url: req.originalUrl,
      body: req.body,
      stack: err.stack,
    });
  }

  res.status(statusCode).json({
    status: statusCode < 500 ? 'failed' : 'error',
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};

// Handler khusus untuk route yang tidak ditemukan
const notFoundPath = (req, res, next) => {
  const error = new Error(`URL not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

module.exports = { errorHandler, notFoundPath };
