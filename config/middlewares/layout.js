var mongoose = require('mongoose');
var Article = mongoose.model('Article');

exports.layoutValues = function (req, res, next) {
  var options = {
    perPage: 4,
    page: 0
  };

  Article.list(options, function (err, articles) {
    if (err) return res.render('500');
    res.locals.lastArticles = articles;

    next();
  });
};