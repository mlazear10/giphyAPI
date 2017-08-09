// this loads the buttons when the page opens
$(function(){
 console.log("page loaded")
 populateButtons(searchArray,'searchButton', '#buttonsArea');
});

var searchArray = ['dog', 'cat', 'bird', 'horse', 'gun'];

//function that populates the buttons
function populateButtons(searchArray, classToAdd, areaToAddTo) {
	$(areaToAddTo).empty();
	for(var i=0; i<searchArray.length ;i++){
		var a = $('<button class="btn btn-success">');
		a.addClass(classToAdd);
		a.attr('data-type', searchArray[i]);
		a.text(searchArray[i]);
		$(areaToAddTo).append(a);
	}
}

// I need to make sure the API information is accurate with the documentation or it will not pull the images correctly
$(document).on('click', '.searchButton', function(){
	 $('#searches').empty();
	 var type = $(this).data('type');
	 console.log(type);
	 var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q="+type+"&limit=10";
	 $.ajax({ url: queryURL, method: 'GET' })
	  .done(function(response){
	  	console.log(response);
	 	for(var i = 0; i < response.data.length; i++){
	 		var searchDiv = $('<div class="search-item">');
	 		//Creates the rating variable for the text
	 		var rating = response.data[i].rating;
	 		var p = $('<p>').text('Rating: ' + rating);
	 		var animated = response.data[i].images.fixed_height.url;
	 		var still = response.data[i].images.fixed_height_still.url;
	 		// created the image tab
	 		var image = $('<img>');
	 		image.attr('src', still);
	 		image.attr('data-still', still);
	 		//this below is equal to the animated variable
	 		image.attr('data-animated', animated);
	 		image.attr('data-state', 'still');
	 		image.addClass('searchImage');
	 		searchDiv.append(p);
	 		searchDiv.append(image);
	 		$('#searches').append(searchDiv);
	 	}
	 })
})

// adjust the fixed and still states of the images
$(document).on('click', '.searchImage', function() {
	// data('data-state') needs to be data-state not state because 
	var state = $(this).attr('data-state');
	if(state == 'still') {
		$(this).attr('src', $(this).data('animated'));
		$(this).attr('data-state', 'animated');
	}
	else {
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state', 'still');
	}
})

// adds the buttons to search array
$('#addSearch').on('click', function(){
	var newSearch = $('input').val().trim();
	searchArray.push(newSearch);
	populateButtons(searchArray, 'searchButton', '#buttonsArea');
	// we have to say retrun false to prevent it from reloading the page
	return false;
})





