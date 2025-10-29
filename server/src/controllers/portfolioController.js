const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { PortfolioItem, ImageAsset } = require('../models');

exports.listPortfolio = asyncHandler(async (req, res) => {
  const items = await PortfolioItem.findAll({
    order: [['createdAt', 'DESC']],
    include: [{ model: ImageAsset, as: 'images' }],
  });
  return res.json({ success: true, data: items });
});

exports.getPortfolioItem = asyncHandler(async (req, res) => {
  const item = await PortfolioItem.findOne({
    where: { slug: req.params.slug },
    include: [{ model: ImageAsset, as: 'images' }],
  });
  if (!item) {
    throw new ApiError(404, 'Portfolio item not found');
  }

  return res.json({ success: true, data: item });
});

exports.createPortfolioItem = asyncHandler(async (req, res) => {
  const { imageIds = [], ...rest } = req.body;
  const item = await PortfolioItem.create(rest);
  if (imageIds.length) {
    const images = await ImageAsset.findAll({ where: { id: imageIds } });
    await item.setImages(images);
  }

  const itemWithImages = await PortfolioItem.findByPk(item.id, {
    include: [{ model: ImageAsset, as: 'images' }],
  });

  return res.status(201).json({ success: true, data: itemWithImages });
});

exports.updatePortfolioItem = asyncHandler(async (req, res) => {
  const { imageIds = [], ...rest } = req.body;
  const item = await PortfolioItem.findByPk(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Portfolio item not found');
  }

  await item.update(rest);
  if (imageIds.length) {
    const images = await ImageAsset.findAll({ where: { id: imageIds } });
    await item.setImages(images);
  } else {
    await item.setImages([]);
  }

  const itemWithImages = await PortfolioItem.findByPk(item.id, {
    include: [{ model: ImageAsset, as: 'images' }],
  });

  return res.json({ success: true, data: itemWithImages });
});

exports.deletePortfolioItem = asyncHandler(async (req, res) => {
  const item = await PortfolioItem.findByPk(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Portfolio item not found');
  }

  await item.destroy();
  return res.status(204).send();
});
