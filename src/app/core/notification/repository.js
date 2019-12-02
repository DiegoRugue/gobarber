import User from '../../models/User';
import Notification from '../../schemas/Notification';

class NotificationRepository {
  static async index(id) {
    const notifications = await Notification.find({
      user: id,
    })
      .sort({ createdAt: 'desc' })
      .limit(10);

    return notifications;
  }

  static async update(id) {
    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true },
    );

    return updatedNotification;
  }

  static async checkProvider(id) {
    const isProvider = await User.findOne({
      where: { id, provider: true },
      attributes: ['id'],
    });

    return isProvider;
  }
}

export default NotificationRepository;
