const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { DomainHosting } = require('../models');

exports.listDomains = asyncHandler(async (req, res) => {
  const domains = await DomainHosting.findAll({ order: [['createdAt', 'DESC']] });
  return res.json({ success: true, data: domains });
});

exports.createDomain = asyncHandler(async (req, res) => {
  const domain = await DomainHosting.create(req.body);
  return res.status(201).json({ success: true, data: domain });
});

exports.updateDomain = asyncHandler(async (req, res) => {
  const domain = await DomainHosting.findByPk(req.params.id);
  if (!domain) {
    throw new ApiError(404, 'Domain record not found');
  }

  await domain.update(req.body);
  return res.json({ success: true, data: domain });
});

exports.deleteDomain = asyncHandler(async (req, res) => {
  const domain = await DomainHosting.findByPk(req.params.id);
  if (!domain) {
    throw new ApiError(404, 'Domain record not found');
  }

  await domain.destroy();
  return res.status(204).send();
});
