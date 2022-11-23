function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = [
    12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11,
  ];
  let hour = hours[date.getHours()];
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
  let amPm = amPmSpread[date.getHours()];
  return `${hour} ${amPm}`;
}

function displayTemp(response) {
  console.log(response.data);
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.city;

  let date = document.querySelector("#current-time");
  date.innerHTML = formatDate(response.data.time * 1000);

  let temp = Math.round(response.data.temperature.current);
  let currentTemperature = document.querySelector("#temp");
  currentTemperature.innerHTML = temp;

  let condition = document.querySelector("#current-condition");
  condition.innerHTML = response.data.condition.description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed} mph`;
}

let apiKey = "9733a0bfob8d3b90ab42ae5a571ftfa4";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Atlanta&key=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemp);
