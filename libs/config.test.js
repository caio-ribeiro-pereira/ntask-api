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
  jwtExpires: 86400000, // 1 dia
  jwtSession: {session: false}
};
