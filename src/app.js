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

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  let icon = document.querySelector("#forecast-icon");

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="card-body border border-warning five-day-forecast">
        <h5 class="card-title">${formatForecastDay(forecastDay.time)}</h5>
        <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png" alt="" width="60px" id="forecast-icon" />
        <p class="card-text">${Math.round(forecastDay.temperature.day)} °F</p>
      </div>
    </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "9733a0bfob8d3b90ab42ae5a571ftfa4";
  let longitude = coordinates.longitude;
  let latitude = coordinates.latitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
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

  getForecast(response.data.coordinates);
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Atlanta");
