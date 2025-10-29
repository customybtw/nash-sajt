const { body } = require('express-validator');

const registerValidation = [
  body('email').isEmail().withMessage('A valid email address is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('role').optional().isIn(['admin', 'editor', 'viewer']).withMessage('Invalid role'),
];

const loginValidation = [
  body('email').isEmail().withMessage('A valid email address is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

module.exports = {
  registerValidation,
  loginValidation,
};
