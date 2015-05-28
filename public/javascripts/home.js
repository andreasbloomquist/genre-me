$(function(){
	getGenres();

	$("#playRandom").on("click", function(e){
		playRandom();
		console.log("random here!")
	});

	$("#loadMore").on("click", function(e){
		loadMore();
		initSC();
		page += 1;
	});

	$("#pgScroll").on("click", function(e){
		scrollPage();
	});

}).on("click", ".showUsers", function(e){

	if ($(this).hasClass('open')){
		$('.name').remove();
		$(this).removeClass('open');
	} else {

	$(this).addClass("open");
	
	var genreId = $(this).data("id");
	var target = ".showUsers[data-id|='" + genreId + "']";
	var urlReq = "/genres/" + genreId + "/users";
	
	$.get(urlReq, function(res){
		x = res;
	}).done(function(){
		for (var i = 0; i < x.length; i++){
			$(target).append("<li class='name'>" + x[i].first_name + "</li>")
			};
		});
	};
});


var theHits;
var tops = [];
var names = [];
var page = 1;

var getGenres = function(){
	$.get("/genres", function(res){
		theHits = res;
		genreLikes(theHits);
		render("#topGenres", "homeTopGenres", tops);
	}).done(function(){
		initSC();
	});
};

var loadMore = function(index){
	for (var i=0; i<3; i++){
		var ind = ((page * 3) + i);
		console.log(tops[ind]);
		$("#tops").append(
		"<li><a href='#' class='genre'>" + tops[ind].name + " </a><span>" + tops[ind].likes + " people like this</span></li><li data-id='" + tops[ind].id + "' class='showUsers'> See who likes this</li>");
	};
};

var getUsers = function(genreId, target){
	var urlReq = "/genres/" + genreId + "/users";
	$.get(urlReq, function(res){
		x = res;
	}).done(function(){
		render(target, "userLikes", x);
		console.log(x);
	});
};

var playRandom = function(){
	var randNum = Math.floor(Math.random() * tops.length);
	var randGenre = tops[randNum].name;
	playSomeSound(randGenre);
};
var genreLikes = function(items){
	for (var i = 0; i < items.length; i++){
		var item = { id: items[i]._id, name: items[i].name, likes: items[i].users.length}
		tops.push(item);
	};
	tops.sort(compare);
};

function compare(a,b) {
  if (a.likes < b.likes)
    return 1;
  if (a.likes > b.likes)
    return -1;
  return 0;
};

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