const cityInput = document.querySelector("#cityInput");
const btnWeather = document.querySelector(".weather_button");
const infoCont = document.querySelector("#weather-info");

const key = 'cbc85251a192c600096b36efd5c71306'; 
let cityName;
let data;
let weatherDesc;
let temperature;
let windSpeed;

const getTempInCelc = function(temp) {
  return (temp - 273.15).toFixed(2);
}

const addToHTML = function(str, className) {
  const p = document.createElement('p');
  p.classList.add(className);
  p.textContent = str;
  infoCont.prepend(p);
}

const removeErrorMessage = function(className) {
  document.querySelectorAll(`.${className}`).forEach(el => el.remove());
}

const clearInput = function() {
  cityInput.value = "";
  removeErrorMessage("weather_info-error");
}

const getWeather = function() {
  cityName = cityInput.value;

  const req = new XMLHttpRequest();
  req.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(req.responseText);
      weatherDesc = data.weather[0].description;
      temperature = getTempInCelc(data.main.temp);
      windSpeed = data.wind.speed;

      addToHTML(`The weather in ${cityName} is ${weatherDesc}.`, "weather_info");
      addToHTML(`The temperature is ${temperature}°C with a wind speed of ${windSpeed} m/s.`, "weather_info");
    } else {
      addToHTML("Sorry, the city you try to find doesn't exist", "weather_info-error");
    }
  };
  req.open("GET", 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + key);
  req.send();
}

btnWeather.addEventListener("click", getWeather);

cityInput.addEventListener("focus", clearInput);