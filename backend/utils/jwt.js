'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'secret_key';


exports.createToken = function(user){
  var payload = {
    sub: user._id,
    username: user.username,
    email: user.email,
    iat: moment().unix(),
    exp: moment().add(15, 'days').unix
  };

  return jwt.encode(payload, secret);
}