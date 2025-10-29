const { validationResult } = require('express-validator');
const {
  PageSection,
  GalleryImage,
  PricingPlan,
  Setting
} = require('../models');

const upsertSection = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { slug, type, title, subtitle, content, seoTitle, seoDescription, seoKeywords, heroImageUrl, extraData } = req.body;

  try {
    const [section] = await PageSection.upsert({
      slug,
      type,
      title,
      subtitle,
      content,
      seoTitle,
      seoDescription,
      seoKeywords,
      heroImageUrl,
      extraData
    }, { returning: true });

    res.json({ message: 'Section saved', section });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save section', error: error.message });
  }
};

const listSections = async (req, res) => {
  try {
    const sections = await PageSection.findAll({ order: [['updatedAt', 'DESC']] });
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sections', error: error.message });
  }
};

const deleteSection = async (req, res) => {
  try {
    await PageSection.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete section', error: error.message });
  }
};

const createGalleryImage = async (req, res) => {
  const payload = {
    title: req.body.title,
    description: req.body.description,
    altText: req.body.altText,
    seoTitle: req.body.seoTitle,
    seoDescription: req.body.seoDescription,
    tags: req.body.tags,
    isFeatured: req.body.isFeatured,
    imageUrl: req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl
  };

  try {
    const image = await GalleryImage.create(payload);
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create gallery image', error: error.message });
  }
};

const listGalleryImages = async (req, res) => {
  try {
    const images = await GalleryImage.findAll({ order: [['createdAt', 'DESC']] });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch gallery images', error: error.message });
  }
};

const deleteGalleryImage = async (req, res) => {
  try {
    await GalleryImage.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete gallery image', error: error.message });
  }
};

const upsertPricingPlan = async (req, res) => {
  const { id } = req.params;
  const { name, slug, priceMonthly, billingType, description, features, highlight } = req.body;
  try {
    let plan;
    if (id) {
      plan = await PricingPlan.findByPk(id);
      if (!plan) {
        return res.status(404).json({ message: 'Plan not found' });
      }
      await plan.update({ name, slug, priceMonthly, billingType, description, features, highlight });
    } else {
      plan = await PricingPlan.create({ name, slug, priceMonthly, billingType, description, features, highlight });
    }
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save pricing plan', error: error.message });
  }
};

const listPricingPlans = async (req, res) => {
  try {
    const plans = await PricingPlan.findAll({ order: [['priceMonthly', 'ASC']] });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pricing plans', error: error.message });
  }
};

const deletePricingPlan = async (req, res) => {
  try {
    await PricingPlan.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete pricing plan', error: error.message });
  }
};

const updateSetting = async (req, res) => {
  const { key } = req.params;
  try {
    const [setting] = await Setting.upsert({ key, value: req.body });
    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update setting', error: error.message });
  }
};

const getSetting = async (req, res) => {
  const { key } = req.params;
  try {
    const setting = await Setting.findOne({ where: { key } });
    res.json(setting ? setting.value : null);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch setting', error: error.message });
  }
};

module.exports = {
  upsertSection,
  listSections,
  deleteSection,
  createGalleryImage,
  listGalleryImages,
  deleteGalleryImage,
  upsertPricingPlan,
  listPricingPlans,
  deletePricingPlan,
  updateSetting,
  getSetting
};
