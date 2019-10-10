require("dotenv").config();

Spotify = require("node-spotify-api");

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);