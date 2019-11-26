import File from '../models/File';

class FileRepository {
  async store(name, path, user) {
    console.log(user);
    const file = await File.create({
      name,
      path,
      userId: user,
    });

    return file;
  }
}

export default new FileRepository();
