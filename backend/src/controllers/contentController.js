const { validationResult } = require('express-validator');
const contentService = require('../services/contentService');

async function getPages(req, res, next) {
  try {
    const pages = await contentService.getPages();
    res.json(pages);
  } catch (error) {
    next(error);
  }
}

async function getPage(req, res, next) {
  try {
    const page = await contentService.getPageBySlug(req.params.slug);
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json(page);
  } catch (error) {
    next(error);
  }
}

async function upsertPage(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const page = await contentService.upsertPage(req.params.slug, req.body);
    res.json(page);
  } catch (error) {
    next(error);
  }
}

async function listGallery(req, res, next) {
  try {
    const items = await contentService.listGallery();
    res.json(items);
  } catch (error) {
    next(error);
  }
}

async function createGalleryImage(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const item = await contentService.createGalleryImage(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
}

async function updateGalleryImage(req, res, next) {
  try {
    const item = await contentService.updateGalleryImage(Number(req.params.id), req.body);
    res.json(item);
  } catch (error) {
    next(error);
  }
}

async function deleteGalleryImage(req, res, next) {
  try {
    await contentService.deleteGalleryImage(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function listPricingPlans(req, res, next) {
  try {
    const plans = await contentService.listPricingPlans();
    res.json(plans);
  } catch (error) {
    next(error);
  }
}

async function upsertPricingPlan(req, res, next) {
  try {
    const plan = await contentService.upsertPricingPlan(req.params.id ? Number(req.params.id) : undefined, req.body);
    res.json(plan);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPages,
  getPage,
  upsertPage,
  listGallery,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  listPricingPlans,
  upsertPricingPlan,
};
