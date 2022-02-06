const jwt = require('jsonwebtoken');

module.exports = {
  generateToken(params = []) {
    return jwt.sign(params, process.env.SECRET_KEY, {
      expiresIn: 86400,
    });
  },
};
