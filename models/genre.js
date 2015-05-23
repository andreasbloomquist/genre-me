var mongoose = require("mongoose");

var genreSchema = new mongoose.Schema({
	genre_name: {
		type: String,
		required: true,
		index: {
			unique: true
			}
		},
	users: {
		type: Array,
		}
	});

// function to check to see if genre already exists 
genreSchema.statics.findGenre = function (params, cb){
	var genre = this;
	this.findOne({
		genre_name: params.name
	}, function (err, genre){
		if (genre){
			console.log("genre is in the db");
		}
		else if (!genre) {
			console.log("genre is not in db");
		}
	});
};

genreSchema.statics.createGenre = function (params) {
	this.create({
		genre_name: params.name
	})
}

genreSchema.statics

var Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;