var mongoose = require("mongoose");

// The genre schema consists of two items, a name (of the genre), and the users who have added that genre to their account.
// While users can only enter genres from a hard coded list of genres, since this is a social app I only care about genres that users want to talk about.
// For this reason I created the genre schema
var genreSchema = new mongoose.Schema({
	name: {
		type: String,
		index: {
			unique: true
			}
		},
	users: {
		type: Array,
		}
	});

// function to check to see if genre already exists.
// If the genre exists, then the user id is pushed into the array of users who like that genre
// If the genre does not exist, then
genreSchema.statics.findAndUpdateGenre = function (params, user) {
	var that = this;
	var query = params;
    var updateQuery = {$push: {users: user}};
    var options = {safe: true, upsert: true};

	this.findOneAndUpdate(query, updateQuery, options, function(err, genre){
		if(genre) {
    		console.log("Error:  "  + err + "Update: " + genre);
    		return true;
		} else {
			that.create(params, function(err, genre){
				that.findOneAndUpdate(query, updateQuery, function(err, genre){
					console.log("Error:  "  + err + "Update: " + genre);
				});
			});
		};
	});
};

// Function that removes a user id from the genre
genreSchema.statics.removeUser = function(params, user){
	var query = params;
    var updateQuery = {$pop: {users: user}};
    var options = {safe: true, upsert: true};

    this.findOneAndUpdate(query, updateQuery, function(err, genre){
    	console.log(err, genre);
    });
};

// Function to quickly fird genres associated with a single user
genreSchema.statics.findUserGenres = function (user, cb){
	this.find({users: user}, cb);
}

var Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;