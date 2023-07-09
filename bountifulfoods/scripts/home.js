fetch('https://api.openweathermap.org/data/2.5/forecast?q=Carlsbad,us&units=metric&appid=e1ffd8f4f1e0f0124da9f6c2bfa13c74')
  .then(response => response.json())
  .then(data => {
    const forecastList = data.list;
    const currentDate = new Date();
    const weatherArea = document.getElementById('weather-area');
    const uniqueDates = [];

    let imageCounter = 0; // Add this line to initialize the image counter

    forecastList.forEach(forecast => {
      const forecastDate = new Date(forecast.dt * 1000);
      const forecastDateString = forecastDate.toDateString();

      if (forecastDate >= currentDate && !uniqueDates.includes(forecastDateString)) {
        uniqueDates.push(forecastDateString);
        const dayName = forecastDate.toLocaleDateString('en-US', { weekday: 'long' });
        const monthName = forecastDate.toLocaleDateString('en-US', { month: 'long' });
        const dayOfMonth = forecastDate.toLocaleDateString('en-US', { day: 'numeric' });

        const temperature = Math.round(forecast.main.temp);
        const conditions = capitalizeFirstLetter(forecast.weather[0].description);

        const iconCode = forecast.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');

        imageCounter++; // Increment the counter each time you add a new image

        forecastCard.innerHTML = `
          <div class="forecast-date">${dayName}, ${monthName} ${dayOfMonth}</div>
          <div class="forecast-temperature">${temperature}°C</div>
          <div class="forecast-conditions">${conditions}</div>
          <img src="${iconUrl}" alt="Weather image ${imageCounter} representing ${conditions}">
        `;

        weatherArea.appendChild(forecastCard);
      }
    });
  })
  .catch(error => {
    console.error('Error fetching forecast data:', error);
  });

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

document.addEventListener('DOMContentLoaded', (event) => {
  const submittedDrinksCountElement = document.getElementById('submitted-drinks-count');

  // Retrieve the submitted drink count from local storage or initialize it to 0
  let submittedDrinksCount = localStorage.getItem('submittedDrinksCount');
  if (submittedDrinksCount === null) {
    submittedDrinksCount = 0;
  }

  // Display the submitted drink count
  submittedDrinksCountElement.textContent = `Total Submitted Drinks: ${submittedDrinksCount}`;
});



//JS for CTA Top 3 drinks

document.addEventListener('DOMContentLoaded', (event) => {
  const ctaDrinkImages = document.querySelector('#cta-drink-images');

  fetch('https://brotherblazzard.github.io/canvas-content/fruit.json')
    .then(response => response.json())
    .then(data => {
      const topDrinks = data.slice(0, 3); // Get the top 3 drinks from the JSON data

      topDrinks.forEach(drink => {
        const drinkElement = document.createElement('div');
        drinkElement.classList.add('drink');

        const nameElement = document.createElement('h1');
        nameElement.textContent = drink.name;
        drinkElement.appendChild(nameElement);

        const imageElement = document.createElement('img');
        imageElement.src = getDrinkImage(drink.name); // Get the image URL based on the drink name
        imageElement.alt = drink.name;
        drinkElement.appendChild(imageElement);

        const detailsElement = document.createElement('h1'); // Use <h1> for the details
        detailsElement.textContent = 'Details:';
        drinkElement.appendChild(detailsElement);

        const caloriesElement = document.createElement('h1'); // Use <h1> for "Calories"
        caloriesElement.textContent = 'Calories: ' + drink.nutritions.calories;
        detailsElement.appendChild(caloriesElement);

        const costElement = document.createElement('h1'); // Use <h1> for "Cost per Glass"
        costElement.textContent = 'Cost: $15 per glass';
        detailsElement.appendChild(costElement);

        ctaDrinkImages.appendChild(drinkElement);
      });
    })
    .catch(error => console.error('Error:', error));
});

function getDrinkImage(drinkName) {
  // Logic to determine the image URL based on the drink name
  // You can customize this function based on your specific requirements
  if (drinkName === 'Apple') {
    return '../bountifulfoods/images/apple.png';
  } else if (drinkName === 'Apricot') {
    return '../bountifulfoods/images/apricot.png';
  } else if (drinkName === 'Avocado') {
    return '../bountifulfoods/images/avacado.png';
  }

  return 'path/to/default.jpg';
}
