
var mongoose = require('mongoose');
var VKontakteStrategy = require('passport-vkontakte').Strategy;
var config = require('../config');
var User = mongoose.model('User');

/**  * Expose */

module.exports = new VKontakteStrategy({
      clientID: config.vkontakte.clientID,
      clientSecret: config.vkontakte.clientSecret,
      callbackURL: config.vkontakte.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      var options = {
        criteria: { 'vkontakte.id': profile.id }
      };
      User.load(options, function (err, user) {
        if (err) return done(err);
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'vkontakte',
            vkontakte: profile._json
          });
          user.save(function (err) {
            if (err) console.log(err);
            return done(err, user);
          });
        } else {
          return done(err, user);
        }
      });
    }
);