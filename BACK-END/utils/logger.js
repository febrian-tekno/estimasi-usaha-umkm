const { createLogger, format, transports } = require('winston');
require('winston-mongodb');
require('dotenv').config();

const logger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log' }), 
    new transports.MongoDB({
      db: process.env.DATABASE,
      collection: 'error_logs',
      tryReconnect: true,
      options: {
        useUnifiedTopology: true,
      },
    }),
    new transports.Console({ format: format.simple() }) 
  ],
});

module.exports = logger;