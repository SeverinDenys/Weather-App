const searchBtn = document.getElementById("searchBtn");
const chosenCity = document.getElementById("chosenCity");
const temp = document.querySelector(".weather-info-temperature");
const description = document.querySelector(".weather-info-description");

// create an image
let imgElement = document.createElement("img");
imgElement.src = "";
let container = document.getElementById("imageContainer");

// Specify the API endpoint for user data
const apiKey = "0711ba8995366ec70397a048be1bafb4";

// display the input API request
searchBtn.addEventListener("click", (e) => {
  e.preventDefault(); // prevent page from reloading

  const locationInput = document.getElementById("locationInput").value;
  const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${locationInput}&appid=${apiKey}&units=metric`;
  console.log(weatherUrl);

  const getWeatherTemperature = async () => {
    await fetch(weatherUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((userData) => {
        // Process the retrieved user data
        // pull code into separate function
        console.log("User Data:", userData);
        const location = locationInput;
        chosenCity.innerHTML = location;
        const weatherTemperature = Math.floor(userData.list[0].main.temp); // -273.15 conversion from Kelvin to Celcius
        temp.innerHTML = `${weatherTemperature} °C`; //display temperature in Kelvin
        const weatherMain = userData.list[0].weather[0].main;
        const weatherDescription = userData.list[0].weather[0].description;

        description.innerHTML = weatherMain;

        container.appendChild(imgElement);

        if (weatherMain === "Rain" && weatherDescription === "light rain") {
          imgElement.src = "./src/images/rain2.png";
        } else if (
          weatherMain === "Rain" &&
          weatherDescription === "shower rain"
        ) {
          imgElement.src = "./src/images/showerRain.png";
        } else if (
          weatherMain === "Clouds" &&
          weatherDescription === "scattered clouds"
        ) {
          imgElement.src = "./src/images/scatteredClouds.png";
        } else if (
          weatherMain === "Clouds" &&
          weatherDescription === "few clouds"
        ) {
          imgElement.src = "./src/images/fewClouds.png";
        } else if (
          weatherMain === "Clouds" &&
          weatherDescription === "overcast clouds"
        ) {
          imgElement.src = "./src/images/fewClouds.png";
        } else if (
          weatherMain === "Clouds" &&
          weatherDescription === "broken clouds"
        ) {
          imgElement.src = "./src/images/brokenClouds.png";
        } else if (
          weatherMain === "Clear" &&
          weatherDescription === "clear sky"
        ) {
          imgElement.src = "./src/images/clearSky.png";
        } else if (
          weatherMain === "Thunderstorm" &&
          weatherDescription === "thunderstorm"
        ) {
          imgElement.src = "./src/images/thunderstorm.png";
        } else if (weatherMain === "Snow" && weatherDescription === "snow") {
          imgElement.src = "./src/images/snow.png";
        } else if (weatherMain === "Mist" && weatherDescription === "mist") {
          imgElement.src = "./src/images/mist.png";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  console.log(getWeatherTemperature());
});

// Problems encountered so far ///
// Some of the cities are wrong. Like when I type Rome it gives me the city in US but not in Italy
