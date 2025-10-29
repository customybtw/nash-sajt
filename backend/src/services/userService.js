const bcrypt = require('bcryptjs');
const { query } = require('../config/database');

async function findByEmail(email) {
  const rows = await query('SELECT * FROM users WHERE email = :email LIMIT 1', { email });
  return rows[0];
}

async function createUser({ email, password, role = 'admin' }) {
  const passwordHash = await bcrypt.hash(password, 10);
  await query('INSERT INTO users (email, password_hash, role) VALUES (:email, :passwordHash, :role)', {
    email,
    passwordHash,
    role,
  });
  return findByEmail(email);
}

module.exports = {
  findByEmail,
  createUser,
};
