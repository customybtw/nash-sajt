const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

exports.createStripeSession = asyncHandler(async (req, res) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new ApiError(500, 'Stripe is not configured');
  }

  // Integration placeholder for front-end to pass line items
  return res.json({
    success: true,
    data: {
      message: 'Stripe integration placeholder. Implement client-side checkout using Stripe SDK.',
    },
  });
});

exports.createPaypalOrder = asyncHandler(async (req, res) => {
  if (!process.env.PAYPAL_CLIENT_ID) {
    throw new ApiError(500, 'PayPal is not configured');
  }

  return res.json({
    success: true,
    data: {
      message: 'PayPal integration placeholder. Use PayPal REST API to create real orders.',
    },
  });
});
