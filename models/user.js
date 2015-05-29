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
						user_genres: {
							type: Array,
							default: []
						}
					});

var confirm = function (password, passwordConf) {
	return password === passwordConf;
};	

userSchema.statics.createSecure = function (params, cb) {
	var isConfirmed;
	
	isConfirmed = confirm(params.password, params.password_conf);
	
	if (!isConfirmed) {
		return cb("Passwords Should Match", null);
	};

	var that = this;

	bcrypt.hash (params.password, 10, function (err, hash) {
		params.passwordDigest = hash;
		that.create(params, cb);
	});
};

userSchema.statics.authenticate = function(params, cb, cb2) {
 	this.findOne({
		email: params.email
	}, function (err, user) {
		if (user) {
		user.checkPassword(params.password, cb);
		} else if (user === null) {
			cb2();
		};
	});
};

userSchema.methods.checkPassword = function (password, cb) {
	var user = this;
	bcrypt.compare(password,
		user.passwordDigest, function (err, isMatch){
			if (isMatch) {
				cb(null, user);
			} else {
				cb("Oops your password doesnt seem right", null);
			}
		});
};

var User = mongoose.model("User", userSchema);

module.exports = User;