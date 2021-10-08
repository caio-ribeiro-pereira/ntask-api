describe('Routes: Token', () => {
  const Users = app.models.users;

  describe('POST /token', () => {
    beforeEach(async () => {
      await Users.destroy({ where: {} });
      await Users.create({
        name: 'John',
        email: 'john@mail.net',
        password: '12345'
      });
    });

    describe('status 200', () => {
      it('returns authenticated user token', done => {
        request.post('/token')
          .send({
            email: 'john@mail.net',
            password: '12345'
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.include.keys('token');
            done(err);
          });
      });
    });

    describe('status 401', () => {
      it('throws error when password is incorrect', done => {
        request.post('/token')
          .send({
            email: 'john@mail.net',
            password: 'SENHA_ERRADA'
          })
          .expect(401)
          .end(done);
      });
      
      it('throws error when email not exists', done => {
        request.post('/token')
          .send({
            email: 'EMAIL_ERRADO',
            password: 'SENHA_ERRADA'
          })
          .expect(401)
          .end(done);
      });

      it('throws error when fields are blank', done => {
        request.post('/token')
          .expect(401)
          .end(done);
      });
    });
  });
});