//#show-date// showing current day and time

let now = new Date();
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
now.getDate();
now.getDay();
now.getMonth();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "FriYAY",
  "Saturday",
];
let day = days[now.getDay()];

// current day and time
let showDate = document.querySelector("#show-date");
showDate.innerHTML = `${day} ${hour}:${minute}`;

// changing temperature from C to F (and back)
function alterFahr(event) {
  event.preventDefault();
  let changeTemp = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  changeTemp.innerHTML = Math.round(fahrenheitTemp);
}

function alterCels(event) {
  event.preventDefault();
  let changeTemp = document.querySelector("#temperature");
  changeTemp.innerHTML = celsiusTemperature;
}

let showFahrenheit = document.querySelector("#fahrenheit-link");
showFahrenheit.addEventListener("click", alterFahr);
let showCelsius = document.querySelector("#celsius-link");
showCelsius.addEventListener("click", alterCels);

// search function - changing city with API weather
function changeCityAndTemp(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );

  celsiusTemperature = Math.round(response.data.temperature.current);

  console.log(response.data);
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  let weatherIcon = response.data.condition.icon_url;
  console.log(response.data.condition.icon_url);
  document.querySelector("#icon").setAttribute("src", `${weatherIcon}`);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function search(city) {
  let apiKey = "df412te5204935315ab18f0e317o5066";
  // let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(changeCityAndTemp);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

// current location button

function searchCurrentLocation(position) {
  let apiKey = "df412te5204935315ab18f0e317o5066";
  // let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeCityAndTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusTemperature = null;

// search - to have London as "home city"
search("London");
