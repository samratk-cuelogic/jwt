 // =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose'); 
var config = require('./config'); // get our config file 
var apiRoutes = require('./routes/index');
// =======================
// configuration =========
// =======================
var port = process.env.PORT || 3000; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
 
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
// use morgan to log requests to the console
app.use(morgan('dev')); 
 
// API ROUTES -------------------

// get an instance of the router for api routes 


// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// we'll get to these in a second

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Server at http://localhost:' + port);




  
// app.get('/setup', function(req, res) {

//   // create a sample user
//   var setUser = new User({ 
//     name: 'samrat', 
//     password: 'password',
//     admin: true 
//   });

//   // save the sample user
//   setUser.save(function(err) {
//     if (err) throw err;

//     console.log('User saved successfully');
//     res.json({ success: true });
//   });
// });
