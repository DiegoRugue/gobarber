import { Op } from 'sequelize';
import User from '../../models/User';
import Appointment from '../../models/Appointment';

class ScheduleRepository {
  static async index(providerId, startDay, endDay) {
    const schedules = await Appointment.findAll({
      where: {
        providerId,
        canceledAt: null,
        date: {
          [Op.between]: [startDay, endDay],
        },
      },
      order: ['date'],
    });

    return schedules;
  }

  static async checkProvider(id) {
    const isProvider = await User.findOne({
      where: { id, provider: true },
      attributes: ['id'],
    });

    return isProvider;
  }
}

export default ScheduleRepository;
