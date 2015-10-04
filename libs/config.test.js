module.exports = {
  database: "ntask_test",
  username: "",
  password: "",
  params: {
    dialect: "sqlite",
    storage: "ntask.sqlite",
    logging: false,
    sync: {
      force: true
    },
    define: {
      underscored: true
    }
  },
  jwtSecret: "NTALK_TEST",
  jwtSession: {session: false}
};
