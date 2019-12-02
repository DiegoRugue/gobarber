import NotificationService from './service';
import NotificationRepository from './repository';

class NotificationController {
  static async index(req, res) {
    const result = await NotificationService.index(req.userId);

    res.ok(result);
  }

  static async update(req, res) {
    const result = await NotificationRepository.update(req.params.id);

    res.ok(result);
  }
}

export default NotificationController;
