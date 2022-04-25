// Route (endpoint) definitions go in this directory
const express = require('express')

// Set up cors middleware on all endpoints
const someroutes = require("express").Router();

// Get coin functions
const coins = require('/Users/nathanholmes/github-classroom/comp426-2022-spring/a05-nholmes26/src/controllers/mycontrollers.js')

someroutes.route('/app/flip/').get(function (req, res, next) { // Flip a coin and return the result
    // Respond with status 200
    res.statusCode = 200;
    // Flip a coin using the coinFlip() function
    const result = coins.coinFlip();
    // Send json response based of heads or tails from resulting coin flip
    if (result == 'heads') {
        res.json({"flip":"heads"});
    } 
    if (result == 'tails') {
        res.json({"flip":"tails"});
    } 
});

someroutes.route('/app/flips/:number').get(function (req, res, next) { // Flip a coin multiple times and return the results
    // Respond with status 200
    res.statusCode = 200;
    // Set up variable for number of coin flips, array of results, and counted results
	const flips = req.params.number;
    const results = coins.coinFlips(flips);
    const counted = coins.countFlips(coinFlips(flips));
	// Flip coin "flips" number of times using the coinFlips function, send json response of results
    res.json({"raw":results, "summary":counted});
    // send json response of results
});

someroutes.route('/app/flip/call/heads').get(function (req, res, next) {  // Flip a coin, call heads, compare result
    // Respond with status 200
    res.statusCode = 200;
       // Use flipACoin function, send json response of results
    res.json(coins.flipACoin('heads'));
});

someroutes.route('/app/flip/call/tails').get(function (req, res, next) {  // Flip a coin, call heads, compare result
    // Respond with status 200
    res.statusCode = 200;
    // Use flipACoin function, send json response of results
    res.json(coins.flipACoin('tails'));
});

module.exports = someroutes;