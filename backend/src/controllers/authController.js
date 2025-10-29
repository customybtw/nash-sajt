const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { signUser } = require('../utils/jwt');
const userService = require('../services/userService');

async function register(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const existing = await userService.findByEmail(req.body.email);
    if (existing) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = await userService.createUser({
      email: req.body.email,
      password: req.body.password,
      role: req.body.role || 'admin',
    });

    const token = signUser(user);
    res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const user = await userService.findByEmail(req.body.email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(req.body.password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signUser(user);
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
};
