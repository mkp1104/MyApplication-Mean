// server.js

// BASE SETUP
// =============================================================================
require('newrelic');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/MeanData'); // connect to our database


var Bear = require('./Model/bear');
var UserFormData = require('./Model/FormData');
var cors = require('cors');
// call the packages we need
var express    = require('express')
  , path = require('path')
  , http = require('http')
  , reload = require('reload'); 		// call express
var app = express(); 	
var jwt = require('express-jwt');
var jwtCheck = jwt({
    secret: new Buffer('VVJmcbl20Ex8Xif6qkzCBL2idHVU6k4NQOO9PQ6pDSgmE-avuAF_y11RaBCws7d9', 'base64'),
    audience: 'hGjThwxsOXDlvjSVy0sK2BMP18ooD4Yq'
  });
// var clientDir = path.join(__dirname, 'client')			// define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use('/api/userForm', jwtCheck);
app.use('/api/allUserData', jwtCheck);
app.use(cors());
app.use(bodyParser());

//app.use(app.router); 
  // app.use(express.static(clientDir)); 

var port = process.env.PORT || 8085; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router
//app.use(express.favicon());
//   app.use(express.logger('dev'));
// middleware to use for all requests
router.use(function (req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

// app.get('/', function(req, res) {
  // res.sendfile(path.join(clientDir, 'HomePage.htm'))
// })

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
//router.get('/', function(req, res) {
//	res.json({ message: 'hooray! welcome to our api!' });	
//});

// more routes for our API will happen here

//for InputPage.html edited by Manish!!!!!!!!!!!!
//router.get('/InputPage', function(req, res) {

//res.send('InputPage.htm');
//});
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

router.route('/userForm')

// create a bear (accessed at POST http://localhost:8080/api/bears)
	.post(function (req, res) {
      var userFormData  = new UserFormData(req.body);
      userFormData.candidatename = req.body.candidatename;
      userFormData.comments = req.body.comments;
      userFormData.date = req.body.date;
      userFormData.interviewername = req.body.interviewername;
      userFormData.practiceArea = req.body.practiceArea;
      userFormData.projectname = req.body.projectname;
      userFormData.requester = req.body.requester;
      for(var i = 0;i<req.body.skillsReff1.length;i++)
      {
      userFormData.skillsReff1[i].interviewrating = req.body.skillsReff1[i].interviewrating;
      userFormData.skillsReff1[i].jrssrating = req.body.skillsReff1[i].jrssrating;
      userFormData.skillsReff1[i].name = req.body.skillsReff1[i].name;
      }
      for(var i = 0;i<req.body.skillsReff2.length;i++)
      {
      userFormData.skillsReff2[i].interviewrating = req.body.skillsReff2[i].interviewrating;
      userFormData.skillsReff2[i].jrssrating = req.body.skillsReff2[i].jrssrating;
      userFormData.skillsReff2[i].name = req.body.skillsReff2[i].name;
      }
    
     
	 
	  userFormData.save(function (err) {

    console.log('Debugger save Method');
	    if (err) 
      {
	     res.send(err);
         console.error('ERROR!:at Port:8085');
         console.log('Error log:at Port:8085');
      }else{
	    res.json({ message: 'UserFormData created!' });
      console.log('Console-log Info: Form submmited!!!');
     
      }
	  });

	}).get(function(req, res) {
		UserFormData.find(function(err, userFormData) {
			if (err)
				res.send(err);

			res.json(userFormData);
		});
	});
	//get all user Form Data!!!!
	router.route('/allUserData')
	.get(function(req,res){
	UserFormData.find({},function(error,allUsers){
	if(error)
	res.send(error);
	res.json(allUsers);
	});
	});
	
router.route('/allUserData/:user_id')

// get the userFormData with that id (accessed at GET http://localhost:8080/api/userFormData/:user_id)
	.get(function (req, res) {
	  UserFormData.findById(req.params.user_id, function (err, allUsers) {
	    if (err)
	      res.send(err);
	    res.json(allUsers);
	  });
	})// update the userFormData with this id (accessed at PUT http://localhost:8080/api/userFormData/:user_id)
	.put(function (req, res) {

	  // use our userFormData model to find the userFormData we want
	  UserFormData.findById(req.params.user_id, function (err, allUsers) {

	    if (err)
	      res.send(err);

	    UserFormData.name = req.body.name; 	// update the userFormData info

	    // save the userFormData
	    userFormData.save(function (err) {
	      if (err)
	        res.send(err);

	      res.json({ message: 'userFormData updated!' });
	    });

	  });
	}).delete(function(req, res) {
		UserFormData.remove({
			_id: req.params.user_id
		}, function(err, allUsers) {
			if (err)
				res.send(err);

			res.json({ message: 'userFormData Successfully deleted' });
		});
	});

  


 app.use('/api', router);

// START THE SERVER


var server = http.createServer(app)

reload(server, app)

// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);