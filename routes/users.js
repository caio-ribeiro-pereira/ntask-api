module.exports = (app) => {
  var Users = app.db.models.Users;

  app.route("/users")
    .all((req, res, next) => {
      delete req.body.id;
      next();
    })
    .post((req, res) => {
      Users.create(req.body)
        .then((result) => {
          res.json(result);
        })
        .catch((error) => {
          res.status(412)
            .json({msg: error.message});
        });
    });

};