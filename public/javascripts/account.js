// Autocomplete function using jQuery UI
// Since this function is only needed in two places I extracted it to it's own file so that it can be run only when needed.
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
