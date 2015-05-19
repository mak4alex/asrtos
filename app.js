var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var passport = require('passport');
var config = require('./config/config');

var app = express();
var port = process.env.PORT || config.port;
var mode = process.env.NODE_ENV || 'development';

// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
   var connection = mongoose.connect(config.db, options);
  autoIncrement.initialize(connection);
};

connect();

console.log("Mongoose: " + mongoose.connection.readyState);

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
    if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

// Bootstrap passport config
require('./config/passport')(passport, config);

// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap routes
require('./config/routes')(app, passport);

app.listen(port);
console.log('Express app started on port ' + port);
console.log('In running mode: ' + mode);

module.exports = app;