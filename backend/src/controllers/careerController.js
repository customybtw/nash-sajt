const { validationResult } = require('express-validator');
const { JobListing, JobApplication } = require('../models');

const listJobListings = async (req, res) => {
  try {
    const jobs = await JobListing.findAll({
      where: req.query.active === 'true' ? { isActive: true } : undefined,
      order: [['updatedAt', 'DESC']]
    });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch job listings', error: error.message });
  }
};

const upsertJobListing = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const payload = {
    title: req.body.title,
    department: req.body.department,
    location: req.body.location,
    employmentType: req.body.employmentType,
    description: req.body.description,
    requirements: req.body.requirements,
    benefits: req.body.benefits,
    isActive: req.body.isActive
  };

  try {
    let job;
    if (id) {
      job = await JobListing.findByPk(id);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
      await job.update(payload);
    } else {
      job = await JobListing.create(payload);
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save job listing', error: error.message });
  }
};

const deleteJobListing = async (req, res) => {
  try {
    await JobListing.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete job listing', error: error.message });
  }
};

const submitApplication = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { jobId, fullName, email, message } = req.body;
  try {
    const application = await JobApplication.create({
      JobListingId: jobId,
      fullName,
      email,
      message,
      cvUrl: req.file ? `/uploads/${req.file.filename}` : req.body.cvUrl
    });
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit application', error: error.message });
  }
};

const listApplications = async (req, res) => {
  try {
    const applications = await JobApplication.findAll({
      include: [{ model: JobListing }],
      order: [['createdAt', 'DESC']]
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch applications', error: error.message });
  }
};

module.exports = {
  listJobListings,
  upsertJobListing,
  deleteJobListing,
  submitApplication,
  listApplications
};
