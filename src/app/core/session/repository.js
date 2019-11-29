import User from '../../models/User';

class SessionRepository {
  static async findUserByEmail(email) {
    const user = await User.findOne({ where: { email } });

    return user;
  }
}

export default SessionRepository;
