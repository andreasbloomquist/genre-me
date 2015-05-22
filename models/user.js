var mongoose = require("mongoose"),
	bcrypt = require("bcrypt");

var userSchema = new mongoose.Schema({
						first_name: {
							type: String,
							default: ""
						},
						last_name: {
							type: String,
							default: ""
						},
						email: {
							type: String,
							lowercase: true,
							required: true,
							index: {
								unique: true
							}
						},
						passwordDigest: {
							type: String,
							required: true
						},
						bio: {
							type: String,
							default: ""
						},
						birth: {
							type: String,
							default: ""
						},
						// user_genre field would hold an array of objects with ids that point to the genreSchema
						user_genres: {
							type: Array,
							default: []
						}
					});

var User = mongoose.model("User", userSchema);

module.exports = User;