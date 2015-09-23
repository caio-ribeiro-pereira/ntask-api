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
          console.log(user.isPasswordMatch(password));
          if (user.isPasswordMatch(password)) {
            var payload = {
              iss: user.id,
              exp: Date.now() + cfg.jwtExpires
            };
            console.log(payload);
            res.json({
              token: jwt.encode(payload, cfg.jwtSecret)
            });
          } else {
            res.status(401)
              .json({msg: "Authentication error"});  
          }
        })
        .catch((error) => {
          res.status(401)
            .json({msg: "Authentication error"});
        });
    } else {
      res.status(401)
        .json({msg: "Authentication error"});
    }
  });
};