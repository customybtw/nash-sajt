const { verifyToken } = require('../utils/jwt');
const ApiError = require('../utils/ApiError');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Authentication token is missing');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    const user = await User.scope('withPassword').findByPk(decoded.id);
    if (!user) {
      throw new ApiError(401, 'Invalid authentication token');
    }

    const safeUser = user.get({ plain: true });
    delete safeUser.password;
    req.user = safeUser;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
