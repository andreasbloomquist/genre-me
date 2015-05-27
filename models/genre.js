var mongoose = require("mongoose");

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
// If the genre exists, then, the user id is pushed into the array of users who like that genre
// If the genre does not exist, then
genreSchema.statics.findAndUpdateGenre = function (params, user){
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

genreSchema.statics.removeUser = function(params, user){
	var query = params;
    var updateQuery = {$pop: {users: user}};
    var options = {safe: true, upsert: true};

    this.findOneAndUpdate(query, updateQuery, function(err, genre){
    	console.log(err, genre);
    });
};

genreSchema.statics.findUserGenres = function (user, cb){
	this.find({users: user}, cb);
}

var Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;