
const loc = document.getElementById("location");
const temNum = document.getElementById("temperature-num");
const temScale = document.getElementById("temperature-scale");
const weatherCon = document.getElementById("weather-condition");
const weatherIcon = document.getElementById("weather-icon");  

// get location
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
  const weatherURL = "https://fcc-weather-api.glitch.me/api/current?";
  fetch(`${weatherURL}lat=${lat}&lon=${long}`)
    .then(resp => resp.json())
    .then(data => {
      updateDataToUI(data.name, data.weather, data.main.temp);
    })
    .catch(function(err) {
      console.log(err);
    });
}

// update the data from API to DOM
function updateDataToUI(location, weather, temp) {
  weatherIcon.innerHTML = `<img src="${weather[0].icon}" />`;
  weatherCon.innerHTML = weather[0].main;
  loc.innerHTML = location;
  temNum.innerHTML = `${temp}`;
}

window.onload = function() {
  getLocation();
};

// change from C to F
function cToF(celsius) {
  return celsius * 9 / 5 + 32;
}

// change from F to C
function fToC(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toggleScale() {
  if (temScale.innerHTML === "C") {
    temNum.innerHTML = cToF(temNum.innerHTML).toFixed(2);
    temScale.innerHTML = "F";
  } else if (temScale.innerHTML === 'F') {
    temNum.innerHTML = fToC(temNum.innerHTML).toFixed(2);
    temScale.innerHTML = "C";
  }
}

temScale.addEventListener("click", toggleScale);


  



