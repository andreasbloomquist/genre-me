var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/genre-app");

module.exports.User = require("./user");
module.exports.Genre = require("./genre");