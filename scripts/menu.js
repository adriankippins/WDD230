// Get the menu button and menu items
var menuButton = document.getElementById('hamburger-btn');
var menuItems = document.getElementById('menuItems');

// Add click event listener to the menu button
menuButton.addEventListener('click', function() {
  // Toggle the active class on the menu items
  menuItems.classList.toggle('active');
});