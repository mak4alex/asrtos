var operation = require('../app/models/operation');
var Mark = require('../app/models/mark').Mark;

exports.testWilsonFormula = function(test){

  var data = {
    "average-demand": 100,
    "cost-unit": 5,
    "const-costs": 20,
    "upkeep-cost": 30
  };

  var answer = {
    "optimal-order": 52,
    "min-costs": 548,
    "regime-supply": 189
  };

  var result = operation.calculateWilson(data);

  var isRight = answer["optimal-order"] == Math.ceil(result["optimal-order"]) &&
      answer["min-costs"] == Math.ceil(result["min-costs"]) &&
      answer["regime-supply"] == Math.ceil(result["regime-supply"]);

  test.ok(isRight, "Wilson formula work right.");

  test.done();
};

exports.testCalculateStoreSquare = function(test){

  var data = {
    "average-demand": 100,
    "mass-unit": 3,
    "rate-ripple": 1.7,
    "shelves-count": 100,
    "shelve-square": 2,
    "time-save": 4,
    "rate-load": 3,
    "loader-width": 2
  };

  var answer = {
    "useful-square": 200,
    "helper-square": 130,
    "load-ship-square": 170,
    "store-square": 1000
  };

  var result = operation.calculateStoreSquare(data);

  var isRight = answer["useful-square"] == Math.ceil(result["useful-square"]) &&
      answer["helper-square"] == Math.ceil(result["helper-square"]) &&
      answer["load-ship-square"] == Math.ceil(result["load-ship-square"]) &&
      answer["store-square"] == Math.ceil(result["store-square"]);

  test.ok(isRight, "Store square calculate right.");
  test.done();
};


exports.testCalculateMarkApathy= function(test){

  var data = {
    "constOwnCost": 20,
    "altOwnCost": 2,
    "altRentCost": 4,
    "turnover": 2
  };

  var apathy = 10;

  var mark = new Mark(data);
  mark.calcApathy();
  var isRight = mark.apathy == apathy;

  test.ok(isRight, "Mark apathy calculate right.");
  test.done();
};

