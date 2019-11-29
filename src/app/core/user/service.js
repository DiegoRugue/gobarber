import UserScope from './scope';
import UserRepository from './repository';

class UserService {
  static async checkUserEmail(email) {
    const userExists = await UserRepository.findUserByEmail(email);

    if (userExists) throw { code: 401, message: 'E-mail already registered' };

    return true;
  }

  static async store(user) {
    await UserScope.store(user);
    await this.checkUserEmail(user.email);

    const id = await UserRepository.store(user);

    return {
      user: {
        id,
      },
    };
  }

  static async update(id, data) {
    const { email, oldPassword } = data;

    const user = await UserRepository.findUserById(id);

    if (email !== user.email) {
      await this.checkUserEmail(email);
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      throw { code: 401, message: 'Password not match' };
    }

    await UserRepository.update(user, data);

    return {
      user: {
        id,
      },
    };
  }
}

export default UserService;
