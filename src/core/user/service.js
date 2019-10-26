import UserRepository from './repository';

class UserService {
  async store(user) {
    const userExists = await UserRepository.findUserByEmail(user.email);

    if (userExists) throw { code: 401, message: 'User already exists' };

    const id = await UserRepository.store(user);

    return {
      user: {
        id,
      },
    };
  }
}

export default new UserService();
