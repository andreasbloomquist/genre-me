var express = require("express"),
	bodyParser = require("body-parser"),
	bcrypt = require("bcrypt"),
	session = require("express-session"),
	path = require("path"),
	db = require("./models");

var views = path.join(__dirname, "views");
var pub = path.join(__dirname, "public");

app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use(session({
	secret: "Very secret",
	resave: true,
	saveUnitialized: false
}));

var loginHelpers = function (req, res, next) {
	req.login = function (user) {
		req.session.userId = user._id;
		req.user = user;
		return user;
	};
	req.logout = function() {
		req.session.userId = null;
		req.user = null;
	};
	req.currentUser = function(cb) {
		var userId = req.session.userId;
		db.User.
			findOne({
				_id: userId
			}, cb);
	};
	// req.findUser = function(cb){
	// 	var user = req.params;
	// 	db.User.findOne(user, cb);
	// };

	next();
};

app.use(loginHelpers);

app.get("/", function (req, res){
	var homePath = path.join(views, "home.html");
	res.sendFile(homePath);
});

app.get("/login", function (req, res){
	var loginPath = path.join(views, "login.html");
	res.sendFile(loginPath);
});

app.get("/signup", function (req, res){
	var signupPath = path.join(views, "signup.html");
	res.sendFile(signupPath);
});

app.get("/profile", function (req, res){
	var profilePath = path.join(views, "profile.html");
	req.currentUser(function(err, user){
		if (user){
			res.sendFile(profilePath);
		} else {
			res.redirect('/login');
		}
	});
});

app.get("/new-genre", function (req, res){
	var genrePath = path.join(views, "genres.html");
	res.sendFile(genrePath);
});

//sign up post
app.post("/users", function (req, res){
	var newUser = req.body.user;
	db.User.
		createSecure(newUser, function (err, user){
			if (user) {
				req.login(user);
				res.redirect("/new-genre");
			} else {
				res.redirect("/signup");
			}
		});
});

//login post
app.post("/login", function (req, res){
	var user = req.body.user;

	db.User.
	authenticate(user,
		function (err, user){
			if (!err) {
				req.login(user);
				res.redirect("/profile");
			} else {
				res.redirect("/login")
			};
		});
});

app.get("/logout", function (req, res){
	req.logout();
	res.redirect("/");
});

// Post genre route
app.post("/genres", function (req, res){
	var genre = req.body.genre;
	var user = req.session.userId;
	console.log(user);
	db.Genre.findAndUpdateGenre(genre, user);
	res.redirect("/profile");
});

app.get("/current", function (req, res){
	req.currentUser(function (err, user){
		res.send(user);
	});
});

// api route to get json for a particular genre._id
app.get("/users/:id/genres", function (req, res){
	var user = req.params.id;
	db.Genre.findUserGenres(user, function(err, genres){
		if (genres) {
			res.send(genres);
		} else {
			res.send("there was an error");
		};
	});
});

app.get("/users/:_id", function (req, res){
	var user = req.params;
	db.User.findOne(user, function(err, user){
		if (user){
			res.send(user);
		} else {
			res.send(504, "there was an error");
		};
	});
});

app.get("/users/:_id/profile", function (req, res){
	var publicPath = path.join(views, "public-profile.html");
	var user = req.params;
	db.User.findOne(user, function(err, user){
		if (user){
			res.sendFile(publicPath);
		};
	});
});

app.post("/remove/:_id", function (req, res){
	var user = req.session.userId;
	var genre = req.params;
	db.Genre.removeUser(genre, user);
	res.send(204);
});

app.get("/genres", function (req, res){
	db.Genre.find({}, function(err, genres){
		res.send(genres);
	});
});

app.get("/genres/:_id/users", function (req, res){
	var genre = req.params;
	console.log(genre);
	db.Genre.find(genre, function(err, genres){
		if (genres){
			var users = genres[0].users;
			console.log(users);
			db.User.find({
				_id: { $in: users }
				}, function(err, users){
				if (users){
					res.send(users);
				};
			});
		};
	});
})

app.listen(3000, function(){
	console.log("Running! GO CHECK LOCALHOST:3000");
});
