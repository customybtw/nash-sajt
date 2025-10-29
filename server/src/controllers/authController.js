const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { signToken } = require('../utils/jwt');
const { User } = require('../models');

const sanitizeUser = (user) => {
  const json = user.toJSON();
  delete json.password;
  return json;
};

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.unscoped().findOne({ where: { email } });
  if (existingUser) {
    throw new ApiError(409, 'A user with this email already exists');
  }

  const user = await User.create({ name, email, password, role });

  return res.status(201).json({
    success: true,
    data: sanitizeUser(user),
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.scope('withPassword').findOne({ where: { email } });
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isValid = await user.validatePassword(password);
  if (!isValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  user.lastLoginAt = new Date();
  await user.save();

  const token = signToken({ id: user.id, role: user.role });

  return res.json({
    success: true,
    data: {
      token,
      user: sanitizeUser(user),
    },
  });
});

exports.profile = asyncHandler(async (req, res) => {
  return res.json({ success: true, data: sanitizeUser(req.user) });
});
