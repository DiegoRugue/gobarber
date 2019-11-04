import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import config from '../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) res.error(401, 'Token not provided');

  const [, token] = authHeader.split(' ');

  try {
    const { id } = await promisify(jwt.verify)(token, config.secret);

    req.userId = id;

    next();
  } catch (ex) {
    res.error(401, 'Token invalid');
  }
};
