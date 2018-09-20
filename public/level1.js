 // $(document).on("click", function() {
 $(window).on("load", function() {
     var stringSimilarity = require('string-similarity');
     let breakdown;
     let breakdown2;
     var wordLength = [];
     let wordLength2;
     let matches;
     var comparisons;

     function runTableQuery() {

         // Here we get the location of the root page.
         // We use this instead of explicitly saying the URL is localhost:8080 because the url will change when we deploy.
         var currentURL = window.location.origin;

         // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
         $.ajax({ url: currentURL + "/api/", method: "GET" })

             //Level 1
             .then(function(jsonData) {

                 // Here we are logging the URL so we have access to it for troubleshooting
                 console.log("------------------------------------");
                 console.log("URL: " + currentURL + "/api/");
                 console.log("------------------------------------");

                 // Here we then log the NYTData to console, where it will show up as an object.
                 var result1 = jsonData.data.map(a => a.display_name);
                 var result2 = jsonData.data.map(a => a.email_address);
                 var result3 = jsonData.data.map(a => a.title);

                 console.log("------------------------------------");

                 //     // Loop through and display each of the customers
                 function displayData() {
                     for (var i = 0; i < result1.length; i++) {

                         //Loops for Names
                         $("#Names ").append("<tr><td>" + result1[i] + "</td><tr>");

                     }

                     //Loops for Emails
                     for (var o = 0; o < result2.length; o++) {


                         $("#Email ").append("<tr><td>" + result2[o] + "</td><tr>");
                     }

                     //Loops for Jobs
                     for (var p = 0; p < result3.length; p++) {

                         $("#Job ").append("<tr><td>" + result3[p] + "</td><tr>");
                     }


                 }
                 displayData();



                 //Level 2
                 function level2() {

                     //Button that initializes code
                     $(document).on("click", "#level2", function() {

                         //Clears previous page data
                         $("#Names").empty();
                         $("#Email").empty();
                         $("#Job").empty();
                         $("#employee-table4 > tbody").empty();
                         $("#employee-table3 > tbody").empty();


                         //Breaks down email addresses
                         let counter = str => {
                             return str.toString().split('').reduce((total, letter) => {
                                 total[letter] ? total[letter]++ : total[letter] = 1;
                                 return total;
                             }, []);
                         }

                         breakdown = counter(result2);
                         //breakdown2 = JSON.stringify(breakdown);


                         //Enables object to be placed on the dom
                         Object.keys(breakdown).forEach(key => { // console.log(key, breakdown[key]) 

                             breakdown2 = ("Character " + key + " :" + " Count " + breakdown[key]);
                             console.log(breakdown2);
                             $("#employee-table2 > tbody").append("<tr><td>" + breakdown2 + "</td><tr>");

                         });



                     });

                 }
                 level2();


                 //Level 3
                 function level3() {

                     //Button that initializes code
                     $(document).on("click", "#level3", function() {

                         //Clears previous page data
                         $("#Names").empty();
                         $("#Email").empty();
                         $("#Job").empty();
                         $("#employee-table2 > tbody").empty();
                         $("#employee-table4 > tbody").empty();

                         var hits = [];
                         //JSON.stringify(hits);
                         var containsAll;
                         var keywords = ["r", "i", "n", "o", "e", "a"]
                         for (var i = 0; i < result2.length; i++) {

                             // Initialize flag -> guess that this product is correct
                             containsAll = true;
                             for (var j = 0; j < keywords.length; j++) {
                                 if (result2[i].indexOf(keywords[j]) === -1) {
                                     // This keyword is not matched -> incorrect product
                                     containsAll = false;
                                     break;
                                 }
                             }

                             // All products has been matched
                             if (containsAll) hits.push(result2[i]);
                         }

                         //Loops through array to organize data for a controllable object
                         hits.forEach(function(str) {

                             wordLength.push(str + "," + " length: " + str.length);


                         });

                         //Groups emails with similar length values closer together
                         function order() {
                             wordLength.sort(function(a, b) {
                                 return a.value - b.value;

                             });
                             //console.log(wordLength);

                         }
                         order();

                         //Send information to Dom
                         for (var i = 0; i < wordLength.length; i++) {

                             console.log(wordLength);

                             $("#employee-table3 > tbody").append("<tr><td>" + wordLength[i] + "</td><tr>");
                         }

                         // });

                     });
                 }

                 level3()

                 //Bonus

                 //Handles all Bonus code
                 function bonus() {

                     //Button that initializes code
                     $(document).on("click", "#bonus", function() {

                         //Clears previous page data
                         $("#Names").empty();
                         $("#Email").empty();
                         $("#Job").empty();
                         $("#employee-table2 > tbody").empty();
                         $("#employee-table3 > tbody").empty();
                         for (var i = 0; i < result1.length; i++) {


                             //Loops throught Email addresses to find possible similarities
                             var matches = stringSimilarity.findBestMatch(result2[i], result2);
                             //console.log(matches.ratings.filter(obj => obj.rating == 1 || obj.rating >= 0.3));


                             //Organizes duplicates into manageable objects
                             comparisons = matches.ratings.filter(obj => obj.rating == 1 || obj.rating >= 0.3);
                             var newObj = Object.assign({}, ...(comparisons.map(item => ({
                                 [item.target]: item.rating
                             }))));

                             console.log(newObj);
                             //console.log(comparisons);


                             //Enables object to be placed on the dom
                             Object.keys(newObj).forEach(key => { // console.log(key, breakdown[key]) 

                                 wordLength2 = ("Employee: " + key + ", " + " Similarity Rating: " + newObj[key]);
                                 console.log(wordLength2);
                                 $("#employee-table4 > tbody").append("<tr><td>" + wordLength2 + "</td><tr>");


                             });

                         }
                     });
                 }
                 bonus();
                 //Button that reshows first page information
                 $(document).on("click", "#level1", function() {

                     //Clears previous page data
                     $("#Names").empty('');
                     $("#Email").empty();
                     $("#Job").empty();
                     $("#employee-table2 > tbody").empty();
                     $("#employee-table3 > tbody").empty();
                     $("#employee-table4 > tbody").empty();

                     runTableQuery();

                 });
             });




     }

     //Starts the engine for the code to work
     runTableQuery();

 });