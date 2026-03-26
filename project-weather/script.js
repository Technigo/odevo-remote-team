const shortDescription = document.getElementById("shortDescription")
const temperature = document.getElementById("temperature")
const description = document.getElementById("description")
const icon = document.getElementById("icon")
const errorMessage = document.getElementById("error")

const apiKey = "1e4a62b378901f147a73ef2f8c6cc9c2"
console.log(apiKey) 
//const lat = 59.3293
//const lon = 18.0686
const baseUrl = "https://api.openweathermap.org/data/2.5/weather"

let city = "Stockholm"

const url = `${baseUrl}?q=${city}&appid=${apiKey}`

console.log(url)

//https://api.openweathermap.org/data/3.0/weather?q=Stockholm,Sweden&units=metric&APPID=YOUR_API_KEY
//http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit={limit}&appid={API key}
//https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

const fetchWeather = (city) => {
  // Write logic to fetch weather data from the API and display it on the page
}

fetchWeather(city)