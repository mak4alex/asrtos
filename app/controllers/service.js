/** * Module dependencies. */
var mongoose = require('mongoose');
var Carriage = mongoose.model('Carriage');
var extend = require('util')._extend;

exports.getService1 = function(req, res){
  res.render('services/1');
};

exports.getService2 = function(req, res){
  res.render('services/2');
};

exports.getService3 = function(req, res){
  res.render('services/3');
};

exports.getService4 = function (req, res) {
  res.render('services/4');
};

exports.getService5 = function (req, res) {
  var page = (req.query.page > 0 ? req.query.page : 1) - 1;
  var perPage = 4;
  var options = {
    perPage: perPage,
    page: page,
    criteria: {
      user: {
        _id: req.user.id
      }
    }
  };

  Carriage.list(options, function (err, carriages) {
    if (err) return res.render('500');

    Carriage.count().exec(function (err, count) {
      res.render('services/5', {
        carriages: carriages,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
};

exports.createCarriage = function (req, res) {
  console.log("Create carriage id:" + req.body.id);
  Carriage.findOne({_id: req.body.id}, function (err, car) {
 //   if (err) console("Carriage not found");

    var carriage = car;
    if (!carriage) {
      carriage = new Carriage(req.body);
      carriage.user = req.user;
    }
    else {
      carriage = extend(carriage, req.body);
    }

    carriage.calculate();
    carriage.save(function (err) {
      if (err) {
        req.flash('error', 'All fields must be filled.');
      } else {
        req.flash('success', 'Carriage successfully added.');
      }
      console.log("save carriage");
      return res.json({});
    });
  });
};

exports.deleteCarriage = function (req, res) {
  console.log("Deleted carriage id:" + req.body.id);
  Carriage.findOne({_id: req.body.id}, function (err, carriage) {
    carriage.remove(function () {
      res.json({id: req.body.id});
    });
  });
};


exports.getService6 = function (req, res) {
  res.render('services/6');
};


exports.handleService1 = function(req, res){
  var data = req.body;
  for (var el in data) {
    data[el] = parseFloat(data[el]);
  }
  var results = {};
  results['useful-square'] = data['shelves-count'] * data['shelve-square'];
  results['helper-square'] = (data['shelves-count'] * data['shelve-square'] / 4) * (data['loader-width'] + 0.6);
  results['load-ship-square'] = data['average-demand'] * data['mass-unit'] / data['rate-load'] * data['rate-ripple'];
  results['store-square'] = 0;
  for (var el in results) {
    results['store-square'] += results[el];
  }

  console.log(data);
  console.log(results);

  res.json(results)
};

exports.handleService3 = function(req, res){
  var data = req.body;
  for (var el in data) {
    data[el] = parseFloat(data[el]);
  }
  var results = {};
  results["optimal-order"] = Math.sqrt(2 * data["average-demand"] * data["const-costs"] / ( data["cost-unit"] * data["upkeep-cost"] / 100 ) );
  results["min-costs"] = Math.sqrt( data["average-demand"] * data["const-costs"] * data["cost-unit"] * data["upkeep-cost"] ) ;
  results["regime-supply"] = results["optimal-order"] / data["average-demand"];

  console.log(data);
  console.log(results);

  res.json(results)
};

