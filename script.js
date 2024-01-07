const apikey = "a5d51c85admshb5dbb56d31ef4a6p1fa730jsn3f49a4d870d0";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a5d51c85admshb5dbb56d31ef4a6p1fa730jsn3f49a4d870d0',
		'X-RapidAPI-Host': 'weather338.p.rapidapi.com'
	}
};

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://weather338.p.rapidapi.com/locations/search?query=${cityValue}&language=en-US`);

        if (!response.ok) {
            throw new error("Network reponse was not ok");
        }

        const data = await response.json();

        const temperature = Math.round(data.main.temp);

        const description = data.weather[0].description;

        const icon = data.weather[0].icon;

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`,
        ];

        // weatherDataEl.querySelector(".icon").innerHTML = ``;
        weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;

        weatherDataEl.querySelector(".description") = description;

        weatherDataEl.querySelector(".details").innerHTML = details
        .map((detail) => `<div>${detail}</div>`)
        .join("");

    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description") = 
        "An error happened, please try later";

        weatherDataEl.querySelector(".details").innerHTML = "";
    }
}