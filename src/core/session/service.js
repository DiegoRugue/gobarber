import jwt from 'jsonwebtoken';
import config from '../../config/auth';
import UserRepository from '../user/repository';

class SessionService {
  async store(email, password) {
    const user = await UserRepository.findUserByEmail(email);

    if (!user || (user && !(await user.checkPassword(password)))) {
      throw { code: 404, message: 'Email or password not match' };
    }

    const { id, name } = user;

    return {
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, config.secret, {
        expiresIn: config.expiresIn,
      }),
    };
  }
}

export default new SessionService();
