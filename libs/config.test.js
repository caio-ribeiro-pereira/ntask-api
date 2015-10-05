"use strict";

module.exports = {
  database: "ntask_test",
  username: "",
  password: "",
  params: {
    dialect: "sqlite",
    storage: "ntask_test.sqlite",
    logging: false,
    define: {
      underscored: true
    }
  },
  jwtSecret: "NTALK_TEST",
  jwtSession: {session: false}
};
