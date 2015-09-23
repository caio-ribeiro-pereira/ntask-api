module.exports = (sequelize, DataType) => {
  const bcrypt = require("bcrypt");
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
        var salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    classMethods: {
      associate: (models) => {
        Users.hasMany(models.Tasks);
      }
    },
    instanceMethods: {
      isPasswordMatch: (password) => {
        console.log(password);
        console.log(this.password);
        return bcrypt.compareSync(password, this.password);
      }
    }
  });
  return Users;
};