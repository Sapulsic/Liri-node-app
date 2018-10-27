require("dotenv").config();

let keysUnlock = require("./keys.js")

var spotify = new Spotify(keys.spotify);

var momentJS = require("moment");
var request = require("request");


var search = process.argv[2];
var term = process.argv.slice(3).join(" ");


switch (search) {
    case "concert-this":

        thisConcert(term);

        break;
    case "spotify-this-song":

        break;
    case "movie-this":

        break;
    case "do-what-it-says" :

    break;

    default:
        break;
}

function thisConcert(term) {

        request(queryURL, function(error, response, body) {

        if (!error && response.statusCode === 200) {


        }
    });
}

function thisMovie(term) {
    var queryURL = "http://www.omdbapi.com/?t=" + term + "&apikey=eaaa83c3";
    request(queryURL, function(error, response, body) {

    if (!error && response.statusCode === 200) {

        console.log("Title of the movie: " + JSON.parse(body).Title);
        console.log("Year the movie came out: " + JSON.parse(body).Year);
        console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).ratings[1].Value);
        console.log("Country where the movie was produced: " + JSON.parse(body).Country);
        console.log("Language of the movie: " + JSON.parse(body).Language);
        console.log("Plot of the movie: " + JSON.parse(body).Plot);
        console.log("Actors in the movie: " + JSON.parse(body).Actors);
    }
}); 
}

function spotifySong(term) {

    request(queryURL, function(error, response, body) {

    if (!error && response.statusCode === 200) {

    }
});
}