import ProviderRepository from './repository';

class ProviderController {
  static async index(req, res) {
    const providers = await ProviderRepository.index();

    res.ok(providers);
  }
}

export default ProviderController;
