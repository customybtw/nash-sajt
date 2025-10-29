const { body } = require('express-validator');

const pageValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional().isString(),
  body('content').optional().isString(),
];

const galleryValidation = [
  body('imageUrl').isURL().withMessage('Image URL is required'),
  body('title').optional().isString(),
  body('description').optional().isString(),
  body('altText').optional().isString(),
  body('metaTitle').optional().isString(),
  body('metaDescription').optional().isString(),
];

const pricingValidation = [
  body('name').notEmpty().withMessage('Plan name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('billingCycle').isIn(['monthly', 'yearly', 'commission']).withMessage('Invalid billing cycle'),
  body('features').optional().isArray(),
  body('description').optional().isString(),
];

module.exports = {
  pageValidation,
  galleryValidation,
  pricingValidation,
};
