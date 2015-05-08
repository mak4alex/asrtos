/**  * Module dependencies.  */
var mongoose = require('mongoose');
var config = require('../../config/config');
var utils = require('../../lib/utils');

var Schema = mongoose.Schema;

/** * Article Schema */

var ArticleSchema = new Schema({
  title: {
    type: String,
    default: '',
    trim: true
  },
  body: {
    type: String,
    default: '',
    trim: true
  },
  short: {
    type: String,
    default: '',
    trim: true
  },
  image: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  comments: [{
    body: {type: String, default: ''},
    user: {type: Schema.ObjectId, ref: 'User'},
    createdAt: {type: Date, default: Date.now}
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**  * Validations */
ArticleSchema.path('title').required(true, 'Article title cannot be blank');
ArticleSchema.path('body').required(true, 'Article body cannot be blank');


ArticleSchema.path('title').validate(function (title) {
  return 4 < title.length && title.length < 25;
}, 'Title has to be 5-24 letters');

/** * Pre-save hook */

ArticleSchema.pre('save', function (next) {
  var length = this.body.length > 100 ? 100 : this.body.length;
  console.log(length);
  this.short = this.body.substr(0, length) + "...";
  next();
});

/** * Methods */
ArticleSchema.methods = {

  /** * Add comment   *
   * @param {User} user
   * @param {Object} comment
   * @param {Function} cb
   * @api private
   */

  addComment: function (user, comment, cb) {
    this.comments.push({
      body: comment.body,
      user: user._id
    });
    this.save(cb);
  },

  /**  * Remove comment   *
   * @param {commentId} String
   * @param {Function} cb
   * @api private
   */

  removeComment: function (commentId, cb) {
    var index = utils.indexof(this.comments, {id: commentId});
    if (~index) this.comments.splice(index, 1);
    else return cb('not found');
    this.save(cb);
  }
};

/** * Statics */
ArticleSchema.statics = {
  /** * Find article by id  *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (id, cb) {
    this.findOne({_id: id})
        .populate('user', 'name email username')
        .populate('comments.user')
        .exec(cb);
  },

  /** * List articles *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  list: function (options, cb) {
    var criteria = options.criteria || {};

    this.find(criteria)
        .populate('user', 'name username')
        .sort({'createdAt': -1}) // sort by date
        .limit(options.perPage)
        .skip(options.perPage * options.page)
        .exec(cb);
  },

  listLastComments: function (articles) {
    var comments = [];
    for(var article in articles) {
      var tempCom = articles[article].comments;
      comments = comments.concat(tempCom)
    }

    comments.sort(function(a, b){
      return b.createdAt - a.createdAt;
    });

    console.log(comments);
    var length = comments.length > 4 ? 5 : comments.length;

    return comments.slice(0, length);
  }
};

mongoose.model('Article', ArticleSchema);
