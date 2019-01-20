$(document).ready(function () {

pirates = ["Anne Bonny", "Blackbeard", "Calico Jack", "Charles Vane", "Captain Flint", "Billy Bones"];

// create dem buttons
function createButtons(){
    // clear the buttons so their are no repeats
    $("#buttons").empty();
    // loop through the array
    for (i = 0; i < pirates.length; i++) {
        // for each element give it a class, value and a text and display on the DOM
        var gifButton = $("<buttons>");
        gifButton.addClass("btn");
        gifButton.attr("data-value", pirates[i]);
        gifButton.text(pirates[i]);
        $("#buttons").append(gifButton)
    }
}
// fuck yeah, working.  Need to space them
createButtons();

// set the count to how many returns we want from giphy
var count = 10;

// clicky click click
$(".btn").on("click", function () {
    console.log("something was clicked");
}); // end the click

function displayGif() {
    var pirate = $(this).attr("data-value");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + pirate + "&limit=" + count + "&api_key=sCO38OYZoooIJbbII7aEHpaxR3S04J3W";

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
				giphyImg.attr("data-state", "still"); // try changing this to true
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
    pirates.push(newWord);
    // call teh function to create a button
    createButtons();
    return;
}); // end the click event



// Animate the img
function animate() {
    // set the variable state to the data-state attribute
    var state = $(this).attr("data-state");

    // if the state is still change the attribute to animate and show the gif
    if (state === "still") {
        var gifImage = $(this).attr("data-animate");
        $(this).attr("src", gifImage);
		$(this).attr("data-state", "animate");
        }
        
    // if the state is animate change the attribute to still and show the still
    else if (state === "animate") {
        var still = $(this).attr("data-still");
        $(this).attr("src", still);
        $(this).attr("data-state", "still");
    }  
} // end function

// That thing he taught us so a dynamically made button works, cause they didn't work
$(document).on("click", ".btn", displayGif);
// Click on the gif to animate 
$(document).on("click", ".gif", animate);


}); // end of the document ready
 
