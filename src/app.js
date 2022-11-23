function displayTemp(response) {
  console.log(response.data);
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.city;

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
