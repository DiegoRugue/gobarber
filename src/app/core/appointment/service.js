import AppointmentScope from './scope';
import AppointmentRepository from './repository';

class AppointmentService {
  static async store(appointment) {
    await AppointmentScope.store(appointment);

    const isProvider = await AppointmentRepository.checkProvider(appointment.providerId);
    if (!isProvider) throw { code: 401, message: 'User is not a provider' };

    if (appointment.date < new Date()) throw { code: 401, message: 'Date should be bigger than now' };

    const result = await AppointmentRepository.store(appointment);

    return result;
  }
}

export default AppointmentService;
