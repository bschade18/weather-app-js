
let loc = document.getElementById("location");
let temNum = document.getElementById("temperature-num");
let temScale = document.getElementById("temperature-scale");
let weatherCon = document.getElementById("weather-condition");
let weatherIcon = document.getElementById("weather-icon");
let weatherAPI = "https://fcc-weather-api.glitch.me/api/current?";

function getLocation() {
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    getWeather(position.coords.latitude, position.coords.longitude);
  });
} else {
  loc.innerHTML = "Geolocation is not supported by this browser";
  }
}
// get weather data based on the location
function getWeather(lat, long) {
  fetch(`${weatherAPI}lat=${lat}&lon=${long}`)
    .then(resp => resp.json())
    .then(data => {
      updateDataToUI(data.name, data.weather, data.main.temp);
    })
    .catch(function(err) {
      console.log(err);
    });
}


function updateDataToUI(location, weather, temp) {
  weatherIcon.innerHTML = `<img src="${weather[0].icon}" />`;
  weatherCon.innerHTML = weather[0].main;
  loc.innerHTML = location;
  temNum.innerHTML = `${temp}`;
}

window.onload = function() {
  getLocation();
};


function cToF(celsius) {
  return celsius * 9 / 5 + 32;
}

function fToC(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

temScale.addEventListener("click", function toggleScale() {
  if (temScale.innerHTML === "C") {
    temNum.innerHTML = cToF(temNum.innerHTML).toFixed(2);
    temScale.innerHTML = "F";
  } else if (temScale.innerHTML === 'F') {
    temNum.innerHTML = fToC(temNum.innerHTML).toFixed(2);
    temScale.innerHTML = "C";
  }
}
);






  






