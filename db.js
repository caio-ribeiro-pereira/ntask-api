const Sequelize = require('sequelize');
const config = require('./config');

let sequelize = null;
const {
  db: { database, username, password, params }
} = config;

module.exports = () => {
  if (!sequelize) {
    sequelize = new Sequelize(
      database,
      username,
      password,
      params
    );
  }
  return sequelize;
};