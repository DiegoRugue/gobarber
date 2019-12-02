import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import config from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(config);

    models.forEach(model => model.init(this.connection));
    models.forEach(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb+srv://mongo:mongo@cluster0-oxcb5.mongodb.net/test?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    );
  }
}

export default new Database();
