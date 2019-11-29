import * as Yup from 'yup';

class AppointmentScope {
  static async store(appointment) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      userId: Yup.number().required(),
      providerId: Yup.number().required(),
    });

    await schema.validate(appointment).catch(err => {
      throw { code: 400, message: err.errors };
    });
  }
}

export default AppointmentScope;
