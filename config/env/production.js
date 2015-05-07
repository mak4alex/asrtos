/*! * Module dependencies. */

var fs = require('fs');
var env = {};
var envFile = __dirname + '/env.json';

// Read env.json file, if it exists, load the id's and secrets from that
// Note that this is only in the development env
// it is not safe to store id's in files

if (fs.existsSync(envFile)) {
  env = fs.readFileSync(envFile, 'utf-8');
  env = JSON.parse(env);
  Object.keys(env).forEach(function (key) {
    process.env[key] = env[key];
  });
}

/** * Expose */

module.exports = {
  db: 'mongodb://user:123456@ds033831.mongolab.com:33831/asrtos',
  port: 5000,
  google: {
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  vkontakte: {
    clientID: process.env.VKONTAKTE_CLIENTID,
    clientSecret: process.env.VKONTAKTE_SECRET,
    callbackURL: "http://localhost:5000/auth/vkontakte/callback"
  }
};
