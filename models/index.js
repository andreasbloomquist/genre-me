var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI ||
               process.env.MONGOHQ_URL || 
               "mongodb://localhost/genre-app");

module.exports.User = require("./user");
module.exports.Genre = require("./genre");