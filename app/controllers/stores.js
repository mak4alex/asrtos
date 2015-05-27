var mongoose = require('mongoose'),
    extend = require('util')._extend,
    Store = mongoose.model('Store');


exports.index = function(req, res){
  res.render('services/stores');
};

exports.list = function(req, res){
  Store.find({
    user: {
      _id: req.user.id
    }
  }, function (err, stores) {
    if (err)
      return res.render('500');
    else {
      res.json({ stores: stores });
    }
  });
};

exports.create = function(req, res){
  var store = new Store();
  store.user = req.user;

  store.save(function(err) {
    if (err) {
      res.json({ success: false, message: 'Store was not created.'});
    } else {
      res.json({ success: true, message: 'Store created.' });
    }
  });
};

exports.edit = function(req, res){
  console.log("Edit mark, id: " + req.body.id);
  Store.find({
    id: req.body.id
  }, function(err, store) {
    if (err) {
      res.json({ success: false, message: 'Store was not found.'});
    } else {

      // make sure no one changes the user
      delete req.body.user;
      store = extend(store, req.body);

      store.save(function (err) {
        if (!err) {
          res.json({success: false, message: 'Store was not edit.'});
        }
        else {
          res.json({success: true, message: 'Store was edit.'});
        }
      });
    }
  });
};

exports.delete = function(req, res){
  console.log("Delete store, id: " + req.body.id);
  Store.remove({
    id: req.body.id
  }, function(err, store) {
    if (err) {
      res.json({ success: false, message: 'Store was not deleted.'});
    } else {
      res.json({ success: true, message: 'Store deleted.' });
    }
  });
};