const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
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

// you have declared variables which aren't being used anywhere
// const weatherInfo = document.getElementById("weather-info");

const weatherInfoHourlyContainer = document.querySelector(
  ".weather-info-hourly-container"
);
// const weatherInfoHourlyTime = document.querySelector(
//   ".weather-info-hourly-time"
// );
// const weatherInfoHourlyDescription = document.querySelector(
//   ".weather-info-hourly-description"
// );
// const weatherInfoHourlyTemperature = document.querySelector(
//   ".weather-info-hourly-temperature"
// );

const weatherInfoDailyContainer = document.querySelector(
  ".weather-info-daily-container"
);

const getWeatherImage = (description) => {
  switch (description) {
    case "light rain":
    case "moderate rain":
      return "./images/rain2.png";
    case "shower rain":
      return "./images/showerRain.png";
    case "scattered clouds":
      return "./images/scatteredClouds.png";
    case "few clouds":
      return "./images/fewClouds.png";
    case "overcast clouds":
      return "./images/brokenClouds.png";
    case "broken clouds":
      return "./images/brokenClouds.png";
    case "clear sky":
      return "./images/clearSky.png";
    case "thunderstorm":
      return "./images/thunderstorm.png";
    case "snow":
    case "light snow":
      return "./images/snow.png";
    case "mist":
      return "./images/mist.png";
    default:
      return "";
  }
};

const getWeatherBackground = (backgroundDescription) => {
  switch (backgroundDescription) {
    case "light rain":
      return "./public/images/lightRainBackground.jpg";
    case "moderate rain":
      return "./public/images/lightRainBackground.jpg";
    case "shower rain":
      return "./public/images/rainShowerBackground.jpg";
    case "scattered clouds":
      return "./public/images/scatteredCloudsBackground.jpg";
    case "few clouds":
      return "./public/images/fewCloudsBackground.jpg";
    case "overcast clouds":
      return "./public/images/overcastCloudsBackground.jpg";
    case "broken clouds":
      return "./public/images/brokenCloudsBackground.jpg";
    case "clear sky":
      return "./public/images/clearSkyBackground.jpg";
    case "thunderstorm":
      return "./public/images/thunderstormBackground.jpg";
    case "snow":
    case "light snow":
      return "./public/images/snowBackground.jpg";
    case "mist":
      return "./public/images/mistBackground.jpg";
    default:
      return "";
  }
};

// function to create and append weather elements
const createWeatherElement = (
  container,
  time,
  description,
  temperature,
  getImageSrc
) => {
  const dataContainer = document.createElement("div");
  dataContainer.classList.add("weather-info-data");

  // apply flexbox styling to the container
  dataContainer.style.display = "flex";

  // dataContainer.style.flexDirection = "column";
  dataContainer.style.alignItems = "center";

  // Create image element
  let imgElement = document.createElement("img");
  imgElement.src = getImageSrc(description);
  imgElement.style.width = "4rem";
  dataContainer.appendChild(imgElement);

  // Create and append time display
  const timeDisplay = document.createElement("p");
  timeDisplay.innerText = time;
  timeDisplay.classList.add("weather-info-time");
  dataContainer.appendChild(timeDisplay);

  // Create and append description display
  const descriptionDisplay = document.createElement("p");
  descriptionDisplay.innerText = description;
  descriptionDisplay.classList.add("weather-info-description");
  dataContainer.appendChild(descriptionDisplay);

  // Create and append temperature display
  const temperatureDisplay = document.createElement("p");
  temperatureDisplay.innerText = temperature;
  temperatureDisplay.classList.add("weather-info-temperature");
  dataContainer.appendChild(temperatureDisplay);

  // Append the data container to the provided container
  container.appendChild(dataContainer);
};

// get you current position weather information
const currentLocationPosition = navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

    fetch(weatherUrl)
      .then((response) => response.json())
      .then((weatherData) => {
        const currentLocationCityAndCountry = `${weatherData.city.name}, ${weatherData.city.country}`;
        currentLocation.innerText = currentLocationCityAndCountry;
        const localTemperature = Math.floor(weatherData.list[0].main.temp);
        // consider using text transform for this text
        const localTempDescription = weatherData.list[0].weather[0].description;
        currentLocationDescription.innerText = localTempDescription;
        currentLocationTemperature.innerText = `${localTemperature} °C`;

        // create image your location
        let currentImgElement = document.createElement("img");
        currentImgElement.src = getWeatherImage(localTempDescription);

        let currentImgContainer = document.getElementById(
          "currentLocationImageContainer"
        );
        currentImgContainer.appendChild(currentImgElement);
      })
      .catch((error) => console.log(error));
  }
);

// create an image chosen location
let imgElement = document.createElement("img");
imgElement.src = "";
let container = document.getElementById("imageContainer");
container.appendChild(imgElement);

// display the input API request
searchBtn.addEventListener("click", () => {
  const locationCityInputField = document.getElementById("locationInputCity");
  const locationCountryInputField = document.getElementById(
    "locationInputCountry"
  );

  // Validate the input fields
  if (
    !locationCityInputField.checkValidity() ||
    !locationCountryInputField.checkValidity()
  ) {
    // Display validation messages for invalid fields
    if (!locationCityInputField.checkValidity()) {
      locationCountryInputField.reportValidity();
    }
    if (!locationCityInputField.checkValidity()) {
      locationCountryInputField.reportValidity();
    }
    return;
  }

  const locationInputCity = document.getElementById("locationInputCity").value;
  const locationInputCountry = document.getElementById(
    "locationInputCountry"
  ).value;

  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${locationInputCity},${locationInputCountry}&appid=${apiKey}&units=metric`;

  // remove console.logs once you finish
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

        // set the image and background based on weather conditions
        imgElement.src = getWeatherImage(weatherDescription);
        document.body.style.backgroundImage = `url(${getWeatherBackground(
          weatherDescription
        )})`; //

        // remove console.logs
        console.log(getWeatherBackground(weatherDescription));

        // Reset input field after displaying weather information
        resetInput();
        displayBackground();

        // /////////////// 3 HOURS PERIOD FUNCTIONALITY /////////////

        const WeatherData = userData.list;
        const todayDate = new Date().toISOString().slice(0, 10);

        // filter the elements for today date ///
        const filterTodayWeather = WeatherData.filter((todayWeather) =>
          todayWeather.dt_txt.includes(todayDate)
        );

        weatherInfoHourlyContainer.innerText = "";

        filterTodayWeather.map((todayWeather) => {
          const time = todayWeather.dt_txt.slice(11, 16);
          const temperature = `${Math.round(todayWeather.main.temp)} °C`;
          const description = todayWeather.weather[0].description;

          createWeatherElement(
            weatherInfoHourlyContainer,
            time,
            description,
            temperature,
            getWeatherImage
          );
        });
        displayBackgroundHourlyWeather();

        // /////////////// 5 Days PERIOD FUNCTIONALITY /////////////
        weatherInfoDailyContainer.innerText = "";

        const filterWeatherFiveDays = WeatherData.filter((Data) =>
          Data.dt_txt.includes("12:00:00")
        );

        filterWeatherFiveDays.map((dailyWeather) => {
          const dailyTime = dailyWeather.dt_txt.slice(2, 11);
          const dailyTemp = `${Math.round(dailyWeather.main.temp)} °C`;
          const dailyDesc = dailyWeather.weather[0].description;

          createWeatherElement(
            weatherInfoDailyContainer,
            dailyTime,
            dailyDesc,
            dailyTemp,
            getWeatherImage
          );
        });

        displayBackgroundDailyWeather();

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
