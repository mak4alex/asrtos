/**  * Module dependencies.  */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/** * Point Schema */
var PointSchema = new Schema({
  title: {
    type: String,
    default: "",
    trim: true
  },
  address: {
    type: String,
    default: "",
    trim: true
  },
  rate: {
    type: Number,
    default: 0,
    trim: true
  },
  latitude: {
    type: Number,
    default: 0,
    trim: true
  },
  longitude: {
    type: Number,
    default: 0,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**  * Validations */
PointSchema.path('title').required(true, 'Point title cannot be blank');
PointSchema.path('rate').required(true, 'Point rate cannot be blank');
PointSchema.path('latitude').required(true, 'Point latitude cannot be blank');
PointSchema.path('longitude').required(true, 'Point longitude cannot be blank');
PointSchema.path('user').required(true, 'Point must has a user');


/** * Methods */
PointSchema.methods = {

};

/** * Statics */
PointSchema.statics = {
  /** * List points *
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

  locate: function ( points ) {
    var store = {};
    for(var point in points) {

    }
    return store;
  }
};

mongoose.model('Point', PointSchema);