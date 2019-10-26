import UserService from './service';

class UserController {
  async store(req, res) {
    const result = await UserService.store(req.body);

    res.ok(result);
  }

  async update(req, res) {
    res.ok('gg');
  }
}

export default new UserController();
