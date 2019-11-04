import UserService from './service';

class UserController {
  async store(req, res) {
    const result = await UserService.store(req.body);

    res.ok(result);
  }

  async update(req, res) {
    const result = await UserService.update(req.userId, req.body);

    res.ok(result);
  }
}

export default new UserController();
