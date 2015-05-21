
exports.calculateStoreSquare = function(data) {
  var results = {};
  results['useful-square'] = data['shelves-count'] * data['shelve-square'];
  results['helper-square'] = (data['shelves-count'] * data['shelve-square'] / 4) * (data['loader-width'] + 0.6);
  results['load-ship-square'] = data['average-demand'] * data['mass-unit'] / data['rate-load'] * data['rate-ripple'];
  results['store-square'] = 0;
  for (var i in results) {
    results['store-square'] += results[i];
  }
  return results;
};


exports.calculateWilson = function(data) {
  var results = {};
  results["optimal-order"] = Math.sqrt(2 * data["average-demand"] * data["const-costs"] / ( data["cost-unit"] * data["upkeep-cost"] / 100 ) );
  results["min-costs"] = Math.sqrt( data["average-demand"] * data["const-costs"] * data["cost-unit"] * data["upkeep-cost"] ) ;
  results["regime-supply"] = results["optimal-order"] / data["average-demand"] * 365;
  return results;
};