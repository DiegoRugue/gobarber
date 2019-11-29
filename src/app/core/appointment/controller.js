import AppointmentService from './service';

class AppointmentController {
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
