"use strict";

module.exports = app => {
  app.db.sequelize.sync().done(() => {
    app.listen(app.get("port"), () => {
      console.log(`NTask API - porta ${app.get("port")}`);
    });
  });
};
