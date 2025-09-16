function updateWeather(response) {
 
    let temperatureElement = document.querySelector("#big-temp");
    let bigTemp = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(bigTemp) + "°C";
    
    let descriptionElement = document.querySelector("#summary");
    let summary = response.data.condition.description;
    descriptionElement.innerHTML = summary;

    let humidityElement = document.querySelector("#humidity");
    let humidity = response.data.temperature.humidity;
    humidityElement.innerHTML = humidity + "%";

    let windSpeedElement = document.querySelector("#wind-speed");
    let windSpeed = response.data.wind.speed;
    windSpeedElement.innerHTML = windSpeed + "mph";
    
getForecast(response.data.city);

}

function changeSymbol(response){
    let symbolElement = document.querySelector("#symbol");
    let symbolUrl = response.data.condition.icon_url;
    symbolElement.src = symbolUrl;
}

function searchCity(city){

let apiKey = "o94ea318dba23fta40204c3af2064fda";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(function(response){
    updateWeather(response);
    changeSymbol(response);
});

}

function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);

}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function getForecast (city) {

let apiKey = "o94ea318dba23fta40204c3af2064fda";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayForecast);

}

function formatDay(timestamp){
    let date = new Date(timestamp + 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 4) {
      forecastHtml += `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}º </strong>
            </span>
            <span class="weather-forecast-temperature">
              ${Math.round(day.temperature.minimum)}º
            </span>
          </div>
        </div>
      `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}