const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { ContactMessage } = require('../models');
const { sendMail } = require('../utils/mailer');

exports.submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  const storedMessage = await ContactMessage.create({ name, email, message });

  if (process.env.MAIL_HOST) {
    await sendMail({
      to: process.env.MAIL_TO || process.env.MAIL_FROM,
      subject: `New contact form submission from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
    });
  }

  return res.status(201).json({ success: true, data: storedMessage });
});

exports.listMessages = asyncHandler(async (req, res) => {
  const messages = await ContactMessage.findAll({ order: [['createdAt', 'DESC']] });
  return res.json({ success: true, data: messages });
});

exports.updateStatus = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findByPk(req.params.id);
  if (!message) {
    throw new ApiError(404, 'Message not found');
  }

  await message.update({ status: req.body.status });
  return res.json({ success: true, data: message });
});
