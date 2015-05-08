/** * Expose */

module.exports = {
  db: 'mongodb://user:123456@ds033831.mongolab.com:33831/asrtos',
  port: 5000,
  google: {
    clientID: "983540084785-6tgfiotbq5uas7kq4dj4cki8gsvivdck.apps.googleusercontent.com",
    clientSecret: "CqVq46unlnf5I9dp45Pil_Dm",
    callbackURL: "https://asrtos.herokuapp.com/auth/google/callback"
  },
  vkontakte: {
    clientID: 4908888,
    clientSecret: 'QCa7Dl6ejPk1zgtMIdI4',
    callbackURL: "https://asrtos.herokuapp.com/auth/vkontakte/callback"
  },
  NODE_PATH: "./config:./app/"
};
