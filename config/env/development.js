/** * Expose */

module.exports = {
  db: 'mongodb://localhost/noodjs_dev',
  port: 3000,
  google: {
    clientID: "983540084785-7uqrau4fsf98d6a16q8remf8hb6liikh.apps.googleusercontent.com",
    clientSecret: "rNa49dsgdQmUcnrfJSbRsrLH",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  vkontakte: {
    clientID: "4894996",
    clientSecret: "oqknCPvFQ4h54GrbdTtZ",
    callbackURL: "http://localhost:3000/auth/vkontakte/callback"
  },
  NODE_PATH: "./config:./app/"
};
