require("dotenv").config();

var keys = require("./keys.js");

Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var moment = require("moment");

var command = process.argv[2];


// movie-this
if (command === "movie-this") {

var nodeArgs = process.argv;

var movieName = nodeArgs.slice(3).join("+");


var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log(response.data.Title);
    console.log(response.data.Year);
    console.log(response.data.Ratings[0].Value);
    console.log(response.data.Ratings[1].Value);
    // console.log(response.data);
    // console.log(response.data);
    // console.log(response.data);
    // console.log(response.data);
  })
  .catch(function(error) {
    if (error.response) {
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  });


}



