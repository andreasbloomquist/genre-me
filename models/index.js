var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/genre_me");

module.exports.User = require("./user");
module.exports.Genre = require("./genre");