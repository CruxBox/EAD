'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var User = require('../models/user');
var secret = 'secret_key';

exports.ensureAuth = async function(req, res, next){
  if(!req.headers.authorization){
    return res.status(403).send({message: 'Authentication header missing'});
  }

  var token = req.headers.authorization.split(" ")[1].replace(/['"]+/g, '');

  try{
    var payload = jwt.decode(token, secret);

    if(payload.exp <= moment().unix()){
      return res.status(401).send({message: 'Token is expired'});
    }
  }catch(ex){
    // console.log(ex);
    return res.status(404).send({message: 'Token is not valid'});
  }

  console.log(payload.sub)
  var id = payload.sub;
  await User.findById({_id : id}, (err, user) => {
    if(err){
      res.status(500).send({message: 'Error in request'});
    }else{
      if(!user){
        res.status(404).send({message: 'User does not exist'});
      }else{
        console.log(user);
        req.user = user;
        };
      }
    });

    console.log(req.user);
  //Exit from middleware
  next();
};