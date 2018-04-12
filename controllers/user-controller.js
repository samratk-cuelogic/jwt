var express = require('express');
var app         = express();
var mongoose = require('mongoose');
var jwt    = require('jsonwebtoken'); 
var BodyParser = require('body-parser');  
var config = require('../config'); 
var User = require('../models/user');
 
app.set('superSecret', config.secret);

exports.index = function(req, res, next) {
    console.log(req.session);
    console.log('your IP is: ' + req.connection.remoteAddress);

    res.send({ status: 200, message: 'your IP is:' + req.connection.remoteAddress });

};

exports.listjson = function(req, res, next) {
    var query = {}; 
    User.find(query, function(err, userList) {
        if (err) {
            console.log('Something went wrong!');
            res.send({ status: 400, msg: 'Something went wrong!' });
        } else {
            res.send({ status: 200, message: 'Records Found!', userList: userList });
        }
    });  
}
 
 
exports.authenticate = function(req, res, next) {

  
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    console.log(user);
     
    if (err) throw err;

    if (!user) {
      res.json({ status: 401,success: false, message: 'Authentication failed. User not found.' });
    } else if (user) { 
      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else { 
        // if user is found and password is right
        // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password
            const payload = {
              admin: user.admin 
            }; 
            var token = jwt.sign(payload, app.get('superSecret'), {
              expiresIn:3600 // expires in  1 hour
            });
        // return the information including token as JSON
        res.json({
          status:200,
          success: true,
          message: 'Success Token generated!',
          token: token
        });
      }    
    } 
  });
}