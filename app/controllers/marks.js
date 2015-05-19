var mongoose = require('mongoose');

var Mark = mongoose.model('Mark');

exports.create = function(req, res){
  console.log("Create mark, req.body.constOwnCost: " + req.body.constOwnCost);
  var mark = new Mark(req.body);
  mark.user = req.user;

  mark.save(function(err) {
    if (err) {
      res.json({ success: false, message: 'Mark was not created.'});
    } else {
      res.json({ success: true, message: 'Mark created.' });
    }
  });
};

exports.list = function(req, res){
  Mark.find({
    user: {
      _id: req.user.id
    }
  }, function (err, marks) {
    if (err)
      return res.render('500');
    else {
      res.json({ marks: marks });
    }
  });
};

exports.delete = function(req, res){
  console.log("Delete mark, id: " + req.body.id);
  Mark.remove({
    id: req.body.id
  }, function(err, mark) {
    if (err) {
      res.json({ success: false, message: 'Mark was not deleted.'});
    } else {
      res.json({ success: true, message: 'Mark deleted.' });
    }
  });
};


exports.graphicData = function(req, res){
  console.log("Delete mark, req.body: " + req.body);
  Mark.findOne({
    id: req.body.id
  }, function(err, mark) {
    if (err) {
      res.json({ success: false, message: 'Mark was not found.'});
    } else {
      var result = mark.getGraphicData();
      res.json({ success: true, graphicData: result });
    }
  });
};