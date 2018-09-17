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
require("./routes/htmlRoutes")(app);

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
require("dotenv").config();
var request = require('request');
let api_key = process.env.API_KEY;
console.log(api_key);
let axios = require('axios');
let util = require('util');
var filter = require('array-filter');
var stringSimilarity = require('string-similarity');
//const JSON = require('circular-json');
var qs = require('qs');


var names = '',
    Email = '',
    Job = '',
    id = ''

// });
//var newData = [];
//Level 1
var options = {
    url: "https://api.salesloft.com/v2/people.json",
    headers: {
        Authorization: api_key,
        //Authorization: 'Bearer ak_5b70eb70e5e4a76896073d598439139faac91dac64e929e11c879a7550deb9b7',
        contentType: 'application/json'
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode === 200) {
        // console.log(body + "this one");
        // console.log(JSON.parse(body));
        var jsonData = JSON.parse(body);
        // console.log(jsonData.data.display_name);
        var result1 = jsonData.data.map(a => a.display_name);
        var result2 = jsonData.data.map(a => a.email_address);
        var result3 = jsonData.data.map(a => a.title);

        //console.log(result1);


        //};
        //Level 2
        //     let counter = str => {
        //         return str.toString().split('').reduce((total, letter) => {
        //             total[letter] ? total[letter]++ : total[letter] = 1;
        //             return total;
        //         }, {});
        //     };

        //     //console.log(counter(result2));

        //     // console.log("Title: " + jsonData.data.display_name);
        //     // console.log("Year: " + jsonData.display_name);
        //     // console.log("Rated: " + jsonData.email_address);
        //     // console.log("IMDB Rating: " + jsonData.id);

        // } else {
        //     //console.log(error + "no this one")
        // }

        // }

        //Level 3


        for (var i = 0; i < result1.length; i++) {

            var matches = stringSimilarity.findBestMatch(result1[i], result1);
            console.log(matches.ratings.filter(obj => obj.rating == 1 || obj.rating >= 0.3));

        }
        // console.log(matches.ratings.filter( obj => obj.rating == 1))
        //  console.log(matches.ratings.filter(target));
        //if (matches.ratings.target <= 1){
        // 	console.log(matches);
        // }




    }






}


request(options, callback);