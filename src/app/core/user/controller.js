import UserService from './service';

class UserController {
  static async store(req, res) {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatarId: req.body.avatar,
    };
    const result = await UserService.store(user);

    res.ok(result);
  }

  static async update(req, res) {
    const user = {
      id: req.userId,
      name: req.body.name,
      email: req.body.email,
      oldPassword: req.body.oldPassword,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      avatar: req.body.avatar,
    };
    const result = await UserService.update(user);

    res.ok(result);
  }
}

export default UserController;
