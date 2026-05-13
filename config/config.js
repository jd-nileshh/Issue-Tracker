require('dotenv').config();

module.exports = {
  // Accept values like "3000 ," or "3000" and coerce to a clean integer.
  PORT: Number(String(process.env.PORT || 5000).replace(/[^0-9]/g, '')) || 5000,
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET
};
