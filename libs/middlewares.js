/* eslint no-unused-expressions: 0 */

"use strict";

import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import FSRotator from "file-stream-rotator";
import fs from "fs";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

module.exports = app => {
  fs.existsSync("logs") || fs.mkdirSync("logs");
  app.set("port", 3000);
  app.set("json spaces", 4);
  app.use(morgan("common", {
    stream: FSRotator.getStream({
      filename: "logs/access-%DATE%.log",
      frequency: "daily",
      verbose: false
    })
  }));
  app.use(helmet());
  app.use(cors({
    origin: ["localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
  }));
  app.use(compression());
  app.use(bodyParser.json());
  app.use(app.auth.initialize());
  app.use((req, res, next) => {
    delete req.body.id;
    next();
  });
  app.use(express.static("public"));
};
