const apiKey = 'ab377f442ee4725bb18ca59d35aab71a'; // Replace with your OpenWeather API key
const weatherCity = document.getElementById('weatherCity');
const weatherDescription = document.getElementById('weatherDescription');
const weatherTemp = document.getElementById('weatherTemp');
const weatherHumidity = document.getElementById('weatherHumidity');
const weatherWind = document.getElementById('weatherWind');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const currentLocationBtn = document.getElementById('currentLocationBtn');
const locationInput = document.getElementById('locationInput');

// Function to fetch weather based on city name
async function fetchWeatherByCity(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    if (data.cod === 200) {
      displayWeather(data);
    } else {
      alert('City not found');
    }
  } catch (error) {
    alert('Error fetching weather data');
  }
}

// Function to fetch weather based on geolocation
async function fetchWeatherByCoords(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert('Error fetching weather data');
  }
}

// Function to display weather data
function displayWeather(data) {
  weatherCity.textContent = data.name;
  weatherDescription.textContent = data.weather[0].description;
  weatherTemp.textContent = data.main.temp;
  weatherHumidity.textContent = data.main.humidity;
  weatherWind.textContent = data.wind.speed;
}

// Event listener for getting weather by city
getWeatherBtn.addEventListener('click', () => {
  const city = locationInput.value.trim();
  if (city) {
    fetchWeatherByCity(city);
  } else {
    alert('Please enter a city name');
  }
});

// Event listener for getting weather by current location
currentLocationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherByCoords(lat, lon);
      },
      () => {
        alert('Unable to retrieve your location');
      }
    );
  } else {
    alert('Geolocation is not supported by your browser');
  }
});
