$(function(){
	profileRender();
	init();

});
var userId;

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

var profileRender = function(){
	$.get("/current", function(res){
		var firstName = res.first_name;
		$("#greet").append("<strong>" + firstName + "</strong> profile")
		userId = res._id;
		render("#user-data", "profile-template", res);
		genreRender();
	});
};

var genreRender = function(){
	var url = "/users/" + userId + "/genres";
		$.get(url).done(function(res){
			test = res;
			render("#user-genres", "profile-genre-template", test);
			initSC();
		});
};

var addGenre = function(genreParams){
	$.post("/genres", genreParams).done(function(res){
		genreRender();
	}).done(function(res){
		$("#toggleForm")[0].reset();
	});
};

var removeGenre = function(genre){
	var $genre = $(genre).data('id');
	console.log($genre)
	$.post("/remove/" + $genre, function(res){
		console.log("removing");
	}).done(function(){
		genreRender();
	});
};
