module.exports = (app) => {
  var Tasks = app.db.models.Tasks;

  app.route("/tasks")
    .all(app.auth.authenticate())
    .get((req, res) => {
      Tasks.findAll({where: req.params})
        .then((result) => {
          res.json(result);
        })
        .catch((error) => {
          res.status(412)
            .json({msg: error.message});
        });
    })
    .post((req, res) => {
      Tasks.create(req.body)
        .then((result) => {
          res.json(result);
        })
        .catch((error) => {
          res.status(412)
            .json({msg: error.message});
        });
    });

  app.route("/tasks/:id")
    .all(app.auth.authenticate())
    .get((req, res) => {
      Tasks.findOne({where: req.params})
        .then((result) => {
          res.json(result);
        })
        .catch((error) => {
          res.status(412)
            .json({msg: error.message});
        });
    })
    .put((req, res) => {
      Tasks.update(req.body, {where: req.params})
        .then((result) => {
          res.json(result);
        })
        .catch((error) => {
          res.status(412)
            .json({msg: error.message});
        });
    })
    .delete((req, res) => {
      Tasks.destroy({where: req.params})
        .then((result) => {
          res.json(result);
        })
        .catch((error) => {
          res.status(412)
            .json({msg: error.message});
        });
    });
};