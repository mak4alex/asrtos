/** * Module dependencies. */
var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var utils = require('../../lib/utils');
var extend = require('util')._extend;

/** * Load */
exports.load = function (req, res, next, id) {
  var User = mongoose.model('User');

  Article.load(id, function (err, article) {
    if (err) return next(err);
    if (!article) return next(new Error('not found'));
    req.article = article;
    next();
  });
};

/** * List */
exports.index = function (req, res) {
  var page = (req.query.page > 0 ? req.query.page : 1) - 1;
  var perPage = 4;
  var options = {
    perPage: perPage,
    page: page
  };

  Article.list(options, function (err, articles) {
    if (err) return res.render('500');
    var lastComments;
    Article.find( {}, function (err, allArticles) {
      if (err) return res.render('500');
      lastComments = Article.listLastComments(allArticles);
    });

    Article.count().exec(function (err, count) {
      res.render('news/index', {
        articles: articles,
        lastComments: lastComments,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
};

/** * New article */

exports.new = function (req, res) {
  res.render('news/new', {
    title: 'New Article',
    article: new Article({})
  });
};

/** * Create an article */

exports.create = function (req, res) {
  var article = new Article(req.body);


  article.user = req.user;
  article.save(function (err) {
    if (!err) {
      req.flash('success', 'Successfully created article!');
      return res.redirect('/news/' + article._id);
    }
    console.log(err);
    res.render('news/new', {
      title: 'New Article',
      article: article,
      errors: utils.errors(err.errors || err)
    });
  });
};

/**
 * Edit an article
 */

exports.edit = function (req, res) {
  res.render('news/edit', {
    title: 'Edit ' + req.article.title,
    article: req.article
  });
};

/**
 * Update article
 */

exports.update = function (req, res) {
  var article = req.article;

  // make sure no one changes the user
  delete req.body.user;
  article = extend(article, req.body);

  article.save(function (err) {
    if (!err) {
      return res.redirect('/news/' + article._id);
    }
    res.render('news/edit', {
      title: 'Edit Article',
      article: article,
      errors: utils.errors(err.errors || err)
    });
  });
};

/**
 * Show
 */

exports.show = function (req, res) {
  res.render('news/show', {
    title: req.article.title,
    article: req.article
  });
};

/** * Delete an article */
exports.destroy = function (req, res) {
  var article = req.article;
  article.remove(function (err) {
    req.flash('info', 'Deleted successfully');
    res.redirect('/news');
  });
};
