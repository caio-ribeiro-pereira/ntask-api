module.exports = (app) => {
  const jwt = require("jwt-simple");
  var cfg = app.libs.config;
  var Users = app.db.models.Users;

  app.get("/token", (req, res) => {
    if (req.headers.email && req.headers.password) {
      var email = req.headers.email;
      var password = req.headers.password;
      Users.findOne({where: {email: email}})
        .then((user) => {
          if (Users.isPassword(user.password, password)) {
            var payload = {
              id: user.id,
              exp: Date.now() + cfg.jwtExpires
            };
            res.json({
              token: jwt.encode(payload, cfg.jwtSecret)
            });
          } else {
            res.sendStatus(401);
          }
        })
        .catch((error) => {
          res.sendStatus(401);
        });
    } else {
      res.sendStatus(401);
    }
  });
};