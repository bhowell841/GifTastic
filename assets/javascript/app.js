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

// clicky click click
$("btn").on("click", function () {
    var food = $(this).attr("data-value");
    var searchWord = "http://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=sCO38OYZoooIJbbII7aEHpaxR3S04J3W"

    $.ajax({
        url: searchWord,
        method: "GET"
    }).done(function(response) {
        console.log(response);
    });

}); // end the click
}); // end of the document ready
 
// click s for search the name
// show results on the page
