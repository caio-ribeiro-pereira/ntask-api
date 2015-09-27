import express from "express";
import consign from "consign";

const ENV = process.env.NODE_ENV || "development";
let app = express();

consign()
  .include(`libs/config.${ENV}.js`)
  .then("db.js")
  .then("auth.js")
  .then("libs/middlewares.js")
  .then("routes")
  .then("libs/boot.js")
  .into(app);
