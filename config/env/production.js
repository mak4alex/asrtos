/** * Expose */

module.exports = {
  db: 'mongodb://user:123456@ds033831.mongolab.com:33831/asrtos',
  port: 5000,
  google: {
    clientID: "404583651463-05p28gagjg8gm5gunpt5t6hbtm392nut.apps.googleusercontent.com",
    clientSecret: "iuUcJUJh0-hIUVcl5TfMyrGS",
    callbackURL: "https://asrtos.herokuapp.com/auth/google/callback"
  },
  vkontakte: {
    clientID: 4908888,
    clientSecret: 'QCa7Dl6ejPk1zgtMIdI4',
    callbackURL: "https://asrtos.herokuapp.com/auth/vkontakte/callback"
  },
  NODE_PATH: "./config:./app/"
};
