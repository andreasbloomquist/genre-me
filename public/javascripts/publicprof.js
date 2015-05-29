$(function(){
	profileRender();
});
var userId;
var url; 
var genreUrl;

// Function to render a public facing profile page
var profileRender = function(){
	var pathArray = window.location.pathname.split( '/' );
	userId = pathArray[2];
	url = "/users/" + userId;
	$.get(url, function(res){
		var firstName = res.first_name;
		$("#greet").append("<strong>" + firstName + "'s</strong> profile");
		$("#showGenres").append("<h3>Genres " + firstName + " likes</h3>")
		render("#user-data", "profile-template", res);
		genreUrl = "/users/" + userId + "/genres";
		$.get(genreUrl).done(function(res){
			test = res;
			render("#user-genres", "profile-genre-template", test);
			initSC();
		});
	});
};