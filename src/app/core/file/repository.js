import File from '../../models/File';

class FileRepository {
  static async store(name, path) {
    const file = await File.create({
      name,
      path,
    });

    return file;
  }
}

export default FileRepository;
