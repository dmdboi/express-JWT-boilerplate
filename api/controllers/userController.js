const User = require("../models/user");
const JWT_Token = require("../helpers/JWTCreate");
const moment = require("moment");

const apiRes = require("../helpers/apiResponse");

exports.signup = (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({ username: username }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, false, { message: "Email is already in use." });
    }
    var newUser = new User();
    newUser.username = username;
    newUser.password = newUser.encryptPassword(password);
    newUser.created_at = moment().toDate();
    newUser.save(function(err, result) {
      if (err) {
        return apiRes.error(res, "An error occured.");
      }
      apiRes.success(res, "User created succesfully");
    });
  });
};

exports.login = (req, res) => {
  User.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length < 1) {
        apiRes.validationError(res, "Incorrect Username");
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          apiRes.validationError(res, "Incorrect Password");
        }
        if (result) {
          const token = JWT_Token.create();
          return apiRes.successWithData(res, "Successful Authorization", token);
        }
        apiRes.validationError(res, "Incorrect Password");
      });
    })
    .catch(err => {
      apiRes.error(res, "An error occured.");
    });
};

exports.getUser = (req, res) => {
  User.find({ username: req.params.username })
    .exec()
    .then(user => {
      return apiRes.successWithData(res, "User found", user[0].username);
    })
    .catch();
};

exports.deleteUser = (req, res, next) => {
  User.remove({ _id: req.params.userID })
    .exec()
    .then(result => {
      apiRes.success(res, "User deleted succesfully");
    })
    .catch(err => {
      console.log(err);
      apiRes.error(res, err);
    });
};
