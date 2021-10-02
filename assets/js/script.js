// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the 
// date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city


// first step is console log the data from the get api
// identify the names of the weather icon, temperature, humidity, wind speed, uv index

// Var for submit button
var results = document.getElementById("results");
var submitBtn = document.getElementById("submit");  
var weatherIcon = document.querySelectorAll('.weather-icon');
var temp = document.querySelectorAll('.temp');
var humid = document.querySelectorAll('.humid');
var wind = document.querySelectorAll('.wind');
var uvIndex = document.querySelectorAll('.uv-index');

function clearInput () {
  document.getElementById("city-name").value = "";
}

// define function for getting weather
function getWeather () {
  var cityName = document.getElementById("city-name").value;
  clearInput();

  var requestCoord = "http://api.openweathermap.org/geo/1.0/direct?q="+ cityName + "&limit=1&appid=5c0c4fce484144270b0ea96cd07f8e98"
  fetch(requestCoord)
    .then(function(response) {
      return response.json()
    })
    .then(function(data){
      var lat =data[0].lat;
      var lon = data[0].lon;
      
      var requestWeather = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly&appid=5c0c4fce484144270b0ea96cd07f8e98"
      fetch (requestWeather)
        .then(function(response){
          return response.json()
        }) 
        .then(function(data) {
          console.log(data);
          // set variables based on data for:
          // Weather Icon
          // Temperature
          // Humidity
          // Wind Speed
          // UV Index
        }
      )
    })
};

submitBtn.addEventListener('click', function (event) {
  event.preventDefault();
  getWeather();
  results.style.display = "block";
})