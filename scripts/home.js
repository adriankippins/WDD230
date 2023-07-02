fetch("https://api.openweathermap.org/data/2.5/weather?q=Georgetown,Guyana&units=metric&appid=e1ffd8f4f1e0f0124da9f6c2bfa13c74")
  .then(response => response.json())
  .then(data => {
    const temperature = data.main.temp;
    const conditions = capitalizeFirstLetter(data.weather[0].description); // Capitalize the condition
    const windSpeed = data.wind.speed;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

    const temperatureElement = document.getElementById('temperature');
    const conditionsElement = document.getElementById('weather-status').getElementsByTagName('h3')[0];
    const windspeedElement = document.getElementById('wind-speed').getElementsByTagName('span')[0];
    const iconElement = document.getElementById('temperature-div').getElementsByTagName('img')[0];
    const windChillElement = document.getElementById('wind-chill').getElementsByTagName('span')[0];

    temperatureElement.textContent = `${temperature}°C`;
    conditionsElement.textContent = conditions;
    windspeedElement.textContent = `${windSpeed} km/h`;

    if (iconElement) {
      iconElement.src = iconUrl;
      iconElement.alt = 'weather-icon';
    }

    // Calculate wind chill
    const temp = parseFloat(temperature);
    const wSpeed = parseFloat(windSpeed);
    const windchill = (35.74 + (0.6215 * temp)) - (35.75 * Math.pow(wSpeed, 0.16)) + (0.4275 * temp * Math.pow(wSpeed, 0.16));
    const windChill = Math.round(windchill);
    windChillElement.textContent = `${windChill}°C`;
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
  });

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//Spotlight members:
const url = "../scripts/chamber-directory.json";

fetch(url)
  .then(response => response.json())
  .then(data => {
    const spotlight1Div = document.querySelector('.spotlight1');
    const spotlight2Div = document.querySelector('.spotlight2');
    const spotlight3Div = document.querySelector('.spotlight3');
    
    const businesses = data.business;
    const shuffledBusinesses = shuffleArray(businesses);
    const randomBusinesses = shuffledBusinesses.slice(0, 3);

    randomBusinesses.forEach((business, index) => {
      const name = business.name;
      const image = business.img;
      const address = business.address;
      const phone = business.phone;
      const website = business.url;
      const membership = business.membership;

      const memberDiv = document.createElement('div');
      memberDiv.classList.add('member');

      const imageElement = document.createElement('img');
      imageElement.src = `images/${image}`;
      imageElement.alt = `Logo of ${name}`; // Updated alt text
      imageElement.setAttribute('id', 'member-image');
      memberDiv.appendChild(imageElement);

      const nameHeading = document.createElement('h1');
      nameHeading.textContent = name;
      memberDiv.appendChild(nameHeading);

      const addressParagraph = document.createElement('p');
      addressParagraph.textContent = address;
      addressParagraph.setAttribute('id', 'member-p');
      memberDiv.appendChild(addressParagraph);

      const phoneParagraph = document.createElement('p');
      phoneParagraph.textContent = phone;
      phoneParagraph.setAttribute('id', 'member-p');
      memberDiv.appendChild(phoneParagraph);

      const websiteParagraph = document.createElement('p');
      const websiteLink = document.createElement('a');
      websiteLink.href = website;
      websiteLink.textContent = website;
      websiteParagraph.appendChild(websiteLink);
      memberDiv.appendChild(websiteParagraph);

      const membershipParagraph = document.createElement('p');
      membershipParagraph.textContent = `Membership: ${membership}`;
      membershipParagraph.setAttribute('id', 'member-p');
      memberDiv.appendChild(membershipParagraph);

      if (index === 0) {
        spotlight1Div.appendChild(memberDiv);
      } else if (index === 1) {
        spotlight2Div.appendChild(memberDiv);
      } else if (index === 2) {
        spotlight3Div.appendChild(memberDiv);
      }
    });
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });

// Function to shuffle an array using the Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}