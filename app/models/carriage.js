/**  * Module dependencies.  */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/** * Carriage Schema */

var CarriageSchema = new Schema({
  yearDemand: {
    type: Number,
    default: 0,
    trim: true
  },
  unitCost: {
    type: Number,
    default: 0,
    trim: true
  },
  saveCost: {
    type: Number,
    default: 0,
    trim: true
  },
  constCost: {
    type: Number,
    default: 0,
    trim: true
  },
  transRate: {
    type: Number,
    default: 0,
    trim: true
  },
  partySize: {
    type: Number,
    default: 0,
    trim: true
  },
  wayTime: {
    type: Number,
    default: 0,
    trim: true
  },
  stockTime: {
    type: Number,
    default: 0,
    trim: true
  },
  costs: {
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
CarriageSchema.path('yearDemand').required(true, 'Carriage yearDemand cannot be blank');
CarriageSchema.path('unitCost').required(true, 'Carriage unitCost cannot be blank');
CarriageSchema.path('saveCost').required(true, 'Carriage saveCost cannot be blank');
CarriageSchema.path('constCost').required(true, 'Carriage constCost cannot be blank');
CarriageSchema.path('transRate').required(true, 'Carriage transRate cannot be blank');
CarriageSchema.path('partySize').required(true, 'Carriage partySize cannot be blank');
CarriageSchema.path('wayTime').required(true, 'Carriage wayTime cannot be blank');
CarriageSchema.path('stockTime').required(true, 'Carriage stockTime cannot be blank');
CarriageSchema.path('costs').required(true, 'Carriage costs cannot be blank');
CarriageSchema.path('user').required(true, 'Carriage user cannot be blank');


/** * Methods */
CarriageSchema.methods = {

  calculate: function () {
    this.costs = this.yearDemand * this.transRate  +
      this.saveCost / 100 * this.unitCost * this.wayTime * this.yearDemand +
      this.constCost * this.yearDemand / this.partySize +
      this.saveCost / 100 * this.unitCost * this.partySize / 2 +
      this.saveCost / 100 * this.unitCost * this.stockTime * this.yearDemand;

  }
};

/** * Statics */
CarriageSchema.statics = {
  /** * List carriages *
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
  }
};

mongoose.model('Carriage', CarriageSchema);