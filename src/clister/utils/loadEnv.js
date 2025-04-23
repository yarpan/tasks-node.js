const dotenv = require('dotenv');
const path = require('path');

module.exports = function loadEnv() {
  const envPath = path.join(__dirname, '../.env');
  dotenv.config({ path: envPath });
};