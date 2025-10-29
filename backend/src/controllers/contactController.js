const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const { ContactMessage } = require('../models');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'user@example.com',
    pass: process.env.SMTP_PASSWORD || 'password'
  }
});

const submitContactForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, message } = req.body;

  try {
    const contactMessage = await ContactMessage.create({ name, email, phone, message });
    if (process.env.CONTACT_EMAIL) {
      await transporter.sendMail({
        from: process.env.CONTACT_EMAIL,
        to: process.env.CONTACT_EMAIL,
        subject: `New contact form submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\n${message}`
      });
    }

    res.status(201).json({ message: 'Message received', contactMessage });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit contact form', error: error.message });
  }
};

const listContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.findAll({ order: [['createdAt', 'DESC']] });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
  }
};

const updateContactStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const contactMessage = await ContactMessage.findByPk(id);
    if (!contactMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }
    await contactMessage.update({ status });
    res.json(contactMessage);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update message status', error: error.message });
  }
};

module.exports = {
  submitContactForm,
  listContactMessages,
  updateContactStatus
};
