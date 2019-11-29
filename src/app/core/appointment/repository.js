import Appointment from '../../models/Appointment';
import User from '../../models/User';

class AppointmentRepository {
  static async store(appointment) {
    const newAppointment = await Appointment.create(appointment);

    return newAppointment;
  }

  static async checkProvider(id) {
    const isProvider = await User.findOne({ where: { id, provider: true }, attributes: ['id'] });

    return isProvider;
  }
}

export default AppointmentRepository;
