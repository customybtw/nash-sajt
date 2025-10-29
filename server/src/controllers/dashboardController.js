const asyncHandler = require('../utils/asyncHandler');
const {
  ContactMessage,
  NewsletterSubscriber,
  PricingPlan,
  Subscription,
  Order,
  Product,
} = require('../models');

exports.overview = asyncHandler(async (req, res) => {
  const [messageCount, subscriberCount, planCount, subscriptionCount, orderCount, productCount] =
    await Promise.all([
      ContactMessage.count(),
      NewsletterSubscriber.count(),
      PricingPlan.count(),
      Subscription.count(),
      Order.count(),
      Product.count(),
    ]);

  return res.json({
    success: true,
    data: {
      messageCount,
      subscriberCount,
      planCount,
      subscriptionCount,
      orderCount,
      productCount,
    },
  });
});
