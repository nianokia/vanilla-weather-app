function formatDate(timestamp) {
  let currentDate = new Date(timestamp);
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[currentDate.getMonth()];
  let date = currentDate.getDate();
  let year = currentDate.getFullYear();
  return `${month} ${date}, ${year}`;
}

function formatTime(timestamp) {
  let time = new Date(timestamp);
  let hours = [
    12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11,
  ];
  let hour = hours[time.getHours()];
  let amPmSpread = [
    "am",
    "am",
    "am",
    "am",
    "am",
    "am",
    "am",
    "am",
    "am",
    "am",
    "am",
    "am",
    "pm",
    "pm",
    "pm",
    "pm",
    "pm",
    "pm",
    "pm",
    "pm",
    "pm",
    "pm",
    "pm",
    "pm",
  ];
  let amPm = amPmSpread[time.getHours()];
  return `${hour} ${amPm}`;
}

function displayTemp(response) {
  let cityName = document.querySelector("#city-name");
  let date = document.querySelector("#current-date");
  let time = document.querySelector("#current-time");
  let temp = document.querySelector("#temp");
  let icon = document.querySelector("#current-condition-icon");
  let condition = document.querySelector("#current-condition");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");

  fahrTemp = response.data.temperature.current;

  cityName.innerHTML = response.data.city;
  date.innerHTML = formatDate(response.data.time * 1000);
  time.innerHTML = formatTime(response.data.time * 1000);
  temp.innerHTML = Math.round(fahrTemp);
  icon.setAttribute("src", `${response.data.condition.icon_url}`);
  icon.setAttribute("alt", `${response.data.condition.icon}`);
  condition.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed} mph`;
}

function search(city) {
  let apiKey = "9733a0bfob8d3b90ab42ae5a571ftfa4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  search(searchInputElement.value);
}

function showCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  let celsiusTemp = (fahrTemp - 32) * (5 / 9);
  temp.innerHTML = Math.round(celsiusTemp);
}

let fahrTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

search("Atlanta");
