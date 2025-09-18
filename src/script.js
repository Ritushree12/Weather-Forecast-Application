//to change the background of the image
let currentWeather = "";
let CITY_NAME;

// Map of weather to images
const weatherImages = {
  Cloudy: [
    "../assets/weather/Cloudy/cloudy%20(1).jpg",
    "../assets/weather/Cloudy/cloudy%20(2).jpg",
    "../assets/weather/Cloudy/cloudy%20(3).jpg",
    "../assets/weather/Cloudy/cloudy%20(4).jpg",
    "../assets/weather/Cloudy/cloudy%20(5).jpg",
  ],
  Fog: [
    "../assets/weather/Fog/fog%20(1).jpg",
    "../assets/weather/Fog/fog%20(2).jpg",
    "../assets/weather/Fog/fog%20(3).jpg",
    "../assets/weather/Fog/fog%20(4).jpg",
    "../assets/weather/Fog/fog%20(5).jpg",
    "../assets/weather/Fog/fog%20(6).jpg",
    "../assets/weather/Fog/fog%20(7).jpg",
    "../assets/weather/Fog/fog%20(8).jpg",
  ],
  Rainy: [
    "../assets/weather/Rainy/rainy%20(1).jpg",
    "../assets/weather/Rainy/rainy%20(2).jpg",
    "../assets/weather/Rainy/rainy%20(3).jpg",
    "../assets/weather/Rainy/rainy%20(4).jpg",
    "../assets/weather/Rainy/rainy%20(5).jpg",
    "../assets/weather/Rainy/rainy%20(6).jpg",
  ],
  Snowy: [
    "../assets/weather/Snowy/snowy%20(1).jpg",
    "../assets/weather/Snowy/snowy%20(2).jpg",
    "../assets/weather/Snowy/snowy%20(3).jpg",
    "../assets/weather/Snowy/snowy%20(4).jpg",
    "../assets/weather/Snowy/snowy%20(5).jpg",
    "../assets/weather/Snowy/snowy%20(6).jpg",
    "../assets/weather/Snowy/snowy%20(7).jpg",
  ],
  Sunny: [
    "../assets/weather/Sunny/sunny%20(1).jpg",
    "../assets/weather/Sunny/sunny%20(2).jpg",
    "../assets/weather/Sunny/sunny%20(3).jpg",
    "../assets/weather/Sunny/sunny%20(4).jpg",
    "../assets/weather/Sunny/sunny%20(5).jpg",
    "../assets/weather/Sunny/sunny%20(6).jpg",
  ],
  Thunder: [
    "../assets/weather/Thunder/thunder%20(1).jpg",
    "../assets/weather/Thunder/thunder%20(2).jpg",
    "../assets/weather/Thunder/thunder%20(3).jpg",
    "../assets/weather/Thunder/thunder%20(4).jpg",
    "../assets/weather/Thunder/thunder%20(5).jpg",
    "../assets/weather/Thunder/thunder%20(6).jpg",
    "../assets/weather/Thunder/thunder%20(7).jpg",
  ],
  Windy: [
    "../assets/weather/Windy/windy%20(1).jpg",
    "../assets/weather/Windy/windy%20(2).jpg",
    "../assets/weather/Windy/windy%20(3).jpg",
    "../assets/weather/Windy/windy%20(4).jpg",
    "../assets/weather/Windy/windy%20(5).jpg",
    "../assets/weather/Windy/windy%20(6).jpg",
  ],
};

const bgContainer = document.getElementById("bg-container");
let images = weatherImages[currentWeather];
let bgInterval;
let index = 0;

// Function to change background

function changeBackground() {
  const images = weatherImages[currentWeather];
  if (!images || images.length === 0) return;
  bgContainer.style.backgroundImage = `url('${images[index]}')`;
  index = (index + 1) % images.length;
}

const API_KEY = "3ecfc6ce7cca0eb7e494dd29e6241ad4";
//const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`;
const cityNameAsResult = document.getElementById("city-name");
const weatherDesc = document.getElementById("weather-desc");
const minTemp = document.getElementById("min-temp");
const maxTemp = document.getElementById("max-temp");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const temperature = document.getElementById("temp");
const inputCity = document.getElementById("city");
const resultContainer = document.querySelector(".result-container");
const errorMsg = document.querySelector(".error-msg");
const overlay = document.getElementById("overlay");
const unitToggle = document.getElementById("unit-toggle");

function getWeather(CITY_NAME) {
  if (!CITY_NAME.trim()) {
    errorMsg.style.visibility = "visible";
    errorMsg.innerText = "Please enter a city name!";
    // resultContainer.style.visibility = "hidden";
    resultContainer.classList.add("hidden");
    resultContainer.style.display = "none";
    overlay.classList.add("hidden");
    unitToggle.classList.add("hidden");
    container.classList.add("hidden");

    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=${currentUnit}`;

  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      if (+data.cod === 404) {
        // city not found
        // resultContainer.style.visibility = "hidden";
        resultContainer.classList.add("hidden");
        resultContainer.style.display = "none";
        overlay.classList.add("hidden");
        unitToggle.classList.add("hidden");
        container.classList.add("hidden");

        errorMsg.style.visibility = "visible";
        errorMsg.innerText = "City not found! Please check the spelling.";
        return;
      }

      // display results
      // resultContainer.style.visibility = "visible";
      resultContainer.classList.remove("hidden");
      resultContainer.style.display = "flex";
      overlay.classList.remove("hidden");
      unitToggle.classList.remove("hidden");
      unitToggle.classList.add("flex");
      container.classList.remove("hidden");
      container.classList.add("flex");

      cityNameAsResult.innerText = data.name.toUpperCase();
      //minTemp.innerText = "Minimum Temperature: " + data.main.temp_min + " °C";
      //maxTemp.innerText = "Max Temperature:" + data.main.temp_max + " °C";
      humidity.innerText = "Humidity: " + data.main.humidity + " %";
      pressure.innerText = "Pressure: " + data.main.pressure + " hPa";
      //temperature.innerText = "Temperature: " + data.main.temp + " °C";
      minTemp.innerText = `Minimum Temperature: ${data.main.temp_min} ${
        currentUnit === "metric" ? "°C" : "°F"
      }`;
      maxTemp.innerText = `Max Temperature: ${data.main.temp_max} ${
        currentUnit === "metric" ? "°C" : "°F"
      }`;
      temperature.innerText = `Temperature: ${data.main.temp} ${
        currentUnit === "metric" ? "°C" : "°F"
      }`;

      weatherDesc.innerText =
        "Description: " +
        data.weather[0].description
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");

      setBackground(data.weather[0].description.toLowerCase());
      showForecast();
      if (data.name && typeof data.name === "string") {
        saveCity(data.name);
      }
      checkWeatherAlert(data.main.temp);
      inputCity.value = ""; // clear input only on success
      dropdown.style.display = "none";
      errorMsg.style.visibility = "hidden";
    })
    .catch((error) => {
      // resultContainer.style.visibility = "hidden";
      resultContainer.classList.add("hidden");
      resultContainer.style.display = "none";

      errorMsg.style.visibility = "visible";
      overlay.classList.add("hidden");
      unitToggle.classList.add("hidden");
      container.classList.add("hidden");

      errorMsg.innerText =
        "Unable to fetch the weather currently. Please try again later.";
      console.error(error);
    });
}

function setBackground(desc) {
  let description = desc;
  switch (true) {
    case description.includes("rain"):
      currentWeather = "Rainy";
      break;
    case description.includes("sun"):
      currentWeather = "Sunny";
      break;
    case description.includes("cloud"):
      currentWeather = "Cloudy";
      break;
    case description.includes("snow"):
      currentWeather = "Snowy";
      break;
    case description.includes("fog"):
      currentWeather = "Fog";
      break;
    case description.includes("thunder"):
      currentWeather = "Thunder";
      break;
    case description.includes("wind"):
      currentWeather = "Windy";
      break;
    default:
      currentWeather = "Sunny";
  }
  if (bgInterval) {
    clearInterval(bgInterval);
  }
  index = 0;
  changeBackground();
  bgInterval = setInterval(changeBackground, 2500);
}

//use Current location
const currentLocation = document.querySelector(".current-location");

currentLocation.addEventListener("click", function () {
  if (navigator.geolocation) {
    // resultContainer.style.visibility = "visible";
    resultContainer.classList.remove("hidden");
    resultContainer.style.display = "flex";
    overlay.classList.remove("hidden");
    unitToggle.classList.remove("hidden");
    unitToggle.classList.add("flex");
    container.classList.remove("hidden");
    container.classList.add("flex");

    errorMsg.style.visibility = "hidden";
    inputCity.value = ""; // Clear input field

    navigator.geolocation.getCurrentPosition(
      (pos) => getWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
      (err) => console.error(err)
    );
  }
});
function getWeatherByCoords(lat, lon) {
  //const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${currentUnit}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      inputCity.value = ""; // Clear input field
      dropdown.style.display = "none";
      errorMsg.style.visibility = "hidden";
      // resultContainer.style.visibility = "visible";
      resultContainer.classList.remove("hidden");
      resultContainer.style.display = "flex";
      overlay.classList.remove("hidden");
      unitToggle.classList.remove("hidden");
      unitToggle.classList.add("flex");
      container.classList.remove("hidden");
      container.classList.add("flex");

      cityNameAsResult.innerText = data.name.toUpperCase();

      humidity.innerText = "Humidity: " + data.main.humidity + " %";
      pressure.innerText = "Pressure: " + data.main.pressure + " hPa";
      minTemp.innerText = `Minimum Temperature: ${data.main.temp_min} ${
        currentUnit === "metric" ? "°C" : "°F"
      }`;
      maxTemp.innerText = `Max Temperature: ${data.main.temp_max} ${
        currentUnit === "metric" ? "°C" : "°F"
      }`;
      temperature.innerText = `Temperature: ${data.main.temp} ${
        currentUnit === "metric" ? "°C" : "°F"
      }`;
      weatherDesc.innerText =
        "Description: " +
        data.weather[0].description
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
      let description = data.weather[0].description.toLowerCase();
      setBackground(description);
      showForecast();
      checkWeatherAlert(data.main.temp);
    })
    .catch((err) => {
      errorMsg.style.visibility = "visible";
      resultContainer.classList.add("hidden");
      resultContainer.style.display = "none";

      overlay.classList.add("hidden");
      unitToggle.classList.add("hidden");
      container.classList.add("hidden");

      errorMsg.innerText =
        "Unable to fetch the weather currently.Please try again later";
    });
}

//implementation of recent searches
let recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];
const recentCitiesList = document.getElementById("recent-cities");

const dropdown = document.getElementById("recent-cities");

function saveCity(city) {
  let cities = JSON.parse(localStorage.getItem("recentCities")) || [];

  // Keep only strings and avoid duplicates
  cities = cities.filter(
    (c) => typeof c === "string" && c.toLowerCase() !== city.toLowerCase()
  );

  cities.unshift(city); // add to front
  if (cities.length > 5) cities.pop(); // keep last 5

  localStorage.setItem("recentCities", JSON.stringify(cities));
  renderDropdown();
}

function renderDropdown() {
  let cities = JSON.parse(localStorage.getItem("recentCities")) || [];
  dropdown.innerHTML = "";

  if (cities.length === 0) {
    dropdown.classList.add("hidden");
    dropdown.style.display = "none";
    return;
  }

  cities.forEach((city) => {
    const li = document.createElement("li");
    li.innerText = city;
    li.className =
      "px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm transition";
    li.addEventListener("click", () => {
      inputCity.value = city;
      CITY_NAME = city;
      dropdown.classList.add("hidden");
      dropdown.style.display = "none";
      getWeather(city);
    });
    dropdown.appendChild(li);
  });

  dropdown.classList.remove("hidden");
  dropdown.style.display = "block";
}

// Hook into your input event
inputCity.addEventListener("change", function () {
  const city = inputCity.value.trim(); // remove extra spaces
  CITY_NAME = city;
  if (!city || city.length === 0 || city === "") {
    errorMsg.style.visibility = "visible";
    errorMsg.innerText = "Please enter a city name!";
    resultContainer.classList.add("hidden");
    resultContainer.style.display = "none";

    overlay.classList.add("hidden");
    unitToggle.classList.add("hidden");
    container.classList.add("hidden");
    return; // stop execution
  }

  // Hide previous error
  errorMsg.style.visibility = "hidden";
  errorMsg.innerText = "";

  // Fetch weather only for valid input
  getWeather(city);
});

inputCity.addEventListener("keydown", function (event) {
  // Check if the pressed key is "Enter"
  if (event.key === "Enter") {
    dropdown.classList.add("hidden");
    dropdown.style.display = "none";
    const city = inputCity.value.trim();
    CITY_NAME = city;

    if (city === "") {
      // Show error if input is empty
      errorMsg.style.visibility = "visible";
      errorMsg.innerText = "Please enter a city name!";
      resultContainer.classList.add("hidden");
      overlay.classList.add("hidden");
      unitToggle.classList.add("hidden");
      container.classList.add("hidden");
      return;
    }

    // Hide error if input is valid
    errorMsg.style.visibility = "hidden";
    errorMsg.innerText = "";

    // Call your weather function
    getWeather(city);
  }
});

// Render dropdown on load
document.addEventListener("DOMContentLoaded", function () {
  renderDropdown();
  // Ensure dropdown is hidden on initial load
  dropdown.style.display = "none";
  // Set focus to body so input does not get focus by default
  document.body.focus();
});

// Show dropdown when input is focused, hide on blur (with delay for click)
inputCity.addEventListener("focus", function () {
  let cities = JSON.parse(localStorage.getItem("recentCities")) || [];
  if (cities.length > 0) {
    dropdown.classList.remove("hidden");
    dropdown.style.display = "block";
  }
});

inputCity.addEventListener("blur", function () {
  setTimeout(() => {
    dropdown.classList.add("hidden");
  }, 150);
});

document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target) && e.target !== inputCity) {
    dropdown.classList.add("hidden");
    dropdown.style.display = "none";
  }
});

//celcius to fahrenheit conversion
let currentUnit = "metric"; // Celsius by default
const celsiusBtn = document.getElementById("celsius-btn");
const fahrenheitBtn = document.getElementById("fahrenheit-btn");

// Toggle function
function setUnit(unit) {
  currentUnit = unit;

  if (unit === "metric") {
    celsiusBtn.classList.add("bg-blue-600", "text-white");
    celsiusBtn.classList.remove("bg-gray-200", "text-gray-800");

    fahrenheitBtn.classList.remove("bg-blue-600", "text-white");
    fahrenheitBtn.classList.add("bg-gray-200", "text-gray-800");
  } else {
    fahrenheitBtn.classList.add("bg-blue-600", "text-white");
    fahrenheitBtn.classList.remove("bg-gray-200", "text-gray-800");

    celsiusBtn.classList.remove("bg-blue-600", "text-white");
    celsiusBtn.classList.add("bg-gray-200", "text-gray-800");
  }

  // Update the weather if a city is already displayed
  const currentCity = cityNameAsResult.innerText;
  if (currentCity) {
    getWeather(currentCity);
  }
}

// Event listeners
celsiusBtn.addEventListener("click", () => setUnit("metric"));
fahrenheitBtn.addEventListener("click", () => setUnit("imperial"));

//Alerts when the weather is extreme
const alertContainer = document.getElementById("weather-alert");
const alertMessage = document.getElementById("alert-message");

function checkWeatherAlert(temp) {
  // Reset alert
  alertContainer.classList.add("hidden");
  alertMessage.innerText = "";

  if (currentUnit === "metric") {
    if (temp >= 40) {
      alertMessage.innerText =
        "⚠️ Extreme heat! Stay hydrated and avoid direct sunlight.";
      alertContainer.classList.remove("hidden");
      alertContainer.classList.add(
        "bg-red-100",
        "border-red-500",
        "text-red-700"
      );
    } else if (temp <= 0) {
      alertMessage.innerText = "❄️ Extreme cold! Keep yourself warm.";
      alertContainer.classList.remove("hidden");
      alertContainer.classList.add(
        "bg-blue-100",
        "border-blue-500",
        "text-blue-700"
      );
    }
  } else {
    // Fahrenheit
    if (temp >= 104) {
      alertMessage.innerText =
        "⚠️ Extreme heat! Stay hydrated and avoid direct sunlight.";
      alertContainer.classList.remove("hidden");
      alertContainer.classList.add(
        "bg-red-100",
        "border-red-500",
        "text-red-700"
      );
    } else if (temp <= 32) {
      alertMessage.innerText = "❄️ Extreme cold! Keep yourself warm.";
      alertContainer.classList.remove("hidden");
      alertContainer.classList.add(
        "bg-blue-100",
        "border-blue-500",
        "text-blue-700"
      );
    }
  }
}

//extended forecast
const container = document.getElementById("forecast-container");
container.classList.add("hidden");

function displayForecast(dailyForecasts) {
  container.innerHTML = "";

  // Add heading dynamically
  const heading = document.createElement("h1");
  heading.innerText = "Forecast for 5 days:";
  heading.className = "text-4xl text-center text-white w-full";
  heading.style.textShadow = "1px 1px 4px rgba(255, 255, 255, 0.6)";
  container.appendChild(heading);

  dailyForecasts.forEach((day) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
            <h3>${day.date}</h3>
            <img src="https://openweathermap.org/img/wn/${day.icon}@2x.png" alt="${day.description}">
            <p>Temp: ${day.temp}°C</p>
            <p>Wind: ${day.wind} m/s</p>
            <p>Humidity: ${day.humidity}%</p>
        `;
    card.classList.add(
      "bg-slate-700",
      "text-white",
      "rounded-2xl",
      "shadow-lg",
      "p-4",
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "w-full",
      "max-w-[180px]",
      "transition",
      "transform",
      "hover:scale-105",
      "hover:shadow-xl"
    );

    container.appendChild(card);
  });
}
async function getForecast() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();

  // Group by date
  const forecastByDay = {};
  data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!forecastByDay[date]) forecastByDay[date] = [];
    forecastByDay[date].push(item);
  });

  return forecastByDay;
}
function getDailySummary(forecastByDay) {
  const dailyForecasts = [];

  for (const date in forecastByDay) {
    const dayData = forecastByDay[date];

    // Take around midday data (12:00:00)
    const midDayData =
      dayData.find((item) => item.dt_txt.includes("12:00:00")) || dayData[0];

    dailyForecasts.push({
      date: date,
      temp: midDayData.main.temp,
      wind: midDayData.wind.speed,
      humidity: midDayData.main.humidity,
      icon: midDayData.weather[0].icon,
      description: midDayData.weather[0].description,
    });
  }

  // Only return next 5 days
  return dailyForecasts.slice(0, 5);
}

async function showForecast() {
  const forecastByDay = await getForecast();
  const dailyForecasts = getDailySummary(forecastByDay);
  displayForecast(dailyForecasts);
}
