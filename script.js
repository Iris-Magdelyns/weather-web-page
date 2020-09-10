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
let minutes = now.getMinutes();
let date = now.getDate();

let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${day} ${date} ${month}, ${hour}:${minutes}`;

// weather current location

function showTemperatureCurrentLocation(response) {
  let temperatureHigh = Math.round(response.data.main.temp_max);
  let temperatureLow = Math.round(response.data.main.temp_min);
  let temperatureCurrent = Math.round(response.data.main.temp);
  let feelTemp = Math.round(response.data.main.feels_like);
  let currentHumidity = Math.round(response.data.main.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
  let currentLocation = response.data.name;
  let currentTemp = document.querySelector("#current-temperature-city");
  let tempHigh = document.querySelector("#temp-high");
  let tempLow = document.querySelector("#temp-low");
  let tempFeel = document.querySelector("#feel-temp");
  let humidityCurrent = document.querySelector("#humidity");
  let speedWind = document.querySelector("#wind");
  let location = document.querySelector("h1");

  currentTemp.innerHTML = temperatureCurrent;
  tempLow.innerHTML = temperatureLow;
  tempHigh.innerHTML = temperatureHigh;
  tempFeel.innerHTML = feelTemp;
  humidityCurrent.innerHTML = currentHumidity;
  speedWind.innerHTML = windSpeed;
  location.innerHTML = currentLocation;
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "25770910791bc4a6117831afdb2e65e7";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperatureCurrentLocation);
}
navigator.geolocation.getCurrentPosition(handlePosition);

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
