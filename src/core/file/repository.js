import File from '../models/File';

class FileRepository {
  async store(name, path) {
    const file = await File.create({
      name,
      path,
    });

    return file;
  }
}

export default new FileRepository();
