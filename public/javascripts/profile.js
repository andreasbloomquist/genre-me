$(function(){
	profileRender();
	init();

}).on("click", ".remove", function(e){
	e.preventDefault();
	var test = $(this);
	removeGenre(test);
});

var userId;

// Function to setup event listeners for showing/hiding and submitting the add genre form on the users profile page
var init = function(){
	$("#toggleForm").hide();

	$("#newGenre").on("click", function(e){
		$("#toggleForm").toggle();
	});

	$("#toggleForm").on("submit", function(e){
		e.preventDefault();
		var genreParams = $(this).serialize();
		addGenre(genreParams);
	});
};

// Function to render the data for a users profile
var profileRender = function(){
	$.get("/current", function(res){
		var firstName = res.first_name;
		$("#greet").append("<strong>" + firstName + "</strong> profile")
		userId = res._id;
		render("#user-data", "profile-template", res);
		genreRender();
	});
};

// function to render data related to the users genres they have liked
var genreRender = function(){
	var url = "/users/" + userId + "/genres";
		$.get(url).done(function(res){
			test = res;
			render("#user-genres", "profile-genre-template", test);
			initSC();
		});
};

// Function to add a new genre to the users account via ajax, and refresh the genres
var addGenre = function(genreParams){
	$.post("/genres", genreParams).done(function(res){
		genreRender();
	}).done(function(res){
		$("#toggleForm")[0].reset();
	});
};

// Function to remove genre via ajax
var removeGenre = function(genre){
	var $genre = $(genre).data('id');
	console.log($genre)
	$.post("/remove/" + $genre, function(res){
		console.log("removing");
	}).done(function(){
		genreRender();
	});
};
