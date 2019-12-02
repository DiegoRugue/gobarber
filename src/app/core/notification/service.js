import NotificationRepository from './repository';

class NotificationService {
  static async index(id) {
    const isProvider = await NotificationRepository.checkProvider(id);
    if (!isProvider) throw { code: 401, message: 'User is not a provider' };

    const result = await NotificationRepository.index(id);

    return result;
  }
}

export default NotificationService;
