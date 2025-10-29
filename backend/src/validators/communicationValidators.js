const { body } = require('express-validator');

const contactValidation = [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Valid email address is required'),
  body('message').isLength({ min: 10 }).withMessage('Message should be at least 10 characters'),
];

const subscriberValidation = [
  body('email').isEmail().withMessage('Valid email address is required'),
  body('consent').optional().isBoolean(),
];

const campaignValidation = [
  body('subject').notEmpty().withMessage('Subject is required'),
  body('body').notEmpty().withMessage('Newsletter body is required'),
];

module.exports = {
  contactValidation,
  subscriberValidation,
  campaignValidation,
};
