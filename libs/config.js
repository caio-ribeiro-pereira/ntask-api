module.exports = {
  database: "ntask",
  username: "",
  password: "",
  params: {
    dialect: "sqlite",
    storage: "ntask.sqlite",
    logging: console.log,
    define: {
      underscored: true
    }
  },
  jwtSecret: "Nta$K-AP1",
  jwtExpires: (86400000 * 7), // 7 dias
  jwtSession: {session: false}
};