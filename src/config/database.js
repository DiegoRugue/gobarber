module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: '5430',
  username: 'postgres',
  password: 'admin',
  database: 'gobarber',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
