/*!  * Module dependencies. */
var users = require('../app/controllers/users');
var main = require('../app/controllers/main');

var auth = require('./middlewares/authorization');

/** * Route middlewares */

//var articleAuth = [auth.requiresLogin, auth.article.hasAuthorization];
//var commentAuth = [auth.requiresLogin, auth.comment.hasAuthorization];

/** * Expose routes */

module.exports = function (app, passport) {
  // set a cookie to requested locale
  app.use(function (req, res, next) {
    console.log(req.query.locale);
    console.log(req.path);
    if (req.query.locale === "ru" || req.query.locale === "en") {
      res.cookie('locale', req.query.locale);
      res.redirect(req.path);
    }
    else {
      next();
    }
  });



  // user routes
  app.get('/login', users.login);
  app.get('/signup', users.signup);
  app.get('/logout', users.logout);
  app.post('/users', users.create);
  app.post('/users/session',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.'
    }), users.session);
  app.get('/users/:userId', users.show);
  app.param('userId', users.load);



  // home route
  app.get('/', main.home );
  app.get('/about', main.about);
  app.get('/blog', main.blog);
  app.get('/services', auth.requiresLogin, main.services);
  app.get('/single-page', main.singlePage);



   /**   * Error handling   */
  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
