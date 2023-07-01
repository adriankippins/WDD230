Date.prototype.getDayString = function() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[this.getDay()];
};

Date.prototype.getMonthString = function() {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[this.getMonth()];
};

String.prototype.capitalize = function() {
  return this.replace(/\b\w/g, firstChar => firstChar.toUpperCase());
};

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelector(".nav-links");
  const menu = document.querySelector("#menu");
  const date = document.querySelector("#date-section p");
  const dateObj = new Date();
  const lastModified = document.querySelector("#lastModified");
  const fullYear = document.querySelector("#footer-bottom-content p:first-child");

  menu.addEventListener("click", () => navLinks.classList.toggle("responsive-menu"));

  const formattedDate = `${dateObj.getDayString()}, ${dateObj.getDate()} ${dateObj.getMonthString()} ${dateObj.getFullYear()}`.capitalize();
  date.textContent = formattedDate;

  const formattedLastModified = new Date(document.lastModified).toLocaleString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  lastModified.textContent = `Last modified: ${formattedLastModified}`;

  const index = fullYear.textContent.indexOf("©");
  const str = fullYear.textContent.slice(0, index + 1).concat(dateObj.getFullYear());
  fullYear.textContent = str.concat(fullYear.textContent.slice(index + 1));

  const day = dateObj.getDay();
  if (day > 0 && day < 3) {
    const banner = document.createElement("section");
    banner.classList.add("banner");
    const bannerContent = document.createElement("h4");
    bannerContent.textContent = "Come join us for the chamber meet and greet Wednesday at 7:00 pm 🤝🏼";
    banner.appendChild(bannerContent);
    document.querySelector("header").prepend(banner);
  }
});