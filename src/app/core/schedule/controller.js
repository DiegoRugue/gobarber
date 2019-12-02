import ScheduleService from './service';

class ScheduleController {
  static async index(req, res) {
    const schedule = {
      id: req.userId,
      date: new Date(req.query.date),
    };

    const result = await ScheduleService.index(schedule);

    res.ok(result);
  }
}

export default ScheduleController;
