$(document).ready(function () {

foods = ["pizza", "spaghetti", "worms", "cereal", "twinkies", "Jack Sparrow", "Guinness"];

// create dem buttons
function createButtons(){
    // clear the buttons so their are no repeats
    $("#buttons").empty();
    // loop through the array
    for (i = 0; i < foods.length; i++) {
        // for each element give it a class, value and a text and display on the DOM
        var gifButton = $("<buttons>");
        gifButton.addClass("btn");
        gifButton.attr("data-value", foods[i]);
        gifButton.text(foods[i]);
        $("#buttons").append(gifButton)
    }
}
// fuck yeah, working.  Need to space them
createButtons();

// set the count to how many returns we want from giphy
var count = 15;

// clicky click click
$(".btn").on("click", function () {
    console.log("something was clicked");
}); // end the click

function displayGif() {
    var food = $(this).attr("data-value");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + food + "&limit=" + count + "&api_key=sCO38OYZoooIJbbII7aEHpaxR3S04J3W";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        
        // clear the div
        $("#showGif").empty();
        // loop through the returned data
        for (i=0; i<count; i++){
            // console.log(response.data[i].rating)
                // create a div, a <p> and <img> for each return
                var myDiv = $("<div>");
                var p = $("<p>").text("Rating: " + response.data[i].rating);
                var giphyImg = $("<img>");

                // set the images attributes
                giphyImg.attr("src", response.data[i].images.downsized_still.url);
				giphyImg.attr("data-still", response.data[i].images.downsized_still.url);
                giphyImg.attr("data-animate", response.data[i].images.original.url);
				giphyImg.attr("data-state", "still");
				giphyImg.attr("class", "gif");

                // append to the div's
                myDiv.append(giphyImg, p);
                // put it on the DOM
                $("#showGif").append(myDiv);
            }
        });
    }// end the function


//  Add buttons from the form, possibly?
$("#add-gif").on("click", function(event) {
    event.preventDefault();
    // Get the new value from the form
    var newWord = $("#gif-input").val().trim();
    // push it to the array
    foods.push(newWord);
    // call teh function to create a button
    createButtons();
    return;
}); // end the click event

// That thing he taught us so a dynamically made button works, cause they didn't work
$(document).on("click", ".btn", displayGif);



}); // end of the document ready
 
// click s for search the name
// show results on the page
// attach 3 data attr to each img, may need a data.state