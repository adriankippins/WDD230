document.addEventListener("DOMContentLoaded", () => {
    const currentTemp = document.querySelector('#current-temp');
    const weatherIcon = document.querySelector('#weather-icon');
    const captionDesc = document.querySelector('figcaption');
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Fairbanks&units=imperial&appid=e1ffd8f4f1e0f0124da9f6c2bfa13c74";
    apiFetch(url).then(data => displayWeatherInfo(currentTemp, weatherIcon, captionDesc, data));
});

async function apiFetch(url) {
    let data;
    try {
        const response = await fetch(url);
        if (response.ok) {
            data = await response.json();
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
        return null;
    }
    return data;
}

function displayWeatherInfo(currentTemp, weatherIcon, captionDesc, weatherData) {
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;
    const iconSrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    weatherIcon.setAttribute('src', iconSrc);
    captionDesc.textContent = capitalizeWords(weatherData.weather[0].description);
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

//Date in Footer

const currentTimeEl = document.getElementById("currentTime");
const currentYearEl = document.getElementById("currentYear");

const currentDate = new Date();
const formattedDate = currentDate.toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
});

currentTimeEl.innerText = formattedDate;
currentYearEl.innerText = currentDate.getFullYear();