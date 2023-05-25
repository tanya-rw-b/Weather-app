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
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(response.data);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function search(city) {
  let apiKey = "40b353c9c1ea18ce3d5698bd93c9b6f7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(changeCityAndTemp);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

search("London");

// current location button

function searchCurrentLocation(position) {
  let apiKey = "40b353c9c1ea18ce3d5698bd93c9b6f7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

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
