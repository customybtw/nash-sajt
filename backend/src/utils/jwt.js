const jwt = require('jsonwebtoken');
const config = require('../config/env');

function signUser(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    config.jwtSecret,
    { expiresIn: '12h' }
  );
}

module.exports = { signUser };
