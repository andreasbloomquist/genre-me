$(function(){
	//Client side validation to check user form to match entry against genre data
	$(".select").on("change", function(e){
		e.preventDefault();
    	
    	var val=$(".select").val();
    
    	if($.inArray(val, genres) >= 0) {
    		console.log("success")
        	$("#addGenre").removeAttr("disabled");
    	} else {
    		alert("nope");
    	};
	});

	
});
