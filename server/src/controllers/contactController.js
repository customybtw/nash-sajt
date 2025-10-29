import { validationResult } from 'express-validator';
import ContactMessage from '../models/ContactMessage.js';
import sendMail from '../utils/mailer.js';
import SiteSetting from '../models/SiteSetting.js';

export const submitContactForm = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const message = await ContactMessage.create(req.body);

    const emailSetting = await SiteSetting.findOne({ where: { key: 'contact_inbox' } });
    const inbox = emailSetting ? emailSetting.value : process.env.EMAIL_USER;

    await sendMail({
      to: inbox,
      subject: `New contact request from ${message.name}`,
      text: message.message,
      html: `<p>${message.message}</p><p>Email: ${message.email}</p>`
    });

    res.status(201).json({ message: 'Thank you! We will get back to you shortly.' });
  } catch (error) {
    next(error);
  }
};

export const listContactMessages = async (_req, res, next) => {
  try {
    const messages = await ContactMessage.findAll({ order: [['createdAt', 'DESC']] });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

export const updateContactStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, metadata } = req.body;
    const message = await ContactMessage.findByPk(id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (status) message.status = status;
    if (metadata) message.metadata = metadata;
    await message.save();

    res.json(message);
  } catch (error) {
    next(error);
  }
};
