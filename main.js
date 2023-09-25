const apikey = "05b64fc018ea1e7a6dabc119e3cf33b9";


const weatherDataElement = document.getElementById("weather-data")
const cityInputElement = document.getElementById("city-input")

const formElement = document.querySelector("form")



formElement.addEventListener("submit", (event)=>{
    event.preventDefault();
    const cityValue = cityInputElement.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

        if(!response.ok) {
            throw new Error("Network response was not found")
        }

        const data  = await response.json()

        const temperature = Math.round(data.main.temp)
        //        console.log(`The current temp in ${city} is: ` + `${temperature}`)

        const description = data.weather[0].description

        const icon = data.weather[0].icon

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity:${data.main.humidity}%`,
            `Wind speed:${data.wind.speed}m/s`,
        ]


        weatherDataElement.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="icon">`;

        weatherDataElement.querySelector(".temperature").textContent = `${temperature}C`;

        weatherDataElement.querySelector(".description").textContent = description;

        weatherDataElement.querySelector(".details").innerHTML = details.map((detail)=> `<div> ${detail} </div>`).join("");
    } catch (error) {
        
    }

}
