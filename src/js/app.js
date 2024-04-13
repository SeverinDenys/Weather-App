const searchBtn = document.getElementById("searchBtn");
const chosenCity = document.getElementById("chosenCity");
const temp = document.querySelector(".weather-info-temperature");
const description = document.querySelector(".weather-info-description");
const image = document.querySelector(".weather-info-image");

// Specify the API endpoint for user data
const apiKey = "0711ba8995366ec70397a048be1bafb4";

// display the input API request
searchBtn.addEventListener("click", (e) => {
  e.preventDefault(); // prevent page from reloading

  const locationInput = document.getElementById("locationInput").value;
  const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${locationInput}&appid=${apiKey}&units=metric`;
  console.log(weatherUrl);

  const location = locationInput;
  chosenCity.innerHTML = location;

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
        const weatherTemperature = Math.floor(userData.list[0].main.temp); // -273.15 conversion from Kelvin to Celcius
        temp.innerHTML = `${weatherTemperature} °C`; //display temperature in Kelvin
        const weatherDescription = userData.list[0].weather[0].main;
        description.innerHTML = weatherDescription;

        if (weatherTemperature <= 20) {
          image.src = "/src/images/sun.png";
        } // doesn't work so far
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  console.log(getWeatherTemperature());
});

// Problems encountered so far ///
// Some of the cities are wrong. Like when I type Rome it gives me the city in US but not in Italy
// adding image icon doesn't work
