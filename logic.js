$(document).ready(function() {

require("dotenv").config();

var api_key = process.env.API_KEY;
//var api_key = require("./key");

            // function walgreensAPI() {
            //     var lat = localStorage.getItem('lat');
            //     var long = localStorage.getItem('long');
            //     var url = 'https://services-qa.walgreens.com/api/stores/search'
            //     var herokuUrl = "https://stark-chamber-44091.herokuapp.com/" + url

            //     var WGobj = {
            //         "apiKey": "4n8VgBaIAcwfqcxWAQSreiniwZAGXltd",
            //         "affId": "storesapi",
            //         "lat": lat,
            //         "lng": long,
            //         "srchOpt": 'fs',
            //         "nxtPrev": '',
            //         "requestType": "locator",
            //         "act": "fndStore",
            //         "view": "fndStoreJSON",
            //         "devinf": '',
            //         "appver": '',
            //     }

            //     $.ajax({
            //         type: "GET",
            //         url: "https://api.salesloft.com/v2/people.json"
            //         // headers: {
            //         //     "Access-Control-Allow-Origin": "*",
            //         // },
            //         // processData: false,
            //         contentType: 'application/json',
            //         data: JSON.stringify(WGobj),
            //     }).done(function(response) {
            //         localStorage.setItem('walgreens', JSON.stringify(response.stores));
            //         // updateDOMwalgreens()
            //         $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
            //   empStartPretty + "</td><tr>");

            //     }).fail(function(jqXHR, textStatus, errorThrown) {
            //         console.log('ERROR', errorThrown)
            //     })
            // }

            var url = "https://api.salesloft.com/v2/people.json";

            // var lat = localStorage.getItem('lat');
            // var long = localStorage.getItem('long');
            //var url = 'https://services-qa.walgreens.com/api/stores/search'
            //var herokuUrl = "https://stark-chamber-44091.herokuapp.com/" + url

            var WGobj = {
                "apiKey": api_key,
                "Names": display_name,
                "Email": email_address,
                "Job Title": title

            }

            $.ajax({
                type: "GET",
                url: url,
                // headers: {
                //     "Access-Control-Allow-Origin": "*",
                // },
                // processData: false,
                contentType: 'application/json',
                data: JSON.stringify(WGobj),
            }).done(function(response) {
                console.log(json.stringify(response))
                var tableArray = [];
            });

            // $.ajax({url:url, method:'GET'})
            //                     .done(function(response){
            //                         consol.log(json.stringify(response))
            //                         var tableArray = [];
            //                         // comes in 3 hours increments...we just want one per day.
            //                         for(var i = (response.list.length - 1); i > 0; i -= 8) {
            //                             that.fWeather.push(response.list[i])
            //                         }
            //                     })
        });