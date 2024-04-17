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
        const weatherTemperature = Math.floor(userData.list[0].main.temp);
        temp.innerHTML = `${weatherTemperature} °C`;
        const weatherMain = userData.list[0].weather[0].main;
        const weatherDescription = userData.list[0].weather[0].description;
        description.innerHTML = weatherMain;

        container.appendChild(imgElement);

        // set the image based on weather conditions

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
        } else if (
          weatherMain === "Snow" &&
          weatherDescription === "light snow"
        ) {
          imgElement.src = "./src/images/snow.png";
        } else if (weatherMain === "Mist" && weatherDescription === "mist") {
          imgElement.src = "./src/images/mist.png";
        }

        // Reset input field after displaying weather information
        resetInput();

        // display future options button and h4 title
        displayFutureOptions();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const resetInput = () => {
    document.getElementById("locationInput").value = "";
  };

  const displayFutureOptions = () => {
    const weatherInfoFutureDescription = document.querySelector(
      ".weather-info-future-description"
    );
    const searchBtn2 = document.getElementById("searchBtn2");
    const searchBtn3 = document.getElementById("searchBtn3");

    weatherInfoFutureDescription.style.visibility = "visible";
    searchBtn2.style.visibility = "visible";
    searchBtn3.style.visibility = "visible";
  };

  console.log(getWeatherTemperature());
});

// Problems encountered so far ///
// how to empty the input value text after click so the text doesn't stay in input field

// display container background
// const displayBackground = () => {
//   const weatherInfoBackground = document.getElementById("weather-info");
//   weatherInfoBackground.style.backgroundColor =
//     "linear-gradient(135deg, rgba(255, 100, 100, 1) 0%, rgb(244, 244, 119) 100%)";
// };

// displayBackground();
