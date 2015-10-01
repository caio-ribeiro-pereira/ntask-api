import express from "express";
import consign from "consign";

let app = express();

consign({verbose: false})
  .include(`libs/config.js`)
  .then("db.js")
  .then("auth.js")
  .then("libs/middlewares.js")
  .then("routes")
  .into(app, () => {
    app.db.sequelize.sync({}).done(() => {
      app.listen(app.get("port"), () => {
        if (process.env.NODE_ENV !== "test") {
          console.log(`NTask API - porta ${app.get("port")}`);
        }
      });
    });
  });

module.exports = app;
