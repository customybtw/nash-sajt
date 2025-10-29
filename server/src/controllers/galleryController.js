const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { ImageAsset } = require('../models');

exports.listImages = asyncHandler(async (req, res) => {
  const images = await ImageAsset.findAll({ order: [['createdAt', 'DESC']] });
  return res.json({ success: true, data: images });
});

exports.createImage = asyncHandler(async (req, res) => {
  const image = await ImageAsset.create(req.body);
  return res.status(201).json({ success: true, data: image });
});

exports.updateImage = asyncHandler(async (req, res) => {
  const image = await ImageAsset.findByPk(req.params.id);
  if (!image) {
    throw new ApiError(404, 'Image not found');
  }

  await image.update(req.body);
  return res.json({ success: true, data: image });
});

exports.deleteImage = asyncHandler(async (req, res) => {
  const image = await ImageAsset.findByPk(req.params.id);
  if (!image) {
    throw new ApiError(404, 'Image not found');
  }

  await image.destroy();
  return res.status(204).send();
});
