import UserRepository from './repository';

class UserService {
  async store(user) {
    const userExists = await UserRepository.findUserByEmail(user.email);

    if (userExists) throw { code: 401, message: 'User already exists' };

    const result = await UserRepository.store(user);

    return result;
  }
}

export default new UserService();
