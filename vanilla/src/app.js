const searchBtn = document.getElementById("searchBtn");
const chosenCity = document.getElementById("chosenCity");
const temp = document.querySelector(".weather-info-temperature");
const description = document.querySelector(".weather-info-description");
const currentLocation = document.getElementById("currentLocation");
const currentLocationTemperature = document.getElementById(
  "currentLocationTemperature"
);
const currentLocationDescription = document.getElementById(
  "currentTemperatureDescription"
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

const weatherInfoDailyContainer = document.querySelector(
  ".weather-info-daily-container"
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
        currentLocation.innerText = currentLocationCityCountry;
        const localTemp = Math.floor(weatherData.list[0].main.temp);
        const localTempDesc = weatherData.list[0].weather[0].description;
        currentLocationDescription.innerText = localTempDesc;
        currentLocationTemperature.innerText = `${localTemp} °C`;

        // create image your location
        let currentImgElement = document.createElement("img");
        currentImgElement.src = "";
        let currentImgContainer = document.getElementById(
          "currentLocationImageContainer"
        );
        currentImgContainer.appendChild(currentImgElement);

        switch (localTempDesc) {
          case "light rain":
            currentImgElement.src = "./public/images/rain2.png";
            break;
          case "shower rain":
            currentImgElement.src = "./public/images/showerRain.png";
            break;
          case "scattered clouds":
            currentImgElement.src = "./public/images/scatteredClouds.png";
            break;
          case "few clouds":
            currentImgElement.src = "./public/images/fewClouds.png";
            break;
          case "overcast clouds":
            currentImgElement.src = "./public/images/brokenClouds.png";
            break;
          case "broken clouds":
            currentImgElement.src = "./public/images/brokenClouds.png";
            break;
          case "clear sky":
            currentImgElement.src = "./public/images/clearSky.png";
            break;
          case "thunderstorm":
            currentImgElement.src = "./public/images/thunderstorm.png";
            break;
          case "snow":
          case "light snow":
            currentImgElement.src = "./public/images/snow.png";
            break;
          case "mist":
            currentImgElement.src = "./public/images/mist.png";
            break;
          default:
            break;
        }
      })
      .catch((error) => console.log(error));
  }
);

// create an image chosen location
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
        chosenCity.innerText = locationCity;
        const locationCountry = locationInputCity;
        chosenCity.innerText = locationCountry;
        const weatherTemperature = Math.floor(userData.list[0].main.temp);
        temp.innerText = `${weatherTemperature} °C`;
        const weatherDescription = userData.list[0].weather[0].description;
        description.innerText = weatherDescription;

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
            imgElement.src = "./public/images/brokenClouds.png";
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

        const WeatherData = userData.list;
        console.log({ WeatherData });

        // three hours period
        const todayDate = new Date().toISOString().slice(0, 10);

        const filterTodayWeather = WeatherData.filter((todayWeather) =>
          todayWeather.dt_txt.includes(todayDate)
        );

        filterTodayWeather.map((todayWeather) => {
          const time = todayWeather.dt_txt.slice(11, 16);
          const temperature = `${Math.round(todayWeather.main.temp)} °C`;
          const description = todayWeather.weather[0].description;

          // Create a container for all data
          const dataContainer = document.createElement("div");
          dataContainer.classList.add("weather-info-hourly-data");

          // Apply flexbox styling to the container
          dataContainer.style.display = "flex";

          // create image 3 hour period
          let threeHoursImgElement = document.createElement("img");
          threeHoursImgElement.src = "";
          threeHoursImgElement.style.width = "4rem";
          dataContainer.appendChild(threeHoursImgElement);

          switch (description) {
            case "light rain":
              threeHoursImgElement.src = "./public/images/rain2.png";
              break;
            case "shower rain":
              threeHoursImgElement.src = "./public/images/showerRain.png";
              break;
            case "scattered clouds":
              threeHoursImgElement.src = "./public/images/scatteredClouds.png";
              break;
            case "few clouds":
              threeHoursImgElement.src = "./public/images/fewClouds.png";
              break;
            case "overcast clouds":
              threeHoursImgElement.src = "./public/images/brokenClouds.png";
              break;
            case "broken clouds":
              threeHoursImgElement.src = "./public/images/brokenClouds.png";
              break;
            case "clear sky":
              threeHoursImgElement.src = "./public/images/clearSky.png";
              break;
            case "thunderstorm":
              threeHoursImgElement.src = "./public/images/thunderstorm.png";
              break;
            case "snow":
            case "light snow":
              threeHoursImgElement.src = "./public/images/snow.png";
              break;
            case "mist":
              threeHoursImgElement.src = "./public/images/mist.png";
              break;
            default:
              break;
          }

          // Create and append time display
          const timeDisplay = document.createElement("p");
          timeDisplay.innerText = time;
          timeDisplay.classList.add("weather-info-hourly-time");
          dataContainer.appendChild(timeDisplay);

          // Create and append description display
          const descriptionDisplay = document.createElement("p");
          descriptionDisplay.innerText = description;
          descriptionDisplay.classList.add("weather-info-hourly-description");
          dataContainer.appendChild(descriptionDisplay);

          // Create and append temperature display
          const temperatureDisplay = document.createElement("p");
          temperatureDisplay.innerText = temperature;
          temperatureDisplay.classList.add("weather-info-hourly-temperature");
          dataContainer.appendChild(temperatureDisplay);

          // Append the data container to the hourly container
          weatherInfoHourlyContainer.appendChild(dataContainer);
          displayBackgroundHourlyWeather();
        });

        // 5 days period

        const filterWeatherFiveDays = WeatherData.filter((Data) =>
          Data.dt_txt.includes("12:00:00")
        );
        console.log({ filterWeatherFiveDays });

        filterWeatherFiveDays.map((dailyWeather) => {
          const dailyTime = dailyWeather.dt_txt.slice(2, 11);
          const dailyTemp = `${Math.round(dailyWeather.main.temp)} °C`;
          const dailyDesc = dailyWeather.weather[0].description;

          // Create a container for all data
          const dailyDataContainer = document.createElement("div");
          dailyDataContainer.classList.add("weather-info-daily-data");

          // Apply flexbox styling to the container
          dailyDataContainer.style.display = "flex";

          // create image 5 days period
          let fiveDaysImgElement = document.createElement("img");
          fiveDaysImgElement.src = "";
          fiveDaysImgElement.style.width = "4rem";
          dailyDataContainer.appendChild(fiveDaysImgElement);

          switch (dailyDesc) {
            case "light rain":
              fiveDaysImgElement.src = "./public/images/rain2.png";
              break;
            case "shower rain":
              fiveDaysImgElement.src = "./public/images/showerRain.png";
              break;
            case "scattered clouds":
              fiveDaysImgElement.src = "./public/images/scatteredClouds.png";
              break;
            case "few clouds":
              fiveDaysImgElement.src = "./public/images/fewClouds.png";
              break;
            case "overcast clouds":
              fiveDaysImgElement.src = "./public/images/brokenClouds.png";
              break;
            case "broken clouds":
              fiveDaysImgElement.src = "./public/images/brokenClouds.png";
              break;
            case "clear sky":
              fiveDaysImgElement.src = "./public/images/clearSky.png";
              break;
            case "thunderstorm":
              fiveDaysImgElement.src = "./public/images/thunderstorm.png";
              break;
            case "snow":
            case "light snow":
              fiveDaysImgElement.src = "./public/images/snow.png";
              break;
            case "mist":
              fiveDaysImgElement.src = "./public/images/mist.png";
              break;
            default:
              break;
          }

          // Create and append time display
          const timeDisplay = document.createElement("p");
          timeDisplay.innerText = dailyTime;
          timeDisplay.classList.add("weather-info-daily-time");
          dailyDataContainer.appendChild(timeDisplay);

          // Create and append description display
          const descriptionDisplay = document.createElement("p");
          descriptionDisplay.innerText = dailyDesc;
          descriptionDisplay.classList.add("weather-info-daily-description");
          dailyDataContainer.appendChild(descriptionDisplay);

          // Create and append temperature display
          const temperatureDisplay = document.createElement("p");
          temperatureDisplay.innerText = dailyTemp;
          temperatureDisplay.classList.add("weather-info-daily-temperature");
          dailyDataContainer.appendChild(temperatureDisplay);

          // Append the data container to the hourly container
          weatherInfoDailyContainer.appendChild(dailyDataContainer);
          displayBackgroundDailyWeather();
        });

        const showTodayArrayResult = WeatherData.filter((day) => {
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

  getWeatherTemperature();
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

const displayBackgroundDailyWeather = () => {
  const weatherInfoBackgroundDaily = document.querySelector(
    ".weather-info-daily-container"
  );
  weatherInfoBackgroundDaily.style.visibility = "visible";
};

/* bugs encountered */
/* adding new city will add new temperature to 3hour container without deleting the previous data */
