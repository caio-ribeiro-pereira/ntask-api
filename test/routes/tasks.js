import PassportStub from "passport-stub";

describe("Routes: Tasks", () => {
  let Users = app.db.models.Users;
  let Tasks = app.db.models.Tasks;

  beforeEach((done) => {
    PassportStub.install(app);

    // AINDA BUGA AQUI
    Users.destroy({where: {}}).then(() => {
      Users.create({
        name: "John",
        email: "john@mail.net",
        password: "12345"
      }).then((user) => {
        PassportStub.login(user);
        Tasks.destroy({where: {}}).then(() => {
          Tasks.bulkCreate([
            {title: "Work", user_id: user.id},
            {title: "Study", user_id: user.id}
          ]).then(() => done());
        });
      });
    });
  });

  describe("GET /tasks", () => {
    it("returns a list of tasks", (done) => {
      request.get("/tasks")
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.length(2);
          expect(res.body[0].title).to.eql("Work");
          expect(res.body[0].done).to.be.false;
          expect(res.body[1].title).to.eql("Study");
          expect(res.body[1].done).to.be.false;
          done(err);
        });
    });
  });
});
