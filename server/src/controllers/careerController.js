const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { CareerPosition, JobApplication } = require('../models');

exports.listPositions = asyncHandler(async (req, res) => {
  const positions = await CareerPosition.findAll({
    order: [['createdAt', 'DESC']],
    include: [{ model: JobApplication, as: 'applications' }],
  });
  return res.json({ success: true, data: positions });
});

exports.createPosition = asyncHandler(async (req, res) => {
  const position = await CareerPosition.create(req.body);
  return res.status(201).json({ success: true, data: position });
});

exports.updatePosition = asyncHandler(async (req, res) => {
  const position = await CareerPosition.findByPk(req.params.id);
  if (!position) {
    throw new ApiError(404, 'Position not found');
  }

  await position.update(req.body);
  return res.json({ success: true, data: position });
});

exports.deletePosition = asyncHandler(async (req, res) => {
  const position = await CareerPosition.findByPk(req.params.id);
  if (!position) {
    throw new ApiError(404, 'Position not found');
  }

  await position.destroy();
  return res.status(204).send();
});

exports.submitApplication = asyncHandler(async (req, res) => {
  const position = await CareerPosition.findByPk(req.params.positionId);
  if (!position) {
    throw new ApiError(404, 'Position not found');
  }

  const application = await JobApplication.create({
    ...req.body,
    positionId: position.id,
  });

  return res.status(201).json({ success: true, data: application });
});
