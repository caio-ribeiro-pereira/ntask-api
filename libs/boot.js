module.exports = (app) => {
  const PORT = 3000;
  app.db.sequelize.sync().done(() => {
    app.listen(PORT, () => {
      console.log(`NTask API - porta ${PORT}`);
    });
  });
};