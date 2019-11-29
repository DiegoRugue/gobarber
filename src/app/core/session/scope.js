import * as Yup from 'yup';

class SessionScope {
  static async store(user) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    await schema.validate(user).catch(err => {
      throw { code: 400, message: err.errors };
    });
  }
}

export default SessionScope;
