const searchBtn = document.getElementById("searchBtn");
const chosenCity = document.getElementById("chosenCity");
const temp = document.querySelector(".weather-info-temperature");
const description = document.querySelector(".weather-info-description");
const currentLocation = document.getElementById("currentLocation");
const currentLocationTemperature = document.getElementById(
  "currentLocationTemperature"
);
const weatherInfoHourlyContainer = document.querySelector(
  ".weather-info-hourly-container"
);
const weatherInfoHourlyTime = document.querySelector(
  ".weather-info-hourly-time"
);
const weatherInfoHourlyDescription = document.querySelector(
  ".weather-info-hourly-description"
);
const weatherInfoHourlyTemperature = document.querySelector(
  ".weather-info-hourly-temperature"
);

const currentLocationPosition = navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

    fetch(weatherUrl)
      .then((response) => response.json())
      .then((weatherData) => {
        const currentLocationCityCountry = `${weatherData.city.name}, ${weatherData.city.country}`;
        currentLocation.innerHTML = currentLocationCityCountry;
        const localTemp = Math.floor(weatherData.list[0].main.temp);

        currentLocationTemperature.innerHTML = `${localTemp} °C`;
      })
      .catch((error) => console.log(error));
  }
);

// create an image
let imgElement = document.createElement("img");
imgElement.src = "";
let container = document.getElementById("imageContainer");
container.appendChild(imgElement);

// Specify the API endpoint for user data
// Hide this API key
const apiKey = "0711ba8995366ec70397a048be1bafb4";

// display the input API request
searchBtn.addEventListener("click", (e) => {
  e.preventDefault(); // prevent page from reloading

  const locationInputCity = document.getElementById("locationInputCity").value;
  const locationInputCountry = document.getElementById(
    "locationInputCountry"
  ).value;
  const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${locationInputCity},${locationInputCountry}&appid=${apiKey}&units=metric`;
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
        const locationCity = locationInputCity;
        chosenCity.innerHTML = locationCity;
        const locationCountry = locationInputCity;
        chosenCity.innerHTML = locationCountry;
        const weatherTemperature = Math.floor(userData.list[0].main.temp);
        temp.innerHTML = `${weatherTemperature} °C`;
        const weatherDescription = userData.list[0].weather[0].description;
        description.innerHTML = weatherDescription;

        // set the image based on weather conditions

        switch (weatherDescription) {
          case "light rain":
            imgElement.src = "./public/images/rain2.png";
            break;
          case "shower rain":
            imgElement.src = "./public/images/showerRain.png";
            break;
          case "scattered clouds":
            imgElement.src = "./public/images/scatteredClouds.png";
            break;
          case "few clouds":
            imgElement.src = "./public/images/fewClouds.png";
            break;
          case "overcast clouds":
            imgElement.src = "./public/images/overcastClouds.png";
            break;
          case "broken clouds":
            imgElement.src = "./public/images/brokenClouds.png";
            break;
          case "clear sky":
            imgElement.src = "./public/images/clearSky.png";
            break;
          case "thunderstorm":
            imgElement.src = "./public/images/thunderstorm.png";
            break;
          case "snow":
          case "light snow":
            imgElement.src = "./public/images/snow.png";
            break;
          case "mist":
            imgElement.src = "./public/images/mist.png";
            break;
          default:
            break;
        }
        // Reset input field after displaying weather information
        resetInput();

        displayBackground();

        // filter the elements for today date ///

        const DayList = userData.list;
        console.log(DayList);

        const todayDate = new Date().toISOString().slice(0, 10);
        console.log(todayDate);

        const filterTodayWeather = userData.list.filter((todayWeather) =>
          todayWeather.dt_txt.includes(todayDate)
        );
        console.log(filterTodayWeather);

        filterTodayWeather.map((todayWeather) => {
          const time = todayWeather.dt_txt.slice(11, 16);
          const temperature = `${Math.round(todayWeather.main.temp)} °C`;
          const description = todayWeather.weather[0].description;

          // Create a container for all data
          const dataContainer = document.createElement("div");
          dataContainer.classList.add("weather-info-hourly-data");

          // Apply flexbox styling to the container
          dataContainer.style.display = "flex";

          // Create and append time display
          const timeDisplay = document.createElement("p");
          timeDisplay.innerHTML = time;
          timeDisplay.classList.add("weather-info-hourly-time");
          dataContainer.appendChild(timeDisplay);

          // Create and append description display
          const descriptionDisplay = document.createElement("p");
          descriptionDisplay.innerHTML = description;
          descriptionDisplay.classList.add("weather-info-hourly-description");
          dataContainer.appendChild(descriptionDisplay);

          // Create and append temperature display
          const temperatureDisplay = document.createElement("p");
          temperatureDisplay.innerHTML = temperature;
          temperatureDisplay.classList.add("weather-info-hourly-temperature");
          dataContainer.appendChild(temperatureDisplay);

          // Append the data container to the hourly container
          weatherInfoHourlyContainer.appendChild(dataContainer);
          displayBackgroundHourlyWeather();
        });

        const showTodayArrayResult = DayList.filter((day) => {
          // Extract the date part from the dt_txt property
          const dayDate = day.dt_txt.slice(11);

          return dayDate === todayDate;
        });

        console.log(showTodayArrayResult);
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const resetInput = () => {
    document.getElementById("locationInputCity").value = "";
    document.getElementById("locationInputCountry").value = "";
  };

  console.log(getWeatherTemperature());
});

const displayBackground = () => {
  const weatherInfoBackground = document.getElementById("weather-info");
  weatherInfoBackground.style.visibility = "visible";
};

const displayBackgroundHourlyWeather = () => {
  const weatherInfoBackgroundHourly = document.querySelector(
    ".weather-info-hourly-container"
  );
  weatherInfoBackgroundHourly.style.visibility = "visible";
};
