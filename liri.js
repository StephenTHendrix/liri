require("dotenv").config();
var keys = require("./keys.js");
Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var command = process.argv[2];
var fs = require("fs");


function liriControl() {

if (command === "movie-this") {
  movieThis();
}

else if (command === "concert-this") {
  concertThis();
}

else if (command === "spotify-this-song") {
  spotifyThis();
}

else if (command === "do-what-it-says") {
fs.readFile("random.txt", "utf8", function(error, data) {

  if (error) {
    return console.log(error);
  }

  var dataArray = data.split(",");
  console.log(dataArray);
  command = dataArray[0];
  process.argv[3] = dataArray[1];
  liriControl()

});

}





function spotifyThis () {
  var nodeArgs = process.argv;
  var query = nodeArgs.slice(3).join(" ");
  spotify.search({ type: 'track', query: query, limit: 5 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  for (let i = 0; i < data.tracks.items.length; i++) {
    if (data.tracks.items[i].preview_url) {
    console.log(data.tracks.items[i].artists[0].name , data.tracks.items[i].name, data.tracks.items[i].preview_url, data.tracks.items[i].album.name);
    }

    else {
      console.log(data.tracks.items[i].artists[0].name , data.tracks.items[i].name, "No preview available", data.tracks.items[i].album.name);
    }
  }
  });
}

function movieThis () {
var nodeArgs = process.argv;

if (!process.argv[3]) {
  var movieName = "Mr.Nobody"
}

else {
var movieName = nodeArgs.slice(3).join("+");
}

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log(response.data.Title);
    console.log(response.data.Year);
    console.log(response.data.Ratings[0].Value);
    console.log(response.data.Ratings[1].Value);
    console.log(response.data.Country);
    console.log(response.data.Language);
    console.log(response.data.Plot);
    console.log(response.data.Actors);
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

function concertThis() {
  var nodeArgs = process.argv;
  var artist = nodeArgs.slice(3).join("%20");
  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  
  axios.get(queryUrl).then(
    function(response) {

      for (let i = 0; i < response.data.length; i++) {
        console.log(response.data[i].venue.name + ", " + response.data[i].venue.city + ", " + moment(response.data[i].datetime).format("MM/DD/YYYY"))
      }

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

}

liriControl();
