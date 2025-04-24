window.onload = function () {
  var apiKey = "54184e5f27e671903c45661e77ee6e4c";
  var output = document.getElementById("output");
  var out_location = document.getElementById("location");
  var out_temp = document.getElementById("temperature");
  var out_conditions = document.getElementById("conditions");
  var out_icon = document.getElementById("icon");
  var out_error = document.getElementById("error");
  var out_wind = document.getElementById("wind");

  function getWeather(city) {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.send();

    xhr.onload = function () {
      if (xhr.readyState === 4) {
        output.style.display = "block";

        if (xhr.status === 200) {
          var data = xhr.response;
          console.log(data);

          out_error.innerHTML = "";
          out_location.innerHTML = data.name;
          out_temp.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
          out_conditions.innerHTML =
            data.weather[0].description.charAt(0).toUpperCase() +
            data.weather[0].description.slice(1) +
            ".";
          out_icon.innerHTML = `<img src='https://openweathermap.org/img/wn/${data.weather[0].icon}.png' alt='${data.weather[0].description}'>`;
          out_wind.innerHTML = `Wind Speed: ${data.wind.speed} m/s`;
        } else {
          console.log(xhr.status);
          
          out_location.innerHTML = "";
          out_error.innerHTML = "API call was unsuccessful.";
          out_temp.innerHTML = "";
          out_conditions.innerHTML = "";
          out_icon.innerHTML = "";
          out_wind.innerHTML = "";
        }
      }
    };
  }

  document.getElementById("Toronto").addEventListener("click", function () {
    getWeather("Toronto");
  });

  document.getElementById("Yourtown").addEventListener("click", function () {
    getWeather("Calgary");
  });
};
