// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================
var path = require('path');
var express = require("express");
var bodyParser = require("body-parser");

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

//require("./routes/apiRoutes")(app);
require("./routing/htmlRoutes")(app);
require("./routing/apiRoutes")(app);
app.use(express.static(__dirname + '/public'));
// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
// require("dotenv").config();
// var request = require('request');
// let api_key = process.env.API_KEY;
// let axios = require('axios');
// let util = require('util');
// var filter = require('array-filter');
// var stringSimilarity = require('string-similarity');
// //const JSON = require('circular-json');
// var qs = require('qs');


