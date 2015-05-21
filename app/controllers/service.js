/** * Module dependencies. */
var mongoose = require('mongoose');
var Carriage = mongoose.model('Carriage');
var Point = mongoose.model('Point');
var operation = require('../models/operation');
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
  Point.find( { user: { _id: req.user.id } }, function (err, points) {
    if (err) return res.render('500');
    res.render('services/4', {
      points: points
    });
  });
};


exports.createPoint = function (req, res) {
  console.log("Point carriage id:" + req.body.id);

  var point = new Point(req.body);
  point.user = req.user;
  console.log(point);
  point.save(function (err) {
    if (err) console.log(err);
    console.log("save point");
    return res.json({});
  });
};

exports.deletePoint = function (req, res) {
  console.log("Deleted point id:" + req.body.id);
  Point.findOne({_id: req.body.id}, function (err, point) {
    point.remove(function () {
      res.json({id: req.body.id});
    });
  });
};


exports.handlePoints = function (req, res) {
  var data = req.body;
  var result = Point.locate(res, data.ids, function(store) {
    res.json(store);
  });
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

    Carriage.count(options.criteria).exec(function (err, count) {
      console.log("count: " + count);
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
    //if (err) console("Carriage not found, it will be created.");

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
      if (err) console.log(err);
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

  console.log(data);
  var results = operation.calculateStoreSquare(data);
  console.log(results);

  res.json(results)
};

exports.handleService3 = function(req, res){
  var data = req.body;
  for (var el in data) {
    data[el] = parseFloat(data[el]);
  }

  console.log(data);
  var results = operation.calculateWilson(data);
  console.log(results);

  res.json(results)
};

