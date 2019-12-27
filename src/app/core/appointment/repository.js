import Appointment from '../../models/Appointment';
import User from '../../models/User';
import File from '../../models/File';

class AppointmentRepository {
  static async index(userId, page) {
    const appointments = await Appointment.findAll({
      where: { userId, canceledAt: null },
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['path', 'url'],
            },
          ],
        },
      ],
    });

    return appointments;
  }

  static async store(appointment) {
    const newAppointment = await Appointment.create(appointment);

    return newAppointment;
  }

  static async findById(id) {
    const appointment = await Appointment.findByPk(id);

    return appointment;
  }

  static async checkProvider(id) {
    const isProvider = await User.findOne({
      where: { id, provider: true },
      attributes: ['id'],
    });

    return isProvider;
  }

  static async getUserName(id) {
    const { name } = await User.findOne({
      where: { id },
      attributes: ['name'],
    });

    return name;
  }

  static async checkAppointment(providerId, date) {
    const existsAppointment = await Appointment.findOne({
      where: {
        providerId,
        canceledAt: null,
        date,
      },
    });

    return existsAppointment;
  }
}

export default AppointmentRepository;
