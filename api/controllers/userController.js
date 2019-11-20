const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const apiRes = require("../helpers/apiResponse");

exports.signup = (req, res) => {
  console.log(req.body);
  User.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        apiRes.error(res, "User already exists.");
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            apiRes.error(res, "An error occured.");
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                apiRes.success(res, "User created");
              })
              .catch(err => {
                console.log(err);
                apiRes.error(res, "An error occured.");
              });
          }
        });
      }
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
          const token = jwt.sign(
            {
              username: user[0].username,
              userID: user[0]._id
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h"
            }
          );
          return apiRes.successWithData(res, "Successful Authorization", token);
        }
        apiRes.validationError(res, "Incorrect Password");
      });
    })
    .catch(err => {
      console.log(err);
      apiRes.error(res, "An error occured.");
    });
};

exports.getUser = (req, res) => {
  console.log(req.params);
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
