//Declaring global variables
let topics = ['berlin', 'paris', 'new york city', 'london', 'moscow', 'beijing', 'los angeles', 'lagos', 'delhi', 'shanghai', 'mammoth lakes']

topics.forEach(topic => {
    $('#cityButtons').append(`
    <button type="button" class="btn btn-outline-primary" data-city='${topic}'>${topic}</button>
    `)
});

//Adds new city inputs to array and appends on page
function submitButton () {
    event.preventDefault();
    let newCity = $('#city-input').val();
    topics.push(newCity)
    $('#cityButtons').append(`
    <button type="button" class="btn btn-outline-primary" data-city='${newCity}'>${newCity}</button>`)
    $('#city-input').val('')
    console.log(newCity)
}

//Click function to load gif's onto page
$(document).on('click', 'button', function (){
    event.preventDefault()
    let city = $(this).attr("data-city");
    console.log(city)

var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + city + "&api_key=DBXEKdV9GEVi8rfqhgVELojemQkA50g2&limit=10"

$.ajax({
    url: queryURL,
    method: "GET"
  })

  .then(function(response) {
    console.log(response)
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var cityImage = $("<img class='gif' data-state='still'>");
        var still = cityImage.attr("data-still", results[i].images.fixed_height_still.url);
        var animate = cityImage.attr("data-animate", results[i].images.fixed_height.url);
         var gif = cityImage.attr("src", results[i].images.fixed_height_still.url);
        
        // console.log(image)
        gifDiv.append(p)
        gifDiv.append(cityImage);
        $('.cities').prepend(gifDiv)

//function to play gifs... not working corrrectly yet
}
});
})
      $("body").on("click", ".gif", function() {
          event.preventDefault()
          // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
          var state = $(this).attr("data-state");
          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
          // Then, set the image's data-state to animate
          // Else set src to the data-still value
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });


// API KEY : DBXEKdV9GEVi8rfqhgVELojemQkA50g2