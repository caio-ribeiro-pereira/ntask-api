const passport = require("passport");
const Strategy = require("passport-jwt").Strategy;

module.exports = (app) => {
  let Users = app.db.models.Users;
  let cfg = app.libs.config;
  let strategy = new Strategy(
    {secretOrKey: cfg.jwtSecret},
    (payload, done) => {
    Users.findById(payload.id)
      .then((user) => {
        if (user) {
          return done(null, {
            id: user.id,
            email: user.email
          });
        }
        return done(null, false);
      })
      .catch((error) => {
        return done(error, null);
      });
  });
  passport.use(strategy);

  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate("jwt", cfg.jwtSession);
    }
  };
};
