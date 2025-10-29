const jwt = require('jsonwebtoken');

const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET || 'supersecret', {
    expiresIn: '7d'
  });

const verifyToken = (token) =>
  jwt.verify(token, process.env.JWT_SECRET || 'supersecret');

module.exports = {
  signToken,
  verifyToken
};
