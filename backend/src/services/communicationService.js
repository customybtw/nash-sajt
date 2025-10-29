const nodemailer = require('nodemailer');
const { query } = require('../config/database');
const config = require('../config/env');

let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.mail.host,
      port: config.mail.port,
      secure: config.mail.port === 465,
      auth: config.mail.user
        ? {
            user: config.mail.user,
            pass: config.mail.password,
          }
        : undefined,
    });
  }
  return transporter;
}

async function saveContactMessage({ fullName, email, message }) {
  const result = await query(
    `INSERT INTO contact_messages (full_name, email, message) VALUES (:fullName, :email, :message)`,
    { fullName, email, message }
  );

  if (config.mail.host && config.mail.user) {
    try {
      await getTransporter().sendMail({
        from: config.mail.from,
        to: config.mail.user,
        subject: `New contact form submission from ${fullName}`,
        text: message,
        html: `<p>${message}</p><p>Contact email: ${email}</p>`,
      });
    } catch (error) {
      console.error('Failed to send contact notification email', error);
    }
  }

  return query('SELECT * FROM contact_messages WHERE id = :id', { id: result.insertId }).then((rows) => rows[0]);
}

async function listContactMessages() {
  return query('SELECT * FROM contact_messages ORDER BY created_at DESC');
}

async function subscribeToNewsletter(email, consent = 1) {
  await query(
    `INSERT INTO newsletter_subscribers (email, consent)
     VALUES (:email, :consent)
     ON DUPLICATE KEY UPDATE consent = VALUES(consent)`,
    { email, consent }
  );
  return query('SELECT * FROM newsletter_subscribers WHERE email = :email', { email }).then((rows) => rows[0]);
}

async function listSubscribers() {
  return query('SELECT * FROM newsletter_subscribers ORDER BY created_at DESC');
}

async function createNewsletterCampaign({ subject, body }) {
  const result = await query(
    `INSERT INTO newsletter_campaigns (subject, body) VALUES (:subject, :body)`,
    { subject, body }
  );
  return query('SELECT * FROM newsletter_campaigns WHERE id = :id', { id: result.insertId }).then((rows) => rows[0]);
}

module.exports = {
  saveContactMessage,
  listContactMessages,
  subscribeToNewsletter,
  listSubscribers,
  createNewsletterCampaign,
};
