module.exports = (app) => {
  const jwt = require("jwt-simple");
  var cfg = app.libs.config;
  var Users = app.db.models.Users;

  app.post("/token", (req, res) => {
    if (req.body.email && req.body.password) {
      var email = req.body.email;
      var password = req.body.password;
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