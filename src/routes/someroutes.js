// Route (endpoint) definitions go in this directory
// Add cors dependency
const cors = require('cors')
// Set up cors middleware on all endpoints
app.use(cors())
const routes = express.Router();

// Get coin functions
app.use(require('./src/controllers/mycontrollers.js'))

routes.route('/app/flip/').get(function (req, res, next) { // Flip a coin and return the result
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

routes.route('/app/flips/:number').get(function (req, res, next) { // Flip a coin multiple times and return the results
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

routes.route('/app/flip/call/heads').get(function (req, res, next) {  // Flip a coin, call heads, compare result
    // Respond with status 200
    res.statusCode = 200;
       // Use flipACoin function, send json response of results
    res.json(flipACoin('heads'));
});

routes.route('/app/flip/call/tails').get(function (req, res, next) {  // Flip a coin, call heads, compare result
    // Respond with status 200
    res.statusCode = 200;
    // Use flipACoin function, send json response of results
    res.json(flipACoin('tails'));
});

module.exports = routes;