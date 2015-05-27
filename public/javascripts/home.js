$(function(){
	getGenres();
});

var theHits;
var tops = [];

var getGenres = function(){
	$.get("/genres", function(res){
		theHits = res;
		genreLikes(theHits);
		render("#topGenres", "homeTopGenres", tops);
	}).done(function(){
		initSC();
	});
};

var genreLikes = function(items){
	for (var i = 0; i < items.length; i++){
		var item = { name: items[i].name, likes: items[i].users.length}
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

