var evaTerms = ["eva01", "eva02", "eva06", "eva00", "eva08", "First Impact", "Shinji Ikari", "Rei Ayanami"];

 function displayGifButtons(){
    $("#gifButtonsView").empty();
    for (var i = 0; i < evaTerms.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("action");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", evaTerms[i]);
        gifButton.text(evaTerms[i]);
        $("#gifButtonsView").append(gifButton);
    }
}
   
    $("#addGif").on("click", function(){
    var evangelion = $("#evangelion-input").val().trim();
    if (evangelion == ""){
        return false;
    }
    evaTerms.push(evangelion);
    
    displayGifButtons();
    return false;
    });
     
     
     function removeLastButton(){
        $("removeGif").on("click", function(){
        evaTerms.pop(evangelion);
        displayGifButtons();
        return false;
        });
     }
     
     function displayGifs() {
        var evangelion = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + evangelion + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response);
            $("#gifsView").empty();
            var results = response.data;
            if (results == ""){
              alert("There isn't a gif for this selected button");
            }
            for (var i=0; i<results.length; i++){
     
                var gifDiv = $("<div>");
                gifDiv.addClass("gifDiv");
     
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
     
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);
     
                $("#gifsView").prepend(gifDiv);
            }
        });
     }
     displayGifButtons();
     //addNewButton();
     removeLastButton();
     
     $(document).on("click", ".evangelion", displayGifs);
     $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
     });

$(document).ready(function(){

   
    displayGifs();
    
    });