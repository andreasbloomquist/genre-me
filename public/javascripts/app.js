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

    
	profile();
});

// function to render a template using real data
function render(targetId, templateId, res){
  var tmpl_str = $("#" + templateId).html();
  var compile = _.template(tmpl_str); // returns a function!
  var html_str = compile(res);
  $(targetId).append(html_str);
}

var profile = function(){
	$.get("/current", function(res){
		render("#user-data", "profile-template", res);
	});
}