module.exports = (app) => {
  app.post("/login", (req, res) => {
    // Incluir logica de login para retorno JWT
    res.json({status: "NTask API"});
  });
};