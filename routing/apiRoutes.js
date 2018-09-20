//var theData = require("../data/theData");
require("dotenv").config();
var request = require('request');
let api_key = process.env.API_KEY;
let axios = require('axios');
let util = require('util');
var filter = require('array-filter');


var options = {
    url: "https://api.salesloft.com/v2/people.json",
    headers: {
        Authorization: api_key,
        contentType: 'application/json'
    }
};
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------
    var comparisons;
    var matches;
    var jsonData;
    var result1;
    var stringSimilarity = require('string-similarity');


//api for code to be found
    app.get("/api/", function(req, res) {

        //Gets data from api-key
        function callback(error, response, body) {
            if (!error && response.statusCode === 200) {

                // formulates data pulled from api
                jsonData = JSON.parse(body);

                //pulls specified information from data
                result1 = jsonData.data.map(a => a.display_name);

            }

        }


        //Initializes the request from api-key
        request(options, callback);

        //Sends data to front-end
        res.json(jsonData);




    });




}