import Sequelize from 'sequelize';
import config from '../config/database';

import User from '../core/models/User';
import File from '../core/models/File';

const models = [User, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(config);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
