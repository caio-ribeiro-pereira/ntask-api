module.exports = (sequelize, DataType) => {
  var Tasks = sequelize.define("Tasks", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataType.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Informe a tarefa"
        }
      }
    },
    done: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        Tasks.belongsTo(models.Users);
      }
    }
  });
  return Tasks;
};