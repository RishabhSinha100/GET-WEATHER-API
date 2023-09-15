function getWeather() {
  const cityInput = document.getElementById("cityInput");
  const cityName = cityInput.value;

  if (cityName === "") {
    alert("Please enter a city name");
    return;
  }

  const apiKey = "fafa73015799576ce1da04ea01c9e832"; 
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  fetch(weatherUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("An error occurred while fetching weather data");
      }
      return response.json();
    })
    .then(weatherData => {
      const weatherInfo = document.getElementById("weatherInfo");
      weatherInfo.innerHTML = `
        <h2>${weatherData.name}</h2>
        <p>Temperature: ${weatherData.main.temp}°C</p>
        <p>Weather: ${weatherData.weather[0].main}</p>
      `;
      const weatherCondition = weatherData.weather[0].main.toLowerCase();
      const imageContainer = document.getElementById("imageContainer");
      imageContainer.innerHTML = ""; 

      // Weather images based on condition
      const weatherImages = {
        clear: "clear.png",
        clouds: "clouds.png",
        rain: "rain.png",
        Drizzle: "drizzle.png",
        haze:"haze.png"
      };

      const imageUrl = weatherImages[weatherCondition] || "";
      const image = document.createElement("img");
      image.src = imageUrl;
      imageContainer.appendChild(image);
    })
    .catch(error => {
      console.log("Error:", error);
      alert(error.message); // Display the error message
    });
}
