const passport = require("passport");
const Strategy = require("passport-http").BasicStrategy;

module.exports = (app) => {
  var Users = app.db.models.Users;
  var strategy = new Strategy(
    (email, password, done) => {
    Users.findOne({where: {email: email}})
      .then((user) => {
        if (user) {
          if (user.isValidPassword(password)) {
            return done(null, user);
          }
          return done(null, false);
        }
        return done(null, false);
      })
      .catch((error) => {
        return done(error);
      });
  });
  passport.use(strategy);
  
  return {
    authenticate: () => {
      return passport.authenticate("basic", {
        session: false
      });
    }
  };
};