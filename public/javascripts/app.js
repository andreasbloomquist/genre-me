$(function(){
	genHeader();
	SC.initialize({
		client_id: '719232d49c4024fded182361410ebdf3'
	});
});

var links;
var tracks = [];
var test;

// Reusable function to render data in a template
function render(targetId, templateId, res){
  var tmpl_str = $("#" + templateId).html();
  var compile = _.template(tmpl_str);
  var html_str = compile(res);
  $(targetId).html(html_str);
};

// Function to search SoundClouds api by genre and returns top track within the genre to play
// At end of function playGenre is called which embeds the player
// TODO: Refactor this to be able to select from a list of songs (only one song is able to be played now)
function playSomeSound(genre){
	SC.get("/tracks", {
		genres: genre,
		limit: 5,
	}, function(res){
		var randNum = Math.floor(Math.random()*6);
		tracks = res[randNum].uri;
		playGenre();
	});
};

// Function to embed SoundCloud player with the track selected from playSomeSound()
function playGenre(){
	SC.oEmbed(tracks, {iframe: true, show_artwork: true, auto_play: true, buying: false, download: false, sharing: false, liking: false, show_comments: false}, document.getElementById('player'));
};

// Function to initialize the SC based on the genres available on the page
function initSC(){
	links = $('.genre');
	for (var i = 0; i < links.length; i++){
		var link = links[i];
		link.onclick = function(e){
			e.preventDefault();
			playSomeSound(e.target.innerHTML);
		};
	};
};

// Function to dynamically generate header on all pages depending on whether user is logged in or not 
function genHeader(){
	$.get("/current", function(res){
		if (!res.first_name){
			$("#login-links").append("<li><a href='/login'>log in</a></li>", "<li><a href='/signup'>Signup</a></li>");
		} else {
			$("#login-links").append("<li><a href='/profile'>Hi, " + res.first_name + "</a></li>", "<li><a href='/logout'>logout</a></li>");
		}
	});
};