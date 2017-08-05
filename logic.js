// Page loaded
$(function() {
 console.log("Page loaded");
 renderButtons();
});

//Create array of food buttons
var food = ["Mango", "bananas", "apples", "carrots", "beets", "french fries", "beans"];
var x = food.length;
// test to see if code is written
console.log(x);

// Function for displaying food data
function renderButtons() {
// function renderButtons(searchArray,classToAdd,areaToAddTo) another way to create the function.
    $('#addButton').empty();
    for (var i = 0; i < food.length; i++) {
        $('#addButton').append("<button class='btn btn-successs' type='submit'>" + food[i] + "</button> ");
        }
    }


$("#addFood").on("click", function(event) {
// event.preventDefault() prevents the form from trying to submit itself.
// We're using a form so that the user can hit enter instead of clicking the button if they w ant
 event.preventDefault();

 // sets the var food1 to the value in the html input field
 var food1 = $("#foodInput").val().trim();
 //this pushes the value to the array above
 food.push(food1);
 renderButtons();
 $("#foodInput").val("");
});



// Returns the array to its original setup
$("#reset").on('click', function() {
food = food.slice(0, x);
    renderButtons();
});

//set up the API to call the food giphs - need to finish this API
function displayFoodInfo() {

}




