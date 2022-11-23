function displayTemp(response) {
  console.log(response.data);
  let cityName = response.data.city;
  let city = document.querySelector("#city-name");
  city.innerHTML = cityName;
  let currentTemp = Math.round(response.data.temperature.current);
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = currentTemp;
}

let apiKey = "9733a0bfob8d3b90ab42ae5a571ftfa4";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Atlanta&key=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemp);
