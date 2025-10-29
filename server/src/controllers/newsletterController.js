const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { NewsletterSubscriber } = require('../models');

exports.subscribe = asyncHandler(async (req, res) => {
  const { email, name } = req.body;
  const [subscriber, created] = await NewsletterSubscriber.findOrCreate({
    where: { email },
    defaults: { name },
  });

  if (!created) {
    await subscriber.update({ name, unsubscribedAt: null });
  }

  return res.status(201).json({ success: true, data: subscriber });
});

exports.unsubscribe = asyncHandler(async (req, res) => {
  const subscriber = await NewsletterSubscriber.findOne({ where: { email: req.body.email } });
  if (!subscriber) {
    throw new ApiError(404, 'Subscriber not found');
  }

  await subscriber.update({ unsubscribedAt: new Date() });
  return res.json({ success: true, data: subscriber });
});

exports.listSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await NewsletterSubscriber.findAll({ order: [['createdAt', 'DESC']] });
  return res.json({ success: true, data: subscribers });
});
