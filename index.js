// Place your server entry point code here
// Require express
var express = require('express')
var app = express()

// Express to use built-in body parsernp
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static HTML files
app.use(express.static('./public'));

// Require minimist, set up port with default of 5000
const args = require('minimist')(process.argv.slice(2))
args['port']
const port = args['port'] || process.env.PORT || 5000

// set up help menu
if (args['help']) {
    console.log(`server.js [options]

    --port, -p	Set the port number for the server to listen on. Must be an integer
    between 1 and 65535. Defaults to 5000.

    --debug, -d If set to true, creates endlpoints /app/log/access/ which returns
    a JSON access log from the database and /app/error which throws 
    an error with the message "Error test successful." Defaults to 
    false.

    --log, -l   If set to false, no log files are written. Defaults to true.
    Logs are always written to database.

    --help, -h	Return this message and exit.`)
    exit(EXIT_SUCCESS)
}

// Import necessary coin functions
const coinfuncs = require("./modules/coin.js");

// Start an app server
const server = app.listen(port, () => { 
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

// Get middleware
app.use(require('./src/middleware/mymiddleware.js'))

app.get('/app/', (req, res) => { // Define Checkpoint
    // Respond with status 200
    res.statusCode = 200;
    // Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
});

if (args['log'] == true) {
    const fs = require('fs');
    // Use morgan for logging to files
    // Create a write stream to append (flags: 'a') to a file
    const WRITESTREAM = fs.createWriteStream('access.log', { flags: 'a' });
    // Set up the access logging middleware
    app.use(morgan('accesslog', { stream: WRITESTREAM }));
}

if (args['debug'] == true) {
    // Endpoint to return all records in accesslog
    app.get('/app/log/access', (req, res) => {
        const stmt = db.prepare('SELECT * FROM accesslog').all()
        res.statusCode = 200;
        res.json(stmt);
    });

    //Endpoint to return errors
    app.get('/app/error', (req, res) => {
        throw new Error('Error test successful.')
    });
}

app.use(function(req, res){
    // Default response for any other request
    res.status(404).send('404 NOT FOUND')
});