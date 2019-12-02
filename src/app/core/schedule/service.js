import { startOfDay, endOfDay } from 'date-fns';
import ScheduleRepository from './repository';

class ScheduleService {
  static async index(schedule) {
    const { id, date } = schedule;

    const isProvider = await ScheduleRepository.checkProvider(id);
    if (!isProvider) throw { code: 401, message: 'User is not a provider' };

    const startDay = startOfDay(date);
    const endDay = endOfDay(date);

    const result = await ScheduleRepository.index(id, startDay, endDay);

    return result;
  }
}

export default ScheduleService;
