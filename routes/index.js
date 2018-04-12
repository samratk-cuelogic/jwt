var express = require('express');
var app = express();
var apiRoutes = express.Router();

var UserHome = require('../models/user');
var userCntrl = require('../controllers/user-controller');

var jwt = require('jsonwebtoken');

var config = require('../config');
app.set('superSecret', config.secret);


apiRoutes.post('/authenticate', userCntrl.authenticate);

apiRoutes.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log(token);
    // decode token
    if (token) {
        console.log(token);
        console.log("superSecret : " + app.get('superSecret'));
        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.json({ status: 401, success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        console.log('No token provided.');
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        }); 
    }
});


apiRoutes.get('/', userCntrl.listjson);

apiRoutes.get('/users', userCntrl.listjson);
  

module.exports = apiRoutes;