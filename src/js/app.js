const searchBtn = document.getElementById("searchBtn");
const chosenCity = document.getElementById("chosenCity");
const temp = document.querySelector(".weather-info-temperature");
const description = document.querySelector(".weather-info-description");

// create an image
let imgElement = document.createElement("img");
imgElement.src = "";
let container = document.getElementById("imageContainer");
container.appendChild(imgElement);

// Specify the API endpoint for user data
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
            imgElement.src = "./src/images/rain2.png";
            break;
          case "shower rain":
            imgElement.src = "./src/images/showerRain.png";
            break;
          case "scattered clouds":
            imgElement.src = "./src/images/scatteredClouds.png";
            break;
          case "few clouds":
            imgElement.src = "./src/images/fewClouds.png";
            break;
          case "overcast clouds":
            imgElement.src = "./src/images/fewClouds.png";
            break;
          case "broken clouds":
            imgElement.src = "./src/images/brokenClouds.png";
            break;
          case "clear sky":
            imgElement.src = "./src/images/clearSky.png";
            break;
          case "thunderstorm":
            imgElement.src = "./src/images/thunderstorm.png";
            break;
          case "snow":
          case "light snow":
            imgElement.src = "./src/images/snow.png";
            break;
          case "mist":
            imgElement.src = "./src/images/mist.png";
            break;
          default:
            break;
        }
        // Reset input field after displaying weather information
        resetInput();

        displayBackground();

        // display future options button and h4 title
        displayFutureOptions();

        // filter the elements for today date ///

        const DayList = userData.list;
        console.log(DayList);

        const todayDate = new Date().toISOString().slice(0, 10);
        console.log(todayDate);

        const showTodayArrayResult = DayList.filter((day) => {
          // Extract the date part from the dt_txt property
          const dayDate = day.dt_txt.slice(0, 10);
          return dayDate === todayDate;
        });

        console.log(showTodayArrayResult);

        // storing the values of todays array separately

        let temperatures = [];
        let weatherDescriptions = [];
        let temperaturesOfDate = [];
        for (let temperature of showTodayArrayResult) {
          temperatures.push(temperature.main.temp);
          weatherDescriptions.push(temperature.weather[0].description);
          temperaturesOfDate.push(temperature.dt_txt.slice(11, 16));
        }
        console.log(temperatures);
        console.log(weatherDescriptions);
        console.log(temperaturesOfDate);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const resetInput = () => {
    document.getElementById("locationInputCity").value = "";
    document.getElementById("locationInputCountry").value = "";
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

const displayBackground = () => {
  const weatherInfoBackground = document.getElementById("weather-info");
  weatherInfoBackground.style.visibility = "visible";
};

let weatherImages = [
  { description: "light rain", src: "./src/images/rain2.png" },
  { description: "shower rain", src: "./src/images/showerRain.png" },
  { description: "scattered clouds", src: "./src/images/scatteredClouds.png" },
  { description: "few clouds", src: "./src/images/fewClouds.png" },
  { description: "overcast clouds", src: "./src/images/overcastClouds.png" },
  { description: "broken clouds", src: "./src/images/brokenClouds.png" },
  { description: "clear sky", src: "./src/images/clearSky.png" },
  { description: "thunderstorm", src: "./src/images/thunderstorm.png" },
  { description: "snow", src: "./src/images/snow.png" },
  { description: "light snow", src: "./src/images/snow.png" },
  { description: "mist", src: "./src/images/mist.png" },
];
