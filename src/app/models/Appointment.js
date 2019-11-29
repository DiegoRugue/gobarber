import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceledAt: Sequelize.DATE,
      },
      {
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'providerId', as: 'provider' });
  }
}

export default Appointment;
