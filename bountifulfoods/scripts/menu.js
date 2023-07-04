document.addEventListener('DOMContentLoaded', (event) => {
    const specialDrinksSection = document.querySelector('#special-drinks');
  
    fetch('https://brotherblazzard.github.io/canvas-content/fruit.json')
      .then(response => response.json())
      .then(data => {
        data.forEach(drink => {
          const drinkElement = document.createElement('div');
          drinkElement.classList.add('drink');
  
          const nameElement = document.createElement('h3');
          nameElement.textContent = drink.name;
          drinkElement.appendChild(nameElement);
  
          const detailsElement = document.createElement('p');
          detailsElement.innerHTML = `Family: ${drink.family}<br>Order: ${drink.order}<br>Calories: ${drink.nutritions.calories}`;
          drinkElement.appendChild(detailsElement);
  
          const tableElement = createNutritionalFactsTable(drink.nutritions);
          drinkElement.appendChild(tableElement);
  
          specialDrinksSection.appendChild(drinkElement);
        });
      })
      .catch(error => console.error('Error:', error));
  });
  
  function createNutritionalFactsTable(nutritions) {
    const tableElement = document.createElement('table');
    tableElement.classList.add('nutritional-facts');
  
    const tableBody = document.createElement('tbody');
    const totalCaloriesRow = createTableRow('Total Calories', nutritions.calories);
    const carbohydratesRow = createTableRow('Carbohydrates', nutritions.carbohydrates);
    const proteinRow = createTableRow('Protein', nutritions.protein);
    const fatRow = createTableRow('Fat', nutritions.fat);
    const sugarRow = createTableRow('Sugar', nutritions.sugar);
  
    tableBody.appendChild(totalCaloriesRow);
    tableBody.appendChild(carbohydratesRow);
    tableBody.appendChild(proteinRow);
    tableBody.appendChild(fatRow);
    tableBody.appendChild(sugarRow);
  
    tableElement.appendChild(tableBody);
  
    return tableElement;
  }
  
  function createTableRow(label, value) {
    const row = document.createElement('tr');
    const labelCell = document.createElement('td');
    const valueCell = document.createElement('td');
  
    labelCell.textContent = label;
    valueCell.textContent = value;
  
    row.appendChild(labelCell);
    row.appendChild(valueCell);
  
    return row;
  }