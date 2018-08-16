const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (token) => {
  if (token !== '') {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      return User.findById(decoded.id);
    }
    return null;
  }
  return null;
};
