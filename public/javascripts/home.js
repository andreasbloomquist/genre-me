$(function(){
	getGenres();

// Sets event listener on the random genre button
	$("#playRandom").on("click", function(e){
		playRandom();
		console.log("random here!")
	});

// Sets event listener on the load more genres button
	$("#loadMore").on("click", function(e){
		loadMore();
		initSC();
		page += 1;
	});

// Scrolls the page when clicked
	$("#pgScroll").on("click", function(e){
		scrollPage();
	});

// In order to target elements created via Underscore templating, I had to chain the event listeners after the page load
}).on("click", ".showUsers", function(e){

// Checks to see if the list of users is open or closed
	if ($(this).hasClass('open')){
		$('.name').remove();
		$(this).removeClass('open');
		$("br").remove();
	} else {
		$(this).addClass("open");
		var genreId = $(this).data("id");
		var target = ".showUsers[data-id|='" + genreId + "']";
		var urlReq = "/genres/" + genreId + "/users";
	
		$.get(urlReq, function(res){
			x = res;
		}).done(function(){
			for (var i = 0; i < x.length; i++){
				var userProfile = "/users/" + x[i]._id + "/profile";
				$(target).append(" <br><a class='name' href='" + userProfile + "'>" + x[i].first_name + "</a>");
			};
		});
	};
});

var theHits;
var topGenres;
var names = [];
var page = 1;

// Function to make get request to find all genres, and then calls function to count the number of likes
var getGenres = function(){
	$.get("/genres/trending", function(res){
		topGenres = res;
		render("#topGenres", "homeTopGenres", topGenres);
	}).done(function(){
		initSC();
	});
};

// function to load more top genres in order of most popular
var loadMore = function(index){
	for (var i=0; i<3; i++){
		var ind = ((page * 3) + i);
		console.log(tops[ind]);
		$("#tops").append(
		"<li><a href='#' class='genre'>" + tops[ind].name + " </a><span>" + tops[ind].likes + " people like this</span></li><li data-id='" + tops[ind].id + "' class='showUsers'> See who likes this</li>");
	};
};

// function to find a random genre
var playRandom = function(){
	var randNum = Math.floor(Math.random() * tops.length);
	var randGenre = tops[randNum].name;
	playSomeSound(randGenre);
};

// Function to scroll the page and to alternate the icon and text at the bottom of the page
var scrollPage = function(){
	if ($("#toggleArrow").hasClass("glyphicon glyphicon-menu-up")){
		$("#toggleArrow").removeClass("glyphicon glyphicon-menu-up");
		$("#toggleArrow").addClass("glyphicon glyphicon-menu-down");
		$("html, body").animate({ scrollTop: $('#header').offset().top }, 250);
		$("#toggleGreet").replaceWith("<h1 id='toggleGreet'>Learn about Genre.me</h1>");
	} else {
		$("html, body").animate({ scrollTop: $('#about').offset().top }, 250);
		$("#toggleArrow").removeClass("glyphicon glyphicon-menu-down");
		$("#toggleArrow").addClass("glyphicon glyphicon-menu-up");
		$("#toggleGreet").replaceWith("<h1 id='toggleGreet'>See top genres</h1>");

	};
};