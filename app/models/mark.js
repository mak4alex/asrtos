/**  * Module dependencies.  */
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;

/** * Mark Schema */

var MarkSchema = new Schema({
  constOwnCost: {
    type: Number,
    default: 0
  },
  altOwnCost: {
    type: Number,
    default: 0
  },
  altRentCost: {
    type: Number,
    default: 0
  },
  turnover: {
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


MarkSchema.pre('save', function(next) {
  var mark = this;

  mark.calcApathy();
  next();
});

/** * Methods */
MarkSchema.methods = {

  calcApathy: function() {
    if (this.altRentCost != this.altOwnCost) {
      this.apathy = this.constOwnCost / (this.altRentCost - this.altOwnCost);
    } else {
      this.apathy = "Ошибка вычисления.";
    }
  },

  getGraphicData: function () {
    var mark = this;

    var result = {
      "volumeCargo" : [],
      "ownCosts" : [],
      "rentCosts" : [],
      "apathy": mark.apathy
    };

    for (var i = 0; i < mark.turnover * 10; i += mark.turnover) {
      result.ownCosts.push(mark.constOwnCost + mark.altOwnCost * i);
      result.rentCosts.push(mark.altRentCost * i);
      result.volumeCargo.push(i);
    }

    return result;
  }

};

MarkSchema.plugin(autoIncrement.plugin, {
  model: 'Mark',
  field: 'id'
});

mongoose.model('Mark', MarkSchema);