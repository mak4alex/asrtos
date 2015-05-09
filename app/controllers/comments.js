/** * Module dependencies. */
var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/** * Load comment */
exports.load = function (req, res, next, id) {
  var article = req.article;
  utils.findByParam(article.comments, {id: id}, function (err, comment) {
    if (err) return next(err);
    req.comment = comment;
    next();
  });
};

/** * Create comment */
exports.create = function (req, res) {
  var article = req.article;
  var user = req.user;
  console.log(req.body);
  if (!req.body.body) return res.redirect('/news/' + article.id);

  article.addComment(user, req.body, function (err) {
    if (err) return res.render('500');
    res.json({});
  });
};

/** * Delete comment */
exports.destroy = function (req, res) {
  var id = req.body.id;
  console.log("destroy commnet:" + id);
  var article = req.article;
  article.removeComment(id, function (err) {
    if (err) return res.render('500');
    res.json({});
  });
};