function updateWeather(response){
    let temperatureElement = document.querySelector("#big-temp");
    
    let bigTemp = response.data.temperature.current;
    temperatureElement.innerHTML = Math.round(bigTemp);
}

function searchCity(city){
// receive the city typed in and search in the API
// 

let apiKey = "o94ea318dba23fta40204c3af2064fda";
let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiURL).then(updateWeather)
}

function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector('#place');
    cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);