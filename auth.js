const passport = require("passport");
const Strategy = require("passport-jwt").Strategy;

module.exports = (app) => {
  var Users = app.db.models.Users;
  var jwt = app.libs.config.jwt;
  var strategy = new Strategy(jwt, (payload, done) => {
    Users.findById(payload.sub)
      .then((user) => {
        return done(null, user || false);
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
      return passport.authenticate("jwt", {session: false});
    }
  };
};