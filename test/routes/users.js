const jwt = require('jwt-simple');

describe('Routes: Users', () => {
  const Users = app.models.users;
  let token;
  beforeEach(async () => {
    await Users.destroy({ where: {} });
    const user = await Users.create({
      name: 'John',
      email: 'john@mail.net',
      password: '12345'
    });
    token = jwt.encode({ id: user.id }, config.jwt.secret);
  });

  describe('GET /user', () => {
    describe('status 200', () => {
      it('returns an authenticated user', done => {
        request.get('/user')
          .set('Authorization', token)
          .expect(200)
          .end((err, res) => {
            expect(res.body.name).to.eql('John');
            expect(res.body.email).to.eql('john@mail.net');
            done(err);
          });
      });
    });
  });
  
  describe('DELETE /user', () => {
    describe('status 200', () => {
      it('deletes an authenticated user', done => {
        request.delete('/user')
          .set('Authorization', token)
          .expect(204)
          .end(done);
      });
    });
  });
  
  describe('POST /users', () => {
    describe('status 200', () => {
      it('creates a new user', done => {
        request.post('/users')
          .send({
            name: 'Mary',
            email: 'mary@mail.net',
            password: '12345'
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body.name).to.eql('Mary');
            expect(res.body.email).to.eql('mary@mail.net');
            done(err);
          });
      });
    });
  });
});