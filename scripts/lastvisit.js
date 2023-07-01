document.addEventListener("DOMContentLoaded", function() {
    if (typeof(Storage) !== "undefined") {
      const currentDate = new Date();
      const currentDay = Math.floor(currentDate.getTime() / (24 * 60 * 60 * 1000)); 

      let lastVisitDay = localStorage.getItem("lastVisitDay");
    
      if (lastVisitDay) {
        const daysSinceLastVisit = currentDay - parseInt(lastVisitDay);
    
        const daysElement = document.getElementById("daysSinceLastVisit");
        daysElement.textContent = `Days since last visit: ${daysSinceLastVisit}`;
      }
      localStorage.setItem("lastVisitDay", currentDay.toString());
    }
  });