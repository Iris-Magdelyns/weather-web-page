// change date
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "Januari",
  "Februari",
  "March",
  "April",
  "May",
  "Juni",
  "Juli",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let day = days[now.getDay()];
let month = months[now.getMonth()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hours}`;
}
let minutes = now.getMinutes();
let date = now.getDate();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${day} ${date} ${month}, ${hour}:${minutes}`;

// weather current location
function dateFormat(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function showTemperatureCurrentLocation(response) {
  console.log(response.data);
  let currentTemp = document.querySelector("#current-temperature-city");
  let descriptionElement = document.querySelector("#description");
  let tempHigh = document.querySelector("#temp-high");
  let tempLow = document.querySelector("#temp-low");
  let tempFeel = document.querySelector("#feel-temp");
  let humidityCurrent = document.querySelector("#humidity");
  let speedWind = document.querySelector("#wind");
  let location = document.querySelector("h1");
  let dateElement = document.querySelector("#last-updated");
  let iconElement = document.querySelector("#icon");

  currentTemp.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  tempLow.innerHTML = Math.round(response.data.main.temp_min);
  tempHigh.innerHTML = Math.round(response.data.main.temp_max);
  tempFeel.innerHTML = Math.round(response.data.main.feels_like);
  humidityCurrent.innerHTML = Math.round(response.data.main.humidity);
  speedWind.innerHTML = Math.round(response.data.wind.speed);
  location.innerHTML = response.data.name;
  dateElement.innerHTML = dateFormat(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt", 
    response.data.weather[0].description);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "25770910791bc4a6117831afdb2e65e7";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperatureCurrentLocation);
}
navigator.geolocation.getCurrentPosition(handlePosition);

/*


// search bar + live weather

function showTemperature(response) {
  console.log(response.data);
  let temperatureHigh = Math.round(response.data.main.temp_max);
  let temperatureLow = Math.round(response.data.main.temp_min);
  let temperatureCurrent = Math.round(response.data.main.temp);
  let feelTemp = Math.round(response.data.main.feels_like);
  let currentHumidity = Math.round(response.data.main.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
  let currentTemp = document.querySelector("#current-temperature-city");
  let tempHigh = document.querySelector("#temp-high");
  let tempLow = document.querySelector("#temp-low");
  let tempFeel = document.querySelector("#feel-temp");
  let humidityCurrent = document.querySelector("#humidity");
  let speedWind = document.querySelector("#wind");

  currentTemp.innerHTML = temperatureCurrent;
  tempLow.innerHTML = temperatureLow;
  tempHigh.innerHTML = temperatureHigh;
  tempFeel.innerHTML = feelTemp;
  humidityCurrent.innerHTML = currentHumidity;
  speedWind.innerHTML = windSpeed;
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;

  let apiKey = "25770910791bc4a6117831afdb2e65e7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

  console.log(cityInput.value);
}

let city = document.querySelector("#search-city");
city.addEventListener("submit", search);

// current location button

let returnCity = document.querySelector("#current-city");
returnCity.addEventListener("submit", handlePosition);
*/
