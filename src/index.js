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

// function alter() {
//   let changeTemp = document.querySelector("#temperature");
//   changeTemp.innerHTML = `53`;
// }

// function alterCels() {
//   let changeTemp = document.querySelector("#temperature");
//   changeTemp.innerHTML = `19`;
// }

// let showFahrenheit = document.querySelector("#fahrenheit-link");
// showFahrenheit.addEventListener("click", alter);
// let showCelsius = document.querySelector("#celsius-link");
// showCelsius.addEventListener("click", alterCels);

function changeCityAndTemp(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
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

search("London");

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

// function changeCurrentCityAndTemp(response) {
//   document.querySelector("#city").innerHTML = response.data.name;
//   document.querySelector("#temperature").innerHTML = Math.round(
//     response.data.main.temp
//   );
// }
