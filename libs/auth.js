const { apiConfig } = require('../config/index');
const jwt = require('jsonwebtoken');

const sign = (payload) => {
  return jwt.sign(payload, apiConfig.secret, { expiresIn: '3h' });
};

const verify = (payload) => {
  return jwt.verify(payload, apiConfig.secret);
}

module.exports = { sign, verify };
