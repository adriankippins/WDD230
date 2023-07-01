
//Please note I did receive external assistance to get this JS code to work correctly.

const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

window.onload = fetchAndDisplayProphets;

async function fetchAndDisplayProphets() {
    const prophets = await getProphetData();
    displayProphets(prophets);
}

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    return data.prophets;
}

function displayProphets(prophets) {
    const cards = document.querySelector('div.cards'); 
    prophets.forEach((prophet, index) => {
        const card = generateCard(prophet, index);
        cards.appendChild(card);
    });
}

function generateCard(prophet, index) {
    const ordinalNumber = toOrdinalString(index + 1);
    const age = getAge(prophet.birthdate, prophet.death);

    const cardHTML = `
    <section class="card">
        <img src="${prophet.imageurl}" alt="Portrait of ${prophet.name} ${prophet.lastname}" loading="lazy" width="340" height="440">
        <div class="card-body">
            <h2 class="card-title">${prophet.name} ${prophet.lastname} - ${ordinalNumber} Latter-day President</h2>
            <p class="card-text">Age: ${age}</p>
            <p class="card-text">Born on ${prophet.birthdate} in ${prophet.birthplace}</p>
            <p class="card-text">Date of death: ${prophet.death ? prophet.death : 'N/A'}</p>
            <p class="card-text">Years as Prophet: ${prophet.length}</p>
            <p class="card-text">Number of children: ${prophet.numofchildren}</p>
        </div>
    </section>`;

    const template = document.createElement('template');
    template.innerHTML = cardHTML.trim();
    return template.content.firstChild;
}

function toOrdinalString(number) {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = number % 100;
    return number + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

function getAge(birth, death) {
    death = death ? new Date(death) : new Date();
    const birthdate = new Date(birth);
    let age = death.getFullYear() - birthdate.getFullYear();
    if (death.getMonth() < birthdate.getMonth() || 
        (death.getMonth() == birthdate.getMonth() && death.getDate() < birthdate.getDate())) {
        age--;
    }
    return age;
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