import FileRepository from './repository';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const result = await FileRepository.store(name, path);

    res.ok(result);
  }
}

export default new FileController();
