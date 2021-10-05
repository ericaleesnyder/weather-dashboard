var results = document.getElementById("results");
var submitBtn = document.getElementById("submit");  
var weatherIcon = document.getElementsByClassName('weather-icon');
var temp = document.querySelectorAll('.temp');
var humid = document.querySelectorAll('.humid');
var wind = document.querySelectorAll('.wind');
var uvIndex = document.getElementById('uv-index');
var cityName = document.getElementById("city-name");
var nameHeader = document.getElementById("name-header");
var date = document.getElementsByClassName('date');
var searchHistory = document.getElementById('search-history')

var citiesSearched =[];

function renderCities () {
  searchHistory.innerHTML="";

  for (var i=citiesSearched.length-1; i >-1 ; i--){
    var searchedCity = citiesSearched[i];

    var historyButton = document.createElement('button');
    
    historyButton.textContent = searchedCity;
    historyButton.setAttribute('data-index', i);
    historyButton.setAttribute('class', 'btn btn-primary');
    
    searchHistory.appendChild(historyButton);
  }
}

function init () {
  var storedCities = JSON.parse(localStorage.getItem('citiesSearched'));
  if (storedCities !== null) {
    citiesSearched = storedCities;
  }
  renderCities();
}

function storeSearch () {
  localStorage.setItem('citiesSearched', JSON.stringify(citiesSearched));
}

function clearInput () {
  document.getElementById("city-name").value = "";
}

function getWeather () {
  var cityName = document.getElementById("city-name").value;
  clearInput();

  if (cityName === ''){
    return;
  }

  if (citiesSearched.includes(cityName)===false){
    citiesSearched.push(cityName);
  }

  storeSearch();
  renderCities();

  nameHeader.innerHTML=cityName;
  
  var requestCoord = "https://api.openweathermap.org/geo/1.0/direct?q="+ cityName + "&limit=1&appid=5c0c4fce484144270b0ea96cd07f8e98"
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
          //DATE
          var currentDate = data.current.dt;
          var forecastDate1 = data.daily[1].dt;
          var forecastDate2 = data.daily[2].dt;
          var forecastDate3 = data.daily[3].dt;
          var forecastDate4 = data.daily[4].dt;
          var forecastDate5 = data.daily[5].dt;

          date[0].textContent = moment.unix(currentDate).format("MM/DD/YYYY");
          date[1].textContent = moment.unix(forecastDate1).format("MM/DD/YYYY");
          date[2].textContent = moment.unix(forecastDate2).format("MM/DD/YYYY");
          date[3].textContent = moment.unix(forecastDate3).format("MM/DD/YYYY");
          date[4].textContent = moment.unix(forecastDate4).format("MM/DD/YYYY");
          date[5].textContent = moment.unix(forecastDate5).format("MM/DD/YYYY");

          //ICON
          var currentIcon = data.current.weather[0].icon;
          var forecastIcon1 = data.daily[1].weather[0].icon;
          var forecastIcon2 = data.daily[2].weather[0].icon;
          var forecastIcon3 = data.daily[3].weather[0].icon;
          var forecastIcon4 = data.daily[4].weather[0].icon;
          var forecastIcon5 = data.daily[5].weather[0].icon;
        
          weatherIcon[0].setAttribute('src', "https://openweathermap.org/img/w/"+currentIcon+".png");
          weatherIcon[1].setAttribute('src', "https://openweathermap.org/img/w/"+forecastIcon1+".png");
          weatherIcon[2].setAttribute('src', "https://openweathermap.org/img/w/"+forecastIcon2+".png");
          weatherIcon[3].setAttribute('src', "https://openweathermap.org/img/w/"+forecastIcon3+".png");
          weatherIcon[4].setAttribute('src', "https://openweathermap.org/img/w/"+forecastIcon4+".png");
          weatherIcon[5].setAttribute('src', "https://openweathermap.org/img/w/"+forecastIcon5+".png");
            
          //TEMP
          var currentTemp = data.current.temp;
          var forecastTemp1 = data.daily[1].temp.day;
          var forecastTemp2 = data.daily[2].temp.day;
          var forecastTemp3 = data.daily[3].temp.day;
          var forecastTemp4 = data.daily[4].temp.day;
          var forecastTemp5 = data.daily[5].temp.day;

          temp[0].textContent="Temp: " + currentTemp + " °F";
          temp[1].textContent="Temp: " + forecastTemp1 + " °F";
          temp[2].textContent="Temp: " + forecastTemp2 + " °F";
          temp[3].textContent="Temp: " + forecastTemp3 + " °F";
          temp[4].textContent="Temp: " + forecastTemp4 + " °F";
          temp[5].textContent="Temp: " + forecastTemp5 + " °F";

          //HUMIDITY
          var currentHumid = data.current.humidity;
          var forecastHumid1 = data.daily[1].humidity;
          var forecastHumid2 = data.daily[2].humidity;
          var forecastHumid3 = data.daily[3].humidity;
          var forecastHumid4 = data.daily[4].humidity;
          var forecastHumid5 = data.daily[5].humidity;
          
          humid[0].textContent="Humidity: " + currentHumid + "%";
          humid[1].textContent="Humidity: " + forecastHumid1 + "%";
          humid[2].textContent="Humidity: " + forecastHumid2 + "%";
          humid[3].textContent="Humidity: " + forecastHumid3 + "%";
          humid[4].textContent="Humidity: " + forecastHumid4 + "%";
          humid[5].textContent="Humidity: " + forecastHumid5 + "%";

          //WIND SPEED
          var currentWind = data.current.wind_speed;
          var forecastWind1 = data.daily[1].wind_speed;
          var forecastWind2 = data.daily[2].wind_speed;
          var forecastWind3 = data.daily[3].wind_speed;
          var forecastWind4 = data.daily[4].wind_speed;
          var forecastWind5 = data.daily[5].wind_speed;

          wind[0].textContent="Wind Speed: " + currentWind + " MPH";
          wind[1].textContent="Wind Speed: " + forecastWind1 + " MPH";
          wind[2].textContent="Wind Speed: " + forecastWind2 + " MPH";
          wind[3].textContent="Wind Speed: " + forecastWind3 + " MPH";
          wind[4].textContent="Wind Speed: " + forecastWind4 + " MPH";
          wind[5].textContent="Wind Speed: " + forecastWind5 + " MPH";
          
          //UV INDEX
          var currentUv = data.current.uvi;
          uvIndex.textContent =  currentUv;

          if (currentUv <= 2) {
            uvIndex.setAttribute('style', 'background-color: green')
          } else if (currentUv <= 5) {
            uvIndex.setAttribute('style', 'background-color: yellow')
          } else if (currentUv <= 7) {
            uvIndex.setAttribute('style', 'background-color: orange')
          } else if (currentUv <= 10) {
            uvIndex.setAttribute('style', 'background-color: red')
          } else {
            uvIndex.setAttribute('style', 'background-color: purple')
          }
        }
        )
      })
};
    

searchHistory.addEventListener('click', function(event){
  var element = event.target;
  results.style.display = "block";

  event.preventDefault();
  if (element.matches('button') === true) {
    var index = element.getAttribute('data-index');
    var historySearch = citiesSearched[index];
    cityName.value = historySearch;
    getWeather(cityName);
  }
})

submitBtn.addEventListener('click', function (event) {

  event.preventDefault();
  
  getWeather();
  results.style.display = "block";


  if (cityName === ''){
    return;
  }

  storeSearch();
  renderCities();
})

init();