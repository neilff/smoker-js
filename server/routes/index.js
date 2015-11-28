function configureRoutes(app) {
  app.get('/', function (req, res) {
    res.render('index');
  });
}

export default configureRoutes;
