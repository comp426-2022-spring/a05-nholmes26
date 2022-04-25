// Route (endpoint) definitions go in this directory
var express = require('express')
var app = express()
app.use(express.json());

// Add cors dependency
const cors = require('cors')
// Set up cors middleware on all endpoints
app.use(cors())
// Set up cors middleware on all endpoints
const routing = express.Router();

// Get coin functions
app.use(require('/Users/nathanholmes/github-classroom/comp426-2022-spring/a05-nholmes26/src/controllers/mycontrollers.js'))

routing.route('/app/flip/').get(function (req, res, next) { // Flip a coin and return the result
    // Respond with status 200
    res.statusCode = 200;
    // Flip a coin using the coinFlip() function
    const result = coinFlip();
    // Send json response based of heads or tails from resulting coin flip
    if (result == 'heads') {
        res.json({"flip":"heads"});
    } 
    if (result == 'tails') {
        res.json({"flip":"tails"});
    } 
});

routing.route('/app/flips/:number').get(function (req, res, next) { // Flip a coin multiple times and return the results
    // Respond with status 200
    res.statusCode = 200;
    // Set up variable for number of coin flips, array of results, and counted results
	const flips = req.params.number;
    const results = coinFlips(flips);
    const counted = countFlips(coinFlips(flips));
	// Flip coin "flips" number of times using the coinFlips function, send json response of results
    res.json({"raw":results, "summary":counted});
    // send json response of results
});

routing.route('/app/flip/call/heads').get(function (req, res, next) {  // Flip a coin, call heads, compare result
    // Respond with status 200
    res.statusCode = 200;
       // Use flipACoin function, send json response of results
    res.json(flipACoin('heads'));
});

routing.route('/app/flip/call/tails').get(function (req, res, next) {  // Flip a coin, call heads, compare result
    // Respond with status 200
    res.statusCode = 200;
    // Use flipACoin function, send json response of results
    res.json(flipACoin('tails'));
});

module.exports = routing;