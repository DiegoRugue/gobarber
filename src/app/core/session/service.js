import jwt from 'jsonwebtoken';
import config from '../../../config/auth';
import SessionScope from './scope';
import SessionRepository from './repository';

class SessionService {
  static async store(email, password) {
    await SessionScope.store({ email, password });

    const user = await SessionRepository.findUserByEmail(email);

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

export default SessionService;
