import User from '.';

class UserRepository {
  async store(user) {
    const { id } = await User.create(user);

    return { id };
  }

  async findUserByEmail(email) {
    const user = await User.findOne({ where: { email } });

    return user;
  }
}

export default new UserRepository();
