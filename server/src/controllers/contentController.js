import { validationResult } from 'express-validator';
import PageSection from '../models/PageSection.js';
import SiteSetting from '../models/SiteSetting.js';
import PortfolioItem from '../models/PortfolioItem.js';
import ImageAsset from '../models/ImageAsset.js';
import createSlug from '../utils/slugify.js';

export const getPageSections = async (req, res, next) => {
  try {
    const { page } = req.params;
    const sections = await PageSection.findAll({
      where: { page },
      order: [['order', 'ASC']],
      include: [
        {
          model: PageSection,
          as: 'children',
          include: [{ model: ImageAsset }],
        },
        ImageAsset,
      ],
    });

    res.json(sections);
  } catch (error) {
    next(error);
  }
};

export const upsertSection = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const payload = req.body;
    if (payload.title && !payload.slug) {
      payload.slug = createSlug(payload.title);
    }

    let section;
    if (id) {
      section = await PageSection.findByPk(id);
      if (!section) {
        return res.status(404).json({ message: 'Section not found' });
      }
      await section.update(payload);
    } else {
      section = await PageSection.create(payload);
    }

    res.json(section);
  } catch (error) {
    next(error);
  }
};

export const deleteSection = async (req, res, next) => {
  try {
    const { id } = req.params;
    const section = await PageSection.findByPk(id);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    await section.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getSettings = async (req, res, next) => {
  try {
    const settings = await SiteSetting.findAll();
    res.json(settings);
  } catch (error) {
    next(error);
  }
};

export const updateSetting = async (req, res, next) => {
  try {
    const { key } = req.params;
    const { value, description } = req.body;
    const [setting] = await SiteSetting.findOrCreate({
      where: { key },
      defaults: { value, description },
    });

    setting.value = value;
    setting.description = description;
    await setting.save();
    res.json(setting);
  } catch (error) {
    next(error);
  }
};

export const listPortfolio = async (req, res, next) => {
  try {
    const items = await PortfolioItem.findAll({ include: [{ model: ImageAsset, as: 'coverImage' }] });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const upsertPortfolioItem = async (req, res, next) => {
  try {
    const payload = req.body;
    if (payload.title && !payload.slug) {
      payload.slug = createSlug(payload.title);
    }

    let item;
    if (payload.id) {
      item = await PortfolioItem.findByPk(payload.id);
      if (!item) {
        return res.status(404).json({ message: 'Portfolio item not found' });
      }
      await item.update(payload);
    } else {
      item = await PortfolioItem.create(payload);
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const deletePortfolioItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await PortfolioItem.findByPk(id);
    if (!item) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    await item.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
