const jwt = require('jsonwebtoken');
const { User } = require('../models');

const getUser = async (token) => {
  if (token !== '') {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      return User.findById(decoded.id);
    }
    return null;
  }
  return null;
};

module.exports = {
  getUser,
};
