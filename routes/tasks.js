module.exports = (app) => {
  var Tasks = app.db.models.Tasks;

  app.route("/tasks/:id?")
    .all((req, res, next) => {
      req.params = req.params.id ? req.params : {};
      delete req.body.id;
      next();
    })
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
    })
    .all((req, res, next) => {
      if (req.params.id) {
        next();
      } else {
        res.status(412)
          .json({msg: "id is required"});
      }
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