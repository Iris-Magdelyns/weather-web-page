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

let currentDay = document.querySelector("#day");
currentDay.innerHTML = `${day}`;
let currentDate = document.querySelector("#date-and-time");
currentDate.innerHTML = `${date} ${month}, ${hour}:${minutes}`;

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

function showTemperature(response) {
  console.log(response.data);
  let currentTemp = document.querySelector("#current-temperature-city");
  let descriptionElement = document.querySelector("#description");

  let tempFeel = document.querySelector("#feel-temp");
  let humidityCurrent = document.querySelector("#humidity");
  let speedWind = document.querySelector("#wind");
  let location = document.querySelector("h1");
  let dateElement = document.querySelector("#last-updated");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.main.temp);

  celciusTempratureFeelsLike = Math.round(response.data.main.feels_like);

  currentTemp.innerHTML = celsiusTemperature;
  descriptionElement.innerHTML = response.data.weather[0].description;

  tempFeel.innerHTML = `${celciusTempratureFeelsLike} °C`;
  humidityCurrent.innerHTML = Math.round(response.data.main.humidity);
  speedWind.innerHTML = Math.round(response.data.wind.speed);
  location.innerHTML = response.data.name;
  dateElement.innerHTML = dateFormat(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// weather current location
function handlePosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "25770910791bc4a6117831afdb2e65e7";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(handlePosition);

// change celsius/farhenheid
function displayFahrenheitTemperature(event) {
  event.preventDefault();

  let fahrenheitTempLow = Math.round(celciusTempratureLow * 1.8 + 32);
  let fahrenheitTempFeelsLike = Math.round(
    celciusTempratureFeelsLike * 1.8 + 32
  );
  let temperatureElement = document.querySelector("#current-temperature-city");

  let temperatureElementFeelsLike = document.querySelector("#feel-temp");
  temperatureElement.innerHTML = fahrenheitTemprature;

  temperatureElementFeelsLike.innerHTML = `${fahrenheitTempFeelsLike} °F`;

  document.getElementById("celcius-link").style.color = "#360DAB";
  document.getElementById("celcius-link").style.textDecoration = "underline";
  document.getElementById("fahrenheit-link").style.color = "#000000";
  document.getElementById("fahrenheit-link").style.textDecoration = "none";
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature-city");

  let temperatureElementFeelsLike = document.querySelector("#feel-temp");
  temperatureElement.innerHTML = celsiusTemperature;

  temperatureElementFeelsLike.innerHTML = `${celciusTempratureFeelsLike} °C`;
  document.getElementById("fahrenheit-link").style.color = "#360DAB";
  document.getElementById("fahrenheit-link").style.textDecoration = "underline";
  document.getElementById("celcius-link").style.color = "#000000";
  document.getElementById("celcius-link").style.textDecoration = "none";
}

let celsiusTemperature = null;

let celciusTempratureFeelsLike = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

// search bar + live weather

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

function currentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let city = document.querySelector("#search-city");
city.addEventListener("click", search);

// current location button

let returnToCurrentCity = document.querySelector("#current-city");
returnToCurrentCity.addEventListener("click", currentCity);
