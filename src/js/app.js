const locationInput = document.getElementById("locationInput");
const searchBtn = document.getElementById("searchBtn");
const chosenCity = document.getElementById("chosenCity");

// Specify the API endpoint for user data
const apiKey = "0711ba8995366ec70397a048be1bafb4";
const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${locationInput.value}&appid=${apiKey}&units=metric`;

console.log(weatherUrl);

// display the input
searchBtn.addEventListener("click", (e) => {
  e.preventDefault(); // prevent page from reloading

  // displaying the inputValue in browser
  const location = locationInput.value;
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  console.log(getWeatherTemperature());
});
