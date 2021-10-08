module.exports = app => {
  const Users = app.models.users;

  app.route('/user')
    .all(app.auth.authenticate())
    /**
     * @api {get} /user Exibe usuário autenticado
     * @apiGroup Usuário
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id Id de registro
     * @apiSuccess {String} name Nome
     * @apiSuccess {String} email Email
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "name": "John Connor",
     *      "email": "john@connor.net"
     *    }
     * @apiErrorExample {json} Erro de consulta
     *    HTTP/1.1 412 Precondition Failed
     */
    .get(async (req, res) => {
      try {
        const { id } = req.user;
        const attributes = ['id', 'name', 'email'];
        const options = { attributes };
        const result = await Users.findByPk(id, options);
        if (result) {
          res.json(result);
        } else {
          res.sendStatus(404);
        }
      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    })
    /**
     * @api {delete} /user Exclui usuário autenticado
     * @apiGroup Usuário
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 204 No Content
     * @apiErrorExample {json} Erro na exclusão
     *    HTTP/1.1 412 Precondition Failed
     */
    .delete(async (req, res) => {
      try {
        const { id } = req.user;
        const where = { id };
        await Users.destroy({ where });
        res.sendStatus(204);
      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    });

  /**
   * @api {post} /users Cadastra novo usuário
   * @apiGroup Usuário
   * @apiParam {String} name Nome
   * @apiParam {String} email Email
   * @apiParam {String} password Senha
   * @apiParamExample {json} Entrada
   *    {
   *      "name": "John Connor",
   *      "email": "john@connor.net",
   *      "password": "123456"
   *    }
   * @apiSuccess {Number} id Id de registro
   * @apiSuccess {String} name Nome
   * @apiSuccess {String} email Email
   * @apiSuccess {String} password Senha criptografada
   * @apiSuccess {Date} updated_at Data de atualização
   * @apiSuccess {Date} created_at Data de cadastro
   * @apiSuccessExample {json} Sucesso
   *    HTTP/1.1 200 OK
   *    {
   *      "id": 1,
   *      "name": "John Connor",
   *      "email": "john@connor.net",
   *      "password": "$2a$10$SK1B1",
   *      "updated_at": "2015-09-24T15:46:51.778Z",
   *      "created_at": "2015-09-24T15:46:51.778Z"
   *    }
   * @apiErrorExample {json} Erro no cadastro
   *    HTTP/1.1 412 Precondition Failed
   */
  app.post('/users', async (req, res) => {
    try {
      const result = await Users.create(req.body);
      res.json(result);
    } catch (err) {
      res.status(412).json({ msg: err.message });
    }
  });

};