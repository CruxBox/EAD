"use strict";

var fs = require("fs");
var path = require("path");
var bcrypt = require("bcrypt-nodejs");
var User = require("../models/user");
var jwt = require("../utils/jwt");

function saveUser(req, res) {
  var params = req.body;

  console.log(params);

  if (params.username != null && params.email != null) {
    User.findOne({ email: params.email.toLowerCase() }, (err, user) => {
      if (err) {
        res.status(500).send({ message: "Error in request" });
      } else {
        if (user) {
          res.status(404).send({ message: "User with email already exists" });
        } else {
          var user = new User();
          user.username = params.username;
          user.email = params.email;

          if (params.password) {
            //Encrypt password and save
            bcrypt.hash(params.password, null, null, function (err, hash) {
              user.password = hash;
              console.log(user);
              user.save((err, userStored) => {
                if (err) {
                  res.status(500).send({ message: "Error saving user" });
                } else {
                  if (!userStored) {
                    res.status(404).send({ message: "User NOT saved" });
                  } else {
                    res.status(200).send({ user: userStored });
                  }
                }
              });
            });
          } else {
            res.status(200).send({ message: "Enter password" });
          }
        }
      }
    });
  } else {
    res.status(200).send({ message: "Missing parameters" });
  }
}

function loginUser(req, res) {
  var params = req.body;

  console.log(params);

  var email = params.email;
  var password = params.password;

  // Find the user in the database
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) {
      res.status(500).send({ message: "Error in request" });
    } else {
      if (!user) {
        res.status(404).send({ message: "User does not exist" });
      } else {
        bcrypt.compare(password, user.password, function (err, check) {
          if (check) {
            //Return logged user data
            //Return jwt token
            res.status(200).send({
              token: jwt.createToken(user),
              user_details: user,
            });
          } else {
            console.log(check);
            res.status(404).send({ message: "User could not be logged" });
          }
        });
      }
    }
  });
}

function updateUser(req, res) {
  var userId = req.user._id;
  var update = req.body;

  if (userId != req.user._id) {
    return res
      .status(500)
      .send({ message: "Error: You are not allowed to update this user" });
  }

  User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    console.log(err);
    if (err) {
      res.status(500).send({ message: "Error: User could not be updated" });
    } else {
      if (!userUpdated) {
        res.status(404).send({ message: "User could not be updated" });
      } else {
        res.status(200).send({ user: userUpdated });
      }
    }
  });
}

module.exports = {
  saveUser,
  loginUser,
  updateUser,
};
