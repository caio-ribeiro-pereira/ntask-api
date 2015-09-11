module.exports = (sequelize, DataType) => {
  var Users = sequelize.define("Users", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataType.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Informe o nome"
        }
      }
    },
    email: {
      type: DataType.STRING,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Informe o email"
        }
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        Users.hasMany(models.Tasks);
      }
    }
  });
  return Users;
};