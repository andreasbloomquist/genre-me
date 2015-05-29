$(function(){
	// Generates dynamic header on any given page where this file is loaded
	genHeader();

	// Soundcloud function to initiliaze the api
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
// After much research I could only find a way to play 1 song at a time when not searching for playlists
// For performance, I limited the number of results to 5 (50 by default), and I select a random track from the tracks returned.
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
// I found that by turning some of these options off, the widget performed slightly faster.
// NOTE:  Turning iFrame: false sets the widget to use the old style
function playGenre(){
	SC.oEmbed(tracks, {iframe: true, show_artwork: true, auto_play: true, buying: false, download: false, sharing: false, liking: false, show_comments: false}, document.getElementById('player'));
	genCloseBtn();
};

// Function to initialize event listeners based on the genres available on the page
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

// Function to generate a button that will close the soundcloud player when clicked
function genCloseBtn(){
	$("#playerBtn").append("<buton type='button' class='btn btn-default btn-xs' id='closePlayer'><span class='glyphicon glyphicon-remove' id='xClose' aria-hidden='true'></span></button>");
	$("#closePlayer").on("click", function(e){
		e.preventDefault();
		$("iFrame").remove();
		$("#closePlayer").remove();
	});
};