require("dotenv").config();

let keysUnlock = require("./keys.js")

var Spotify = require("node-spotify-api")
// var spotify = new Spotify(keysUnlock.spotify);

var momentJS = require("moment");
var request = require("request");

var fs = require("fs")

var search = process.argv;
var order = search[2];
var term = process.argv.slice(3).join(" ");


switch (order) {
    case "concert-this":
            thisConcert(term);
        break;
    case "spotify-this-song":
            spotifySong(term);
        break;
    case "movie-this":
            thisMovie(term);
        break;
    case "do-what-it-says" :
            doWhatItSays();
        break;

    default:
        break;
}

function thisConcert(term) {
    var  bandInTown = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";

    request(bandInTown, function(error, response, body) {
        if (!error && response.statusCode === 200) {


            var concert = JSON.parse(body);
            var randomDate = concert[0].datetime;
            var randomDateFormat = "YYYY/MM/DD/hh:mm:ss";

            var convertedDate = momentJS(randomDate, randomDateFormat);
            var fixedDate = momentJS(convertedDate).format("MM/DD/YYYY");

            console.log("Venue: " + concert[0].venue.name);
            console.log("Venue Location: " + concert[0].venue.city + ", " + concert[0].venue.region );
            console.log("Date: " + fixedDate);


        }
    });
}

function thisMovie(term) {
    var queryURL = "http://www.omdbapi.com/?t=" + term + "&apikey=eaaa83c3";
    request(queryURL, function(error, response, body) {

        if (!term) {
            term = "The Matrix";
        }

        if (!error && response.statusCode === 200) {

            console.log("Title of the movie: " + JSON.parse(body).Title);
            console.log("Year the movie came out: " + JSON.parse(body).Year);
            console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country where the movie was produced: " + JSON.parse(body).Country);
            console.log("Language of the movie: " + JSON.parse(body).Language);
            console.log("Plot of the movie: " + JSON.parse(body).Plot);
            console.log("Actors in the movie: " + JSON.parse(body).Actors);
        }
    });
}

function spotifySong(term) {
    var user = new Spotify(keysUnlock.spotify);

    if (!term) {
        term = "In the End";
    }

    user.search({ type: 'track', query: term }, function (err, data) {

        var songInfo = data.tracks.items;
        console.log("\n");
        console.log("Artist(s): " + songInfo[0].artists[0].name);
        console.log("Song Name: " + songInfo[0].name);
        console.log("Album: " + songInfo[0].album.name);
        console.log("Preview Link: " + songInfo[0].preview_url);
    });

}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data ) {

        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");
        var newSong = dataArr[i];
        spotifySong(newSong);

    });
}