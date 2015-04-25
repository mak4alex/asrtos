/** * Expose */

module.exports = {
  db: 'mongodb://localhost/noobjs_test',
  google: {
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  }
};
