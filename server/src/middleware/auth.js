import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Role from '../models/Role.js';

dotenv.config();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.id, { include: Role });

    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const permit = (...allowed) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const permissions = req.user.Role?.permissions || [];
  const hasPermission = allowed.some((permission) => permissions.includes(permission));

  if (!hasPermission) {
    return res.status(403).json({ message: 'Insufficient permissions' });
  }

  return next();
};

export { authMiddleware, permit };
