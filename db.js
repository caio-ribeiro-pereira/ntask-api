const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
let db = null;

module.exports = (app) => {
  if (!db) {
    let config = app.libs.config;
    let sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params
    );
    db = {
      sequelize: sequelize,
      Sequelize: Sequelize,
      models: {}
    };
    let dir = path.join(__dirname, "models");
    fs.readdirSync(dir).forEach((file) => {
      let modelDir = path.join(dir, file);
      let model = sequelize.import(modelDir);
      db.models[model.name] = model;
    });
    Object.keys(db.models).forEach((key) => {
      db.models[key].associate(db.models);
    });
  }
  return db;
};
