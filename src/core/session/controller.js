import SessionService from './service';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const result = await SessionService.store(email, password);

    res.ok(result);
  }
}

export default new SessionController();
