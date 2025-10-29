import JobListing from '../models/JobListing.js';
import createSlug from '../utils/slugify.js';

export const listJobs = async (_req, res, next) => {
  try {
    const jobs = await JobListing.findAll({ where: { isActive: true }, order: [['createdAt', 'DESC']] });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
};

export const upsertJob = async (req, res, next) => {
  try {
    const payload = req.body;
    if (payload.title && !payload.slug) {
      payload.slug = createSlug(payload.title);
    }

    let job;
    if (payload.id) {
      job = await JobListing.findByPk(payload.id);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
      await job.update(payload);
    } else {
      job = await JobListing.create(payload);
    }
    res.json(job);
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await JobListing.findByPk(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    await job.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
