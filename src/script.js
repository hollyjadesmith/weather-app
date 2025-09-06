function updateWeather(response) {
 
    let temperatureElement = document.querySelector("#big-temp");
    let bigTemp = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(bigTemp) + "°C";
    
    let descriptionElement = document.querySelector("#sumarry");
    let sumarry = response.data.condition.description;
    descriptionElement.innerHTML = sumarry;

    let humidityElement = document.querySelector("#humidity");
    let humidity = response.data.temperature.humidity;
    humidityElement.innerHTML = humidity + "%";

}

function changeSymbol(receive){
    symbolElement = document.querySelector("#symbol")
    
    let symbol = response.data.condition.icon_url
    symbolElement.innerHTML = symbol;
}


function searchCity(city){

let apiKey = "o94ea318dba23fta40204c3af2064fda";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(updateWeather).then(changeSymbol);
}

function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);

}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);