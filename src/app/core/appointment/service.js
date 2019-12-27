import { startOfHour, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import AppointmentScope from './scope';
import AppointmentRepository from './repository';
import Notification from '../../schemas/Notification';

class AppointmentService {
  static async store(appointment) {
    await AppointmentScope.store(appointment);

    const { date, providerId, userId } = appointment;

    const isProvider = await AppointmentRepository.checkProvider(providerId);
    if (!isProvider) throw { code: 401, message: 'User is not a provider' };

    const hourStart = startOfHour(date);

    if (isBefore(hourStart, new Date())) throw { code: 400, message: 'Past date are not permitted' };

    const existsAppointment = await AppointmentRepository.checkAppointment(providerId, hourStart);
    if (existsAppointment) throw { code: 400, message: 'Appointment is not available' };

    const result = await AppointmentRepository.store(appointment);

    const userName = await AppointmentRepository.getUserName(userId);
    const formatedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM 'às' H:mm'h'",
      { locale: pt },
    );

    await Notification.create({
      content: `Novo agendamento de ${userName} para ${formatedDate}`,
      user: providerId,
    });

    return result;
  }

  static async delete(id, userId) {
    const appointment = await AppointmentRepository.findById(id);

    if (appointment.user.userId !== userId) {
      throw { code: 401, message: "You don't have permission to cancel this appointment" };
    }

    const dateWithSub = subHours(appointment.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      throw { code: 401, message: 'You can only cancel appointment 2 hours in advance.' };
    }

    appointment.canceledAt = new Date();

    await appointment.save();

    return appointment;
  }
}

export default AppointmentService;
