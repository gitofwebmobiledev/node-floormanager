// BASE SETUP
// =============================================================================
var jwt    = require('jsonwebtoken');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://abc:abc@ds127564.mlab.com:27564/floormanager');

var User = require('./app/models/user');

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

router.route('/signup')

    // create a bear (accessed at POST http://localhost:8080/api/signup)
    .post(function(req, res) {

        var user = new User(req.body);      // create a new instance of the Bear model

        // save the bear and check for errors
        console.log(user);
        user.save(function(err) {
            if (err) {
              res.send(err);
            }

            var token = jwt.sign({ email: req.body.email }, 'shhhhh');
            res.json({ message: 'user created!', email: req.body.email, token: token });
        });
    });

router.route('/login')
    .post(function(req, res){
        if( (req.body.email == '' || req.body.email == null) || (req.body.password == '' || req.body.password == null)) {
            res.status(405).send('Missing Parameter');
            return;
        }
        User.find({email: req.body.email}, function(err, users) {
          if (err){
              res.status(402).send(err);
              return;
          }
          if (users.length == 0 || users[0].password != req.body.password){
              res.status(404).send('Invalid Credential')
              return;
          }

          var token = jwt.sign({ email: req.body.email }, 'shhhhh');
          res.json({ message: 'user logged in!', email: req.body.email, token: token });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);