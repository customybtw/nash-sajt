const { validationResult } = require('express-validator');
const communicationService = require('../services/communicationService');

async function submitContactForm(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const message = await communicationService.saveContactMessage({
      fullName: req.body.fullName,
      email: req.body.email,
      message: req.body.message,
    });

    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
}

async function listMessages(req, res, next) {
  try {
    const messages = await communicationService.listContactMessages();
    res.json(messages);
  } catch (error) {
    next(error);
  }
}

async function subscribe(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const subscriber = await communicationService.subscribeToNewsletter(req.body.email, req.body.consent);
    res.status(201).json(subscriber);
  } catch (error) {
    next(error);
  }
}

async function listSubscribers(req, res, next) {
  try {
    const subscribers = await communicationService.listSubscribers();
    res.json(subscribers);
  } catch (error) {
    next(error);
  }
}

async function createCampaign(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const campaign = await communicationService.createNewsletterCampaign({
      subject: req.body.subject,
      body: req.body.body,
    });

    res.status(201).json(campaign);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  submitContactForm,
  listMessages,
  subscribe,
  listSubscribers,
  createCampaign,
};
