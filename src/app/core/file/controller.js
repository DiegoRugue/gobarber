import FileRepository from './repository';

class FileController {
  static async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const result = await FileRepository.store(name, path);

    res.ok(result);
  }
}

export default FileController;
