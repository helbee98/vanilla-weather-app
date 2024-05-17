function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity")
    let windSpeedElement = document.querySelector("#wind-speed")
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    console.log(response.data.condition.description);

    cityElement.innerHTML = response.data.city;


    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    temperatureElement.innerHTML = Math.round(temperature);
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`

    getForecast(response.data.city);
}

function formatDate(date)  {
    
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["sunday", "monday", "tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`
}

function searchCity(city) {
    let apiKey = "f0t31ebf10a05340167073caaaa44dbo";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(refreshWeather);
}


function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
  
    searchCity(searchInput.value)
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[date.getDay()];
  }



function getForecast(city) {
    let apiKey = "f0t31ebf10a05340167073caaaa44dbo";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
    axios(apiUrl).then(displayForecast);
    console.log(apiUrl);
}

function displayForecast(response) {
    console.log(response.data);
  
    let forecastHTML = "";
  
    response.data.daily.forEach(function (day, index) {
      if (index < 5) {
        forecastHTML =
          forecastHTML +
          `<div class="weather-forecast-day">
              <div class="weather-forecast-date">
                  ${formatDay(day.time)}
              </div>
              <img src="${day.condition.icon_url}" class="weather-app-icon" />
              
              <div class="weather-forcast-temperatures">
                  <span class="weather-forecast-temperatures-max"> <strong>${Math.round(
                    day.temperature.maximum
                  )} º </strong> </span>
                  <span class="weather-forecast-temperatures-min">${Math.round(
                    day.temperature.minimum
                  )} º </span> 
              </div>
          </div>`;
      }
    });
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHTML;
  }


searchCity("paris");


