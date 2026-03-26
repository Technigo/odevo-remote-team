const shortDescription = document.getElementById("shortDescription")
const temperature = document.getElementById("temperature")
const description = document.getElementById("description")
const icon = document.getElementById("icon")
const errorMessage = document.getElementById("error")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const searchInput = document.getElementById("searchInput")

const apiKey = "1e4a62b378901f147a73ef2f8c6cc9c2"
console.log(apiKey) 
//const lat = 59.3293
//const lon = 18.0686
const baseUrl = "https://api.openweathermap.org/data/2.5/weather"

let city = "Stockholm"

const fetchWeather = (cityName) => {
  const url = `${baseUrl}?q=${cityName}&units=metric&appid=${apiKey}`
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`
  console.log(url)
  
  fetch(url)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    console.log(json)

    // Display city name
    document.getElementById("city").innerText = json.name
    
    // Display temperature
    temperature.innerText = Math.round(json.main.temp) + "°C"
    
    // Display short description (e.g., "Clear", "Rainy")
    shortDescription.innerText = json.weather[0].main
    
    // Display full description (e.g., "clear sky")
    description.innerText = json.weather[0].description
    
    // Display weather icon
    const iconCode = json.weather[0].icon
    icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    
    // Display sunrise and sunset times in local city time
    const timezoneOffset = json.timezone || 0
    const sunriseUTC = new Date(json.sys.sunrise * 1000)
    const sunsetUTC = new Date(json.sys.sunset * 1000)
    
    // Convert to city's local time by adjusting for timezone offset
    const sunriseLocal = new Date(sunriseUTC.getTime() + timezoneOffset * 1000)
    const sunsetLocal = new Date(sunsetUTC.getTime() + timezoneOffset * 1000)
    
    sunrise.innerText = sunriseLocal.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    sunset.innerText = sunsetLocal.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })
  .then(() => fetchForecast(forecastUrl))
  .catch((error) => {
    console.error("Error fetching weather:", error)
    if (errorMessage) {
      errorMessage.innerText = "City not found. Please try again."
    }
  })
}

const fetchForecast = (forecastUrl) => {
  fetch(forecastUrl)
    .then((response) => response.json())
    .then((json) => {
      console.log("Forecast data:", json)
      
      // Get one forecast per day (filter by noon time)
      const dailyForecasts = {}
      json.list.forEach((forecast) => {
        const date = new Date(forecast.dt * 1000).toDateString()
        
        // Keep only the noon forecast for each day
        if (!dailyForecasts[date] || forecast.dt_txt.includes("12:00:00")) {
          dailyForecasts[date] = forecast
        }
      })
      
      // Convert to array and get first 5 days
      const forecastArray = Object.values(dailyForecasts).slice(0, 5)
      
      // Display forecasts
      const forecastContainer = document.getElementById("forecastContainer")
      forecastContainer.innerHTML = ""
      
      forecastArray.forEach((forecast) => {
        const date = new Date(forecast.dt * 1000)
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" })
        const temp = Math.round(forecast.main.temp)
        const iconCode = forecast.weather[0].icon
        const description = forecast.weather[0].main
        
        const forecastItem = document.createElement("div")
        forecastItem.className = "forecast-item"
        forecastItem.innerHTML = `
          <p class="forecast-day">${dayName}</p>
          <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${description}" class="forecast-icon">
          <p class="forecast-temp">${temp}°</p>
          <p class="forecast-desc">${description}</p>
        `
        forecastContainer.appendChild(forecastItem)
      })
    })
    .catch((error) => console.error("Error fetching forecast:", error))
}

// Fetch weather for default city on page load
fetchWeather(city)

// Allow search by pressing Enter
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const searchCity = searchInput.value.trim()
    if (searchCity) {
      fetchWeather(searchCity)
      searchInput.value = ""
    }
  }
})