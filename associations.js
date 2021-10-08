module.exports = (app) => {
  const Users = app.models.users;
  const Tasks = app.models.tasks;

  Users.hasMany(Tasks);
  Tasks.belongsTo(Users, { foreignKey: 'userId' });
};
