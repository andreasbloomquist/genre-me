$(function(){
	profileRender();
});

var profileRender = function(){
	var pathArray = window.location.pathname.split( '/' );
	var userId = pathArray[2];
	var url = "/users/" + userId;
	$.get(url, function(res){
		var firstName = res.first_name;
		$("#greet").append("<strong>" + firstName + "</strong> profile")
		var userId = res._id;
		render("#user-data", "profile-template", res);
		var url = "/users/" + userId + "/genres";
		$.get(url).done(function(res){
			test = res;	
			render("#user-genres", "profile-genre-template", test);
			initSC();
		});
	});
};