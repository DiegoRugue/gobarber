import User from '../../models/User';

class UserRepository {
  static async store(user) {
    const { id } = await User.create(user);

    return id;
  }

  static async findUserById(id) {
    const user = await User.findByPk(id);

    return user;
  }

  static async findUserByEmail(email) {
    const user = await User.findOne({ where: { email }, attributes: ['id'] });

    return user;
  }

  static async update(user, data) {
    const result = await user.update(data);

    return result;
  }
}

export default UserRepository;
