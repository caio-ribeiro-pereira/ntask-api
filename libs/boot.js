module.exports = (app) => {
  app.db.sequelize.sync({force: true}).done(() => {
    app.listen(app.get("port"), () => {
      if (process.env.NODE_ENV !== "test") {
        console.log(`NTask API - porta ${app.get("port")}`);
      }
    });
  });
};
