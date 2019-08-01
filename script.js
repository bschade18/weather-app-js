
let loc = document.getElementById("location");
let temNum = document.getElementById("temperature-num");
let temScale = document.getElementById("temperature-scale");
let weatherCon = document.getElementById("weather-condition");
let weatherIcon = document.getElementById("weather-icon");

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

window.onload = function() {
  getLocation();
};

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

// change from C to F
function cToF(celsius) {
  return celsius * 9 / 5 + 32;
}

// change from F to C
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



  



