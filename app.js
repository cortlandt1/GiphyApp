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
}
//Click function to load gif's onto page

$('button').on('click', function (){
    event.preventDefault()
    let city = $(this).attr("data-city");
    console.log(city)

var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + city + "&api_key=DBXEKdV9GEVi8rfqhgVELojemQkA50g2&limit=10"

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response)
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var cityImage = $("<img>");
        cityImage.attr("src", results[i].images.fixed_height.url);
        gifDiv.append(p)
        gifDiv.append(cityImage);
        $('.cities').prepend(gifDiv)
    }
  });
})
// API KEY : DBXEKdV9GEVi8rfqhgVELojemQkA50g2