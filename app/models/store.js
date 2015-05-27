/**  * Module dependencies.  */
var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment'),
    Schema = mongoose.Schema;

/** * Mark Schema */

var StoreSchema = new Schema({
  title: {
    type: String,
    default: "Нет названия"
  },
  squares: [{
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    }
  }],
  class: {
    type: String,
    default: ''
  },
  orderSize: {
    type: Number,
    default: 0
  },
  supplyRegime: {
    type: Number,
    default: 0
  },
  coordinates: {
    type: String,
    default: '(0;0)'
  },
  transportCosts: {
    type: Number,
    default: 0
  },
  apathy: {
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

/** * Methods */

StoreSchema.methods = {

};

StoreSchema.plugin(autoIncrement.plugin, {
  model: 'Store',
  field: 'id'
});

exports.Store = mongoose.model('Store', StoreSchema);