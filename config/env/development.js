/** * Expose */

module.exports = {
  db: 'mongodb://localhost/noodjs_dev',
  port: 3000,
  google: {
    clientID: "404583651463-1fs69p5om3jqvtbv4tm3kabv2k7afk4r.apps.googleusercontent.com",
    clientSecret: "MQpE_k0GNLLnGvKctAAmtXBD",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  vkontakte: {
    clientID: "4894996",
    clientSecret: "oqknCPvFQ4h54GrbdTtZ",
    callbackURL: "http://localhost:3000/auth/vkontakte/callback"
  },
  NODE_PATH: "./config:./app/"
};
