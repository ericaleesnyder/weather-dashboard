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
var weatherIcon = document.getElementsByClassName('weather-icon');
var temp = document.querySelectorAll('.temp');
var humid = document.querySelectorAll('.humid');
var wind = document.querySelectorAll('.wind');
var uvIndex = document.getElementById('uv-index');
var cityName = document.getElementById("city-name");
var nameHeader = document.getElementById("name-header");

function clearInput () {
  document.getElementById("city-name").value = "";
}

function getWeather () {
  var cityName = document.getElementById("city-name").value;
  clearInput();

  nameHeader.innerHTML=cityName;
  
  var requestCoord = "http://api.openweathermap.org/geo/1.0/direct?q="+ cityName + "&limit=1&appid=5c0c4fce484144270b0ea96cd07f8e98"
  fetch(requestCoord)
  .then(function(response) {
    return response.json()
  })
    .then(function(data){
      var lat =data[0].lat;
      var lon = data[0].lon;
      
      var requestWeather = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly&units=imperial&appid=5c0c4fce484144270b0ea96cd07f8e98"
      fetch (requestWeather)
        .then(function(response){
          return response.json()
        }) 
        .then(function(data) {
          console.log(data);
        
          //ICON
          var currentIcon = data.current.weather[0].icon;
          var forecastIcon1 = data.daily[0].weather[0].icon;
          var forecastIcon2 = data.daily[1].weather[0].icon;
          var forecastIcon3 = data.daily[2].weather[0].icon;
          var forecastIcon4 = data.daily[3].weather[0].icon;
          var forecastIcon5 = data.daily[4].weather[0].icon;
        
          weatherIcon[0].setAttribute('src', "http://openweathermap.org/img/w/"+currentIcon+".png");
          weatherIcon[1].setAttribute('src', "http://openweathermap.org/img/w/"+forecastIcon1+".png");
          weatherIcon[2].setAttribute('src', "http://openweathermap.org/img/w/"+forecastIcon2+".png");
          weatherIcon[3].setAttribute('src', "http://openweathermap.org/img/w/"+forecastIcon3+".png");
          weatherIcon[4].setAttribute('src', "http://openweathermap.org/img/w/"+forecastIcon4+".png");
          weatherIcon[5].setAttribute('src', "http://openweathermap.org/img/w/"+forecastIcon5+".png");
            
          //TEMP
          var currentTemp = data.current.temp;
          var forecastTemp1 = data.daily[0].temp.day;
          var forecastTemp2 = data.daily[1].temp.day;
          var forecastTemp3 = data.daily[2].temp.day;
          var forecastTemp4 = data.daily[3].temp.day;
          var forecastTemp5 = data.daily[4].temp.day;

          temp[0].textContent="Temp: " + currentTemp;
          temp[1].textContent="Temp: " + forecastTemp1;
          temp[2].textContent="Temp: " + forecastTemp2;
          temp[3].textContent="Temp: " + forecastTemp3;
          temp[4].textContent="Temp: " + forecastTemp4;
          temp[5].textContent="Temp: " + forecastTemp5;

          //HUMIDITY
          var currentHumid = data.current.humidity;
          var forecastHumid1 = data.daily[0].humidity;
          var forecastHumid2 = data.daily[1].humidity;
          var forecastHumid3 = data.daily[2].humidity;
          var forecastHumid4 = data.daily[3].humidity;
          var forecastHumid5 = data.daily[4].humidity;
          
          humid[0].textContent="Humidity: " + currentHumid;
          humid[1].textContent="Humidity: " + forecastHumid1;
          humid[2].textContent="Humidity: " + forecastHumid2;
          humid[3].textContent="Humidity: " + forecastHumid3;
          humid[4].textContent="Humidity: " + forecastHumid4;
          humid[5].textContent="Humidity: " + forecastHumid5;

          //WIND SPEED
          var currentWind = data.current.wind_speed;
          var forecastWind1 = data.daily[0].wind_speed;
          var forecastWind2 = data.daily[1].wind_speed;
          var forecastWind3 = data.daily[2].wind_speed;
          var forecastWind4 = data.daily[3].wind_speed;
          var forecastWind5 = data.daily[4].wind_speed;

          wind[0].textContent="Wind Speed: " + currentWind;
          wind[1].textContent="Wind Speed: " + forecastWind1;
          wind[2].textContent="Wind Speed: " + forecastWind2;
          wind[3].textContent="Wind Speed: " + forecastWind3;
          wind[4].textContent="Wind Speed: " + forecastWind4;
          wind[5].textContent="Wind Speed: " + forecastWind5;
          
          //UV INDEX
          var currentUv = data.current.uvi;
          uvIndex.textContent = "UV Index: " + currentUv;
        }
        )
      })
};
    

submitBtn.addEventListener('click', function (event) {
  event.preventDefault();
  getWeather();
  results.style.display = "block";
  // addName();
})