const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { Subscription, PricingPlan } = require('../models');

exports.listSubscriptions = asyncHandler(async (req, res) => {
  const subscriptions = await Subscription.findAll({
    include: [{ model: PricingPlan, as: 'plan' }],
    order: [['createdAt', 'DESC']],
  });
  return res.json({ success: true, data: subscriptions });
});

exports.createSubscription = asyncHandler(async (req, res) => {
  const { planId, ...rest } = req.body;
  const plan = await PricingPlan.findByPk(planId);
  if (!plan) {
    throw new ApiError(404, 'Plan not found');
  }

  const subscription = await Subscription.create({ planId, ...rest });
  return res.status(201).json({ success: true, data: subscription });
});

exports.updateSubscription = asyncHandler(async (req, res) => {
  const subscription = await Subscription.findByPk(req.params.id);
  if (!subscription) {
    throw new ApiError(404, 'Subscription not found');
  }

  await subscription.update(req.body);
  return res.json({ success: true, data: subscription });
});

exports.deleteSubscription = asyncHandler(async (req, res) => {
  const subscription = await Subscription.findByPk(req.params.id);
  if (!subscription) {
    throw new ApiError(404, 'Subscription not found');
  }

  await subscription.destroy();
  return res.status(204).send();
});
