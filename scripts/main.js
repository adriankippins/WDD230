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

//Date In header
currentTimeEl.textContent = formattedDate;
currentYearEl.textContent = currentDate.getFullYear();

const currentDateElement = document.getElementById("header-date-info");
const currentFormattedDate = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});
currentDateElement.textContent = currentFormattedDate;