import UserService from './service';

class UserController {
  async store(req, res, next) {
    const result = await UserService.store(req.body);

    res.ok(result);
  }
}

export default new UserController();
