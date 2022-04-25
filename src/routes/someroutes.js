// Route (endpoint) definitions go in this directory
app.get('/app/flip/', (req, res) => { // Flip a coin and return the result
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

app.get('/app/flips/:number', (req, res) => { // Flip a coin multiple times and return the results
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

app.get('/app/flip/call/heads', (req, res) => { // Flip a coin, call heads, compare result
    // Respond with status 200
    res.statusCode = 200;
       // Use flipACoin function, send json response of results
    res.json(flipACoin('heads'));
});

app.get('/app/flip/call/tails', (req, res) => { // Flip a coin, call heads, compare result
    // Respond with status 200
    res.statusCode = 200;
    // Use flipACoin function, send json response of results
    res.json(flipACoin('tails'));
});
