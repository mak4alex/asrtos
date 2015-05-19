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
  supply: {
    type: Number,
    default: 0
  },
  rate: {
    type: Number,
    default: 0
  },
  latitude: {
    type: Number,
    default: 0
  },
  longitude: {
    type: Number,
    default: 0
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
PointSchema.path('supply').required(true, 'Point supply cannot be blank');
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

  locate: function ( res, pointsId ) {
    var store = {
      latitude: 0,
      longitude: 0
    };
    var latNumer = 0;
    var latDenom = 0;
    var longNumer = 0;
    var longDenom = 0;
    var temp = 0;

    this.find( {}, function(err, points) {
      for(var i in points) {
        if(pointsId.indexOf(points[i]._id.toString()) != -1) {
          //console.log(points[i]);
          temp = points[i].supply * points[i].rate;
          latNumer += temp * points[i].latitude;
          latDenom += temp;
          longNumer += temp * points[i].longitude;
          longDenom += temp;
        }
      }
      store.latitude = latNumer / latDenom;
      store.longitude = longNumer / longDenom;
      console.log(store);
      res.json(store);
    });
  }
};

mongoose.model('Point', PointSchema);