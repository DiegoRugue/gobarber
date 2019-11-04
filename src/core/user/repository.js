import User from '../models/User';

class UserRepository {
  async store(user) {
    const { id } = await User.create(user);

    return id;
  }

  async findUserByEmail(email) {
    const user = await User.findOne({ where: { email } });

    return user;
  }

  async findUserById(id) {
    const user = await User.findByPk(id);

    return user;
  }

  async update(user, data) {
    const result = await user.update(data);

    return result;
  }
}

export default new UserRepository();
