var express = require('express'),
    logger = require('morgan'),
    cors = require('cors'),
    helmet = require('helmet'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    router = require('./api/routes'),
    config = require('./api/config/config'),
    app = express();

var port = process.env.PORT || 8000;

// Set the secret of the app that will be used in authentication
app.set('secret', config.secret);

// Middleware to log all of the requests that comes to the server
app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Middleware to allow requests from any frontend that is not hosted on the same machine as the server's
app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE']
    })
);

// Middleware to protect the server against common known security vulnerabilities
app.use(helmet());

// Middleware to compress the server json responses to be smaller in size
app.use(compression());

/*
  Middleware to parse the request body that is in format "application/json" or
  "application/x-www-form-urlencoded" as json and make it available as a key on the req
  object as req.body
*/
app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

/*
  Middleware to match the request with one of our defined routes to do a certain function,
  All requests should have /api before writing the route as a convention for api servers
*/

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use('/api', router);

// 500 internal server error handler
app.use(function(err, req, res, next) {
    if (err.statusCode === 404) return next();
    res.status(500).json({
        // Never leak the stack trace of the err if running in production mode
        err: process.env.NODE_ENV === 'production' ? null : err,
        msg: '500 Internal Server Error',
        data: null
    });
});

// 404 error handler
app.use(function(err, req, res) {
    res.status(404).json({
        err: err,
        msg: '404 Not Found',
        data: null
    });
});

app.listen(port, console.log('listening on port: ' + port));
module.exports=app;
