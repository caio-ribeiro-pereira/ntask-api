const jwt = require('jwt-simple');

describe('Routes: Tasks', () => {
  const Users = app.models.users;
  const Tasks = app.models.tasks;
  let token;
  let fakeTask;

  beforeEach(async () => {
    await Users.destroy({where: {}});
    const user = await Users.create({
      name: 'John',
      email: 'john@mail.net',
      password: '12345'
    });
    await Tasks.destroy({ where: {} });
    const tasks = await Tasks.bulkCreate([
      { id: 1, title: 'Work', userId: user.id },
      { id: 2, title: 'Study', userId: user.id }
    ]);
    fakeTask = tasks[0];
    token = jwt.encode({ id: user.id }, config.jwt.secret);
  });

  describe('GET /tasks', () => {
    describe('status 200', () => {
      it('returns a list of tasks', done => {
        request.get('/tasks')
          .set('Authorization', token)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.length(2);
            expect(res.body[0].title).to.eql('Work');
            expect(res.body[1].title).to.eql('Study');
            done(err);
          });
      });
    });
  });

  describe('POST /tasks', () => {
    describe('status 200', () => {
      it('creates a new task', done => {
        request.post('/tasks')
          .set('Authorization', token)
          .send({title: 'Run'})
          .expect(200)
          .end((err, res) => {
            expect(res.body.title).to.eql('Run');
            expect(res.body.done).to.be.false;
            done(err);
          });
      });
    });
  });

  describe('GET /tasks/:id', () => {
    describe('status 200', () => {
      it('returns one task', done => {
        request.get(`/tasks/${fakeTask.id}`)
          .set('Authorization', token)
          .expect(200)
          .end((err, res) => {
            expect(res.body.title).to.eql('Work');
            done(err);
          });
      });
    });
    describe('status 404', () => {
      it('throws error when task not exist', done => {
        request.get('/tasks/0')
          .set('Authorization', token)
          .expect(404)
          .end(done);
      });
    });
  });

  describe('PUT /tasks/:id', () => {
    describe('status 204', () => {
      it('updates a task', done => {
        request.put(`/tasks/${fakeTask.id}`)
          .set('Authorization', token)
          .send({ title: 'Travel', done: true })
          .expect(204)
          .end(done);
      });
    });
  });

  describe('DELETE /tasks/:id', () => {
    describe('status 204', () => {
      it('removes a task', done => {
        request.delete(`/tasks/${fakeTask.id}`)
          .set('Authorization', token)
          .expect(204)
          .end(done);
      });
    });
  });
});