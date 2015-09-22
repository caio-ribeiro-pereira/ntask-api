var bcrypt = require("bcrypt");
const SALT = 10;

module.exports = (sequelize, DataType) => {
  var Users = sequelize.define("Users", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        var salt = bcrypt.genSaltSync(SALT);
        var password = user.password;
        user.password = bcrypt.hashSync(password, salt);
      }
    },
    classMethods: {
      associate: (models) => {
        Users.hasMany(models.Tasks);
      }
    },
    instanceMethods: {
      passwordMatch: (password) => {
        return bcrypt.compareSync(password, this.password);
      }
    }
  });
  return Users;
};