const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { Product, ImageAsset } = require('../models');

exports.listProducts = asyncHandler(async (req, res) => {
  const products = await Product.findAll({
    order: [['createdAt', 'DESC']],
    include: [{ model: ImageAsset, as: 'gallery' }],
  });
  return res.json({ success: true, data: products });
});

exports.getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    where: { slug: req.params.slug },
    include: [{ model: ImageAsset, as: 'gallery' }],
  });
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  return res.json({ success: true, data: product });
});

exports.createProduct = asyncHandler(async (req, res) => {
  const { galleryIds = [], ...rest } = req.body;
  const product = await Product.create(rest);
  if (galleryIds.length) {
    const images = await ImageAsset.findAll({ where: { id: galleryIds } });
    await product.setGallery(images);
  }

  const productWithGallery = await Product.findByPk(product.id, {
    include: [{ model: ImageAsset, as: 'gallery' }],
  });

  return res.status(201).json({ success: true, data: productWithGallery });
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const { galleryIds = [], ...rest } = req.body;
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  await product.update(rest);
  if (galleryIds.length) {
    const images = await ImageAsset.findAll({ where: { id: galleryIds } });
    await product.setGallery(images);
  } else {
    await product.setGallery([]);
  }

  const productWithGallery = await Product.findByPk(product.id, {
    include: [{ model: ImageAsset, as: 'gallery' }],
  });

  return res.json({ success: true, data: productWithGallery });
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  await product.destroy();
  return res.status(204).send();
});
