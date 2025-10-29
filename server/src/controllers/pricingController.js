const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { PricingPlan, CustomFeature } = require('../models');

exports.listPlans = asyncHandler(async (req, res) => {
  const plans = await PricingPlan.findAll({
    order: [['sortOrder', 'ASC']],
    include: [{ model: CustomFeature, as: 'customFeatures' }],
  });
  return res.json({ success: true, data: plans });
});

exports.createPlan = asyncHandler(async (req, res) => {
  const plan = await PricingPlan.create(req.body, {
    include: [{ model: CustomFeature, as: 'customFeatures' }],
  });
  return res.status(201).json({ success: true, data: plan });
});

exports.updatePlan = asyncHandler(async (req, res) => {
  const plan = await PricingPlan.findByPk(req.params.id);
  if (!plan) {
    throw new ApiError(404, 'Plan not found');
  }

  await plan.update(req.body);
  return res.json({ success: true, data: plan });
});

exports.deletePlan = asyncHandler(async (req, res) => {
  const plan = await PricingPlan.findByPk(req.params.id);
  if (!plan) {
    throw new ApiError(404, 'Plan not found');
  }

  await plan.destroy();
  return res.status(204).send();
});
