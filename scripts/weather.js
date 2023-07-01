fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/georgetown%20guyana?unitGroup=metric&key=7VZBR9QQ78M7G9R9HKPWV322E&contentType=json")
  .then(response => response.json())
  .then(data => {
    const temperature = data.currentConditions.temp;
    const conditions = data.currentConditions.conditions;
    const icon = data.currentConditions.icon;

    const temperatureElement = document.getElementById('temperature');
    const conditionsElement = document.getElementById('conditions');
    const iconElement = document.getElementById('weather-icon');

    temperatureElement.textContent = `Temperature: ${temperature}°C`;
    conditionsElement.textContent = `Conditions: ${conditions}`;
    if (iconElement) {
      iconElement.src = icon;
      iconElement.alt = 'weather-icon';
    }
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
  });