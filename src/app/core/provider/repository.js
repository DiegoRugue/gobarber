import User from '../../models/User';
import File from '../../models/File';

class ProviderRepository {
  static async index() {
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email'],
      include: [
        { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] },
      ],
    });

    return providers;
  }
}

export default ProviderRepository;
