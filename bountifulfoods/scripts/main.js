//Script for the hamburger button in the nav.

function toggleMenu() {
  const navContainer = document.getElementById("navcontainer");
  navContainer.classList.toggle("open");
  
  if (navContainer.classList.contains("open")) {
    // Menu is open, so set height to auto
    navContainer.style.height = "auto";
  } else {
    // Menu is closed, so set height back to initial value
    navContainer.style.height = "50px";
  }
}

const menuButton = document.getElementById('menubtn');
menuButton.addEventListener('click', toggleMenu);


//Script to update the date in header and footer.
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

//Lazy Loading

document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages = document.querySelectorAll(".lazyload");
  var imageObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var image = entry.target;
        image.src = image.dataset.src;
        image.classList.remove("lazyload");
        imageObserver.unobserve(image);
      }
    });
  });

  lazyloadImages.forEach(function(image) {
    imageObserver.observe(image);
  });
});