$(function(){
	var availGenres = genres;
	$(".select").autocomplete({
		source: availGenres,
		select: function(e){
			console.log(e);
			$("#addGenre").removeAttr("disabled");
		}
	});	
});
