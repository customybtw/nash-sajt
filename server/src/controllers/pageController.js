const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { PageSection } = require('../models');

exports.getSections = asyncHandler(async (req, res) => {
  const { page } = req.query;
  const where = page ? { page } : {};
  const sections = await PageSection.findAll({ where, order: [['order', 'ASC']] });

  return res.json({ success: true, data: sections });
});

exports.getSection = asyncHandler(async (req, res) => {
  const section = await PageSection.findByPk(req.params.id);
  if (!section) {
    throw new ApiError(404, 'Section not found');
  }

  return res.json({ success: true, data: section });
});

exports.createSection = asyncHandler(async (req, res) => {
  const section = await PageSection.create(req.body);
  return res.status(201).json({ success: true, data: section });
});

exports.updateSection = asyncHandler(async (req, res) => {
  const section = await PageSection.findByPk(req.params.id);
  if (!section) {
    throw new ApiError(404, 'Section not found');
  }

  await section.update(req.body);
  return res.json({ success: true, data: section });
});

exports.deleteSection = asyncHandler(async (req, res) => {
  const section = await PageSection.findByPk(req.params.id);
  if (!section) {
    throw new ApiError(404, 'Section not found');
  }

  await section.destroy();
  return res.status(204).send();
});
