import AppointmentService from './service';
import AppointmentRepository from './repository';

class AppointmentController {
  static async index(req, res) {
    const { page = 1 } = req.query;
    const result = await AppointmentRepository.index(req.userId, page);

    res.ok(result);
  }

  static async store(req, res) {
    const appointment = {
      date: new Date(req.body.date),
      userId: req.userId,
      providerId: req.body.providerId,
    };

    const result = await AppointmentService.store(appointment);

    res.ok(result);
  }
}

export default AppointmentController;
