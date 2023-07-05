fetch('https://api.openweathermap.org/data/2.5/forecast?q=Carlsbad,us&units=metric&appid=e1ffd8f4f1e0f0124da9f6c2bfa13c74')
  .then(response => response.json())
  .then(data => {
    const forecastList = data.list;

    // Get the current date
    const currentDate = new Date();

    // Get the container element for the forecast details
    const weatherArea = document.getElementById('weather-area');

    // Create an array to store unique forecast dates
    const uniqueDates = [];

    // Iterate over the forecast list and populate the forecast details
    forecastList.forEach(forecast => {
      // Get the date of the forecast
      const forecastDate = new Date(forecast.dt * 1000);
      const forecastDateString = forecastDate.toDateString();

      // Check if the forecast date is greater than or equal to the current date
      if (forecastDate >= currentDate && !uniqueDates.includes(forecastDateString)) {
        // Add the forecast date to the unique dates array
        uniqueDates.push(forecastDateString);

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

        // Append the forecast card to the weather area container
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

//Js for Waether
document.addEventListener('DOMContentLoaded', (event) => {
  const specialDrinksSection = document.querySelector('#special-drinks');
  const submittedDrinksCountElement = document.querySelector('#submitted-drinks-count');

  // Retrieve the submitted drink count from local storage or initialize it to 0
  let submittedDrinksCount = localStorage.getItem('submittedDrinksCount');
  if (submittedDrinksCount === null) {
    submittedDrinksCount = 0;
  }

  // Display the submitted drink count
  submittedDrinksCountElement.textContent = `Total Submitted Drinks: ${submittedDrinksCount}`;

  fetch('https://brotherblazzard.github.io/canvas-content/fruit.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(drink => {
        // ... existing code to create drink elements ...

        // Increment the submitted drink count for each drink created
        submittedDrinksCount++;
      });

      // Update and store the submitted drink count in local storage
      submittedDrinksCountElement.textContent = `Total Submitted Drinks: ${submittedDrinksCount}`;
      localStorage.setItem('submittedDrinksCount', submittedDrinksCount);
    })
    .catch(error => console.error('Error:', error));
});

//JS for Weasther Cards Home Page
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

        const detailsElement = document.createElement('p');
        detailsElement.innerHTML = `Calories: ${drink.nutritions.calories}<br>Cost: $15 per glass`;
        drinkElement.appendChild(detailsElement);

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
  // Add more conditions for other drink names and their respective image URLs

  // If no specific image is found, you can return a default image URL
  return 'path/to/default.jpg';
}
