document.addEventListener("DOMContentLoaded", () => {
  const dateSection = document.querySelector("#headerdate p");
  const lastModified = document.querySelector("#lastModified");
  const infoSection = document.querySelector("#info p:first-child");

  const dateOptions = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString("en-US", dateOptions).replace(",", "").capitalize();
  dateSection.textContent = formattedDate;

  const formattedLastModified = new Date(document.lastModified).toLocaleString("en-US", dateOptions);
  lastModified.textContent = `Last modified: ${formattedLastModified}`;

  const year = new Date().getFullYear();
  infoSection.textContent = infoSection.textContent.replace("©", `© ${year}`);
});

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};