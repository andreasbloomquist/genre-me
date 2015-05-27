$(function(){
	profileRender();
	$("#toggleForm").hide();

	$("#newGenre").on("click", function(e){
		e.preventDefault();
		$("#toggleForm").toggle();
	});

});

var profileRender = function(){
	$.get("/current", function(res){
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

//TODO: Remove refresh hack!!!!!!!!!!!!!
var removeGenre = function(genre){
	var $genre = $(genre).data('id');
	$.post("/remove/" + $genre, function(res){
		console.log("removing")
	}).done(function(){
		location.reload();
	});
};
