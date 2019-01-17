$(document).ready(function () {

foods = ["pizza", "spaghetti", "worms", "cereal", "twinkies", "Jack Sparrow", "Guinness"];

// create dem buttons
function createButtons(){
    $("#buttons").empty();
    for (i = 0; i < foods.length; i++) {
        var gifButton = $("<buttons>");
        gifButton.addClass("btn");
        gifButton.attr("data-value", foods[i]);
        gifButton.text(foods[i]);
        $("#buttons").append(gifButton)
    }
}
// fuck yeah, working.  Need to space them
createButtons();

var count = 15;

// clicky click click
$(".btn").on("click", function () {
    console.log("something was clicked");
    var food = $(this).attr("data-value");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + food + "&limit=" + count + "&api_key=sCO38OYZoooIJbbII7aEHpaxR3S04J3W";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });

}); // end the click
}); // end of the document ready
 
// click s for search the name
// show results on the page
