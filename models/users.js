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
        // Adicionar bcrypt
      }
    },
    classMethods: {
      associate: (models) => {
        Users.hasMany(models.Tasks);
      }
    },
    instanceMethods: {
      isValidPassword: (password) => {
        // Adicionar bcrypt
        return this.password === password;
      }
    }
  });
  return Users;
};