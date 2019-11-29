import * as Yup from 'yup';

class UserScope {
  static async store(user) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(8),
    });

    await schema.validate(user).catch((err) => {
      throw { code: 400, message: err.errors };
    });
  }

  static async update(user) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(8),
      password: Yup.string().min(8)
        .when('oldPassword', (oldPassword, field) => (oldPassword ? field.required() : field)),
      confirmPassword: Yup.string()
        .when('password', (password, field) => (password ? field.required().oneOf([Yup.ref('password')]) : field)),
    });

    await schema.validate(user).catch(err => {
      throw { code: 400, message: err.errors };
    });
  }
}

export default UserScope;
