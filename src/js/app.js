// Specify the API endpoint for user data

let cityName = "Luzern";
const apiKey = "0711ba8995366ec70397a048be1bafb4";
const weatherUrl = `http://api.openweathermap.org/data/2.5/find?q=${cityName}&appid=${apiKey}`;

// const cityId = "2659811";
// const weatherTemperature = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${apiKey}`;

// Make a GET request using the Fetch API
const getWeatherTemperature = () => {
  fetch(weatherUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((userData) => {
      // Process the retrieved user data
      console.log("User Data:", userData);
      const weatherTemperature = Math.floor(
        userData.list[0].main.temp - 273.15
      ); // -273.15 conversion from Kelvin to Celcius
      console.log("Temperature:", weatherTemperature);

      document.getElementById(
        "Temperature"
      ).innerHTML = `Temperature: ${weatherTemperature} Celcius;`; //display temperature in Kelvin
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

console.log(getWeatherTemperature());
