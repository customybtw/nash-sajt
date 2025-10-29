const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const { NewsletterSubscriber } = require('../models');

const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'user@example.com',
    pass: process.env.SMTP_PASSWORD || 'password'
  }
});

const subscribe = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, name } = req.body;
  try {
    const [subscriber] = await NewsletterSubscriber.upsert({ email, name, unsubscribedAt: null });
    res.status(201).json({ message: 'Subscribed successfully', subscriber });
  } catch (error) {
    res.status(500).json({ message: 'Failed to subscribe', error: error.message });
  }
};

const listSubscribers = async (req, res) => {
  try {
    const subscribers = await NewsletterSubscriber.findAll({ order: [['createdAt', 'DESC']] });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch subscribers', error: error.message });
  }
};

const sendNewsletter = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { subject, content } = req.body;
  try {
    const subscribers = await NewsletterSubscriber.findAll({ where: { unsubscribedAt: null } });
    if (!subscribers.length) {
      return res.status(400).json({ message: 'No subscribers to send' });
    }

    if (process.env.SMTP_USER) {
      await mailer.sendMail({
        from: process.env.SMTP_USER,
        bcc: subscribers.map((sub) => sub.email).join(','),
        subject,
        html: content
      });
    }

    res.json({ message: 'Newsletter sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send newsletter', error: error.message });
  }
};

module.exports = {
  subscribe,
  listSubscribers,
  sendNewsletter
};
