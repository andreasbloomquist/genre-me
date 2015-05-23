var express = require("express"),
	bodyParser = require("body-parser"),
	bcrypt = require("bcrypt"),
	session = require("express-session"),
	path = require("path"),
	db = require("./models");

var views = path.join(__dirname, "views");

app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
	secret: "Very secret",
	resave: false,
	saveUnitialized: true
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
	}

	req.currentUser = function(cb) {
		var userId = req.session.userId;
		db.User.
			findOne({
				_id: userId
			}, cb);
	};

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
	var profilePath = path.join(views, "profile.html")
	res.sendFile(profilePath);
});

app.get("/genres", function (req, res){
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
				res.redirect("/genres");
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

app.listen(3000, function(){
	console.log("Running! GO CHECK LOCALHOST:3000");
});

// idea: hard code genre list to select from
// todo: come up with a second schema idea
//todo: scrape wiki music genre list
