const asyncHandler = require('../utils/asyncHandler');
const { AnalyticsIntegration } = require('../models');

exports.listIntegrations = asyncHandler(async (req, res) => {
  const integrations = await AnalyticsIntegration.findAll();
  return res.json({ success: true, data: integrations });
});

exports.upsertIntegration = asyncHandler(async (req, res) => {
  const { provider, trackingId, isActive, metadata } = req.body;
  await AnalyticsIntegration.upsert({ provider, trackingId, isActive, metadata });
  const integration = await AnalyticsIntegration.findOne({ where: { provider } });

  return res.json({ success: true, data: integration });
});
