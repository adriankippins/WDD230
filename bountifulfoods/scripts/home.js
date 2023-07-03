document.addEventListener('DOMContentLoaded', (event) => {
  const specialDrinksSection = document.querySelector('#special-drinks');

  fetch('https://brotherblazzard.github.io/canvas-content/fruit.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(drink => {
        const drinkElement = document.createElement('div');
        drinkElement.classList.add('drink');

        const nameElement = document.createElement('h3');
        nameElement.textContent = drink.name;
        drinkElement.appendChild(nameElement);

        const detailsElement = document.createElement('p');
        detailsElement.innerHTML = `Family: ${drink.family}<br>Order: ${drink.order}<br>Calories: ${drink.nutritions.calories}`;
        drinkElement.appendChild(detailsElement);

        specialDrinksSection.appendChild(drinkElement);
      });
    })
    .catch(error => console.error('Error:', error));
});


// Weather Data

fetch('https://api.openweathermap.org/data/2.5/forecast?q=Carlsbad,us&units=metric&appid=e1ffd8f4f1e0f0124da9f6c2bfa13c74')
  .then(response => response.json())
  .then(data => {
    const forecastList = data.list;

    // Get the container element for the forecast details
    const forecastContainer = document.getElementById('forecast-details');

    // Iterate over the forecast list and populate the forecast details
    for (let i = 0; i < forecastList.length; i += 8) {
      const forecast = forecastList[i];

      // Get the date and time of the forecast
      const forecastDate = new Date(forecast.dt * 1000);
      const dayName = forecastDate.toLocaleDateString('en-US', { weekday: 'long' });
      const monthName = forecastDate.toLocaleDateString('en-US', { month: 'long' });
      const dayOfMonth = forecastDate.toLocaleDateString('en-US', { day: 'numeric' });

      // Get the temperature and weather conditions
      const temperature = Math.round(forecast.main.temp);
      const conditions = capitalizeFirstLetter(forecast.weather[0].description);

      // Get the weather icon code
      const iconCode = forecast.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

      // Create a forecast card element
      const forecastCard = document.createElement('div');
      forecastCard.classList.add('forecast-card');

      // Populate the forecast card with the date, temperature, conditions, and icon
      forecastCard.innerHTML = `
        <div class="forecast-date">${dayName}, ${monthName} ${dayOfMonth}</div>
        <div class="forecast-temperature">${temperature}°C</div>
        <div class="forecast-conditions">${conditions}</div>
        <img src="${iconUrl}" alt="Weather Icon">
      `;

      // Append the forecast card to the forecast container
      forecastContainer.appendChild(forecastCard);
    }
  })
  .catch(error => {
    console.error('Error fetching forecast data:', error);
  });

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}