import { startOfHour, isBefore } from 'date-fns';
import AppointmentScope from './scope';
import AppointmentRepository from './repository';

class AppointmentService {
  static async store(appointment) {
    await AppointmentScope.store(appointment);

    const { date, providerId } = appointment;

    const isProvider = await AppointmentRepository.checkProvider(providerId);
    if (!isProvider) throw { code: 401, message: 'User is not a provider' };

    const hourStart = startOfHour(new Date(date));

    if (isBefore(hourStart, new Date())) throw { code: 400, message: 'Past date are not permitted' };

    const isAvailable = await AppointmentRepository.checkAppointment(providerId, hourStart);
    if (!isAvailable) throw { code: 400, message: 'Appointment is not available' };

    const result = await AppointmentRepository.store(appointment);

    return result;
  }
}

export default AppointmentService;
