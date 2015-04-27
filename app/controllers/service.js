exports.getService1 = function(req, res){
  res.render('services/1');
};

exports.getService2 = function(req, res){
  res.render('services/2');
};

exports.getService3 = function(req, res){
  res.render('services/3');
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