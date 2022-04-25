// Middleware function definitions go here

// Require database
const db = require('./src/services/database.js')

//Middleware
function middleware(req, res, next) {
    let logdata = {
        remoteaddr: req.ip,
        remoteuser: req.user,
        time: Date.now(),
        method: req.method,
        url: req.url,
        protocol: req.protocol,
        httpversion: req.httpVersion,
        secure: req.secure,
        status: res.statusCode,
        referer: req.headers['referer'],
        useragent: req.headers['user-agent']
    }
    const stmt = db.prepare(`INSERT INTO accesslog (remoteaddr, remoteuser, time, method, url, protocol, httpversion, status, referer, useragent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    
    const info = stmt.run(logdata.remoteaddr, logdata.remoteuser, logdata.time,
            logdata.method, logdata.url, logdata.protocol,
            logdata.httpversion, logdata.status,
            logdata.referer, logdata.useragent)
    next();
}

module.exports = middleware