import PricingPlan from '../models/PricingPlan.js';
import createSlug from '../utils/slugify.js';

export const listPricingPlans = async (_req, res, next) => {
  try {
    const plans = await PricingPlan.findAll({ order: [['price', 'ASC']] });
    res.json(plans);
  } catch (error) {
    next(error);
  }
};

export const upsertPricingPlan = async (req, res, next) => {
  try {
    const payload = req.body;
    if (payload.name && !payload.slug) {
      payload.slug = createSlug(payload.name);
    }

    let plan;
    if (payload.id) {
      plan = await PricingPlan.findByPk(payload.id);
      if (!plan) {
        return res.status(404).json({ message: 'Pricing plan not found' });
      }
      await plan.update(payload);
    } else {
      plan = await PricingPlan.create(payload);
    }

    res.json(plan);
  } catch (error) {
    next(error);
  }
};

export const deletePricingPlan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const plan = await PricingPlan.findByPk(id);
    if (!plan) {
      return res.status(404).json({ message: 'Pricing plan not found' });
    }
    await plan.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
