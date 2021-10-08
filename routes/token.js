const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const config = require('../config.js');

module.exports = (app) => {
  const Users = app.models.users;
  const { secret } = config.jwt;
  /**
   * @api {post} /token Autentica usuário e gera um token
   * @apiGroup Credencial
   * @apiParam {String} email Email de usuário
   * @apiParam {String} password Senha de usuário
   * @apiParamExample {json} Entrada
   *    {
   *      "email": "john@connor.net",
   *      "password": "123456"
   *    }
   * @apiSuccess {String} token Token de usuário autenticado
   * @apiSuccessExample {json} Sucesso
   *    HTTP/1.1 200 OK
   *    {"token": "xyz.abc.123.hgf"}
   * @apiErrorExample {json} Erro de autenticação
   *    HTTP/1.1 401 Unauthorized
   */
  app.post('/token', async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const where = { email };
        const user = await Users.findOne({ where });
        if (bcrypt.compareSync(password, user.password)) {
          const payload = { id: user.id };
          const token = jwt.encode(payload, secret);
          return res.json({ token });
        }
      }
      return res.sendStatus(401);
    } catch (err) {
      return res.sendStatus(401);
    }
  });
};