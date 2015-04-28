/*!  * Module dependencies. */
var users = require('../app/controllers/users');
var main = require('../app/controllers/main');
var service = require('../app/controllers/service');
var articles = require('../app/controllers/articles');
var comments = require('../app/controllers/comments');

var auth = require('./middlewares/authorization');
var layout = require('./middlewares/layout');
/** * Route middlewares */
var articleAuth = [auth.requiresLogin, auth.article.hasAuthorization];
var commentAuth = [auth.requiresLogin, auth.comment.hasAuthorization];


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

  app.use(layout.layoutValues);

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

  app.get('/auth/google',
      passport.authenticate('google', {
        failureRedirect: '/login',
        scope: [
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email'
        ]
      }), users.signin);
  app.get('/auth/google/callback',
      passport.authenticate('google', {
        failureRedirect: '/login'
      }), users.authCallback);

  app.get('/auth/vkontakte',
      passport.authenticate('vkontakte', {
        failureRedirect: '/login'
      }), users.signin);
  app.get('/auth/vkontakte/callback',
      passport.authenticate('vkontakte', {
        failureRedirect: '/login'
      }), users.authCallback);

  app.param('userId', users.load);


  // main routes
  app.get('/', main.home );
  app.get('/about', main.about);
  app.get('/services', auth.requiresLogin, main.services);

  // services
  app.get('/services/1', auth.requiresLogin, service.getService1);
  app.get('/services/2', auth.requiresLogin, service.getService2);
  app.get('/services/3', auth.requiresLogin, service.getService3);
  app.get('/services/4', auth.requiresLogin, service.getService4);
  app.get('/services/5', auth.requiresLogin, service.getService5);
  app.get('/services/6', auth.requiresLogin, service.getService6);


  app.post('/services/1', auth.requiresLogin, service.handleService1);
  app.post('/services/3', auth.requiresLogin, service.handleService3);

  app.post('/services/5', auth.requiresLogin, service.createCarriage);
  app.delete('/services/5', auth.requiresLogin, service.deleteCarriage);


  // article routes
  app.param('id', articles.load);
  app.get('/news', articles.index);
  app.get('/news/new', auth.requiresLogin, articles.new);
  app.post('/news', auth.requiresLogin, articles.create);
  app.get('/news/:id', articles.show);
  app.get('/news/:id/edit', articleAuth, articles.edit);
  app.put('/news/:id', articleAuth, articles.update);
  app.delete('/news/:id', articleAuth, articles.destroy);


  // comment routes
  app.param('commentId', comments.load);
  app.post('/news/:id/comments', auth.requiresLogin, comments.create);
  app.get('/news/:id/comments', auth.requiresLogin, comments.create);
  app.delete('/news/:id/comments/:commentId', commentAuth, comments.destroy);


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
