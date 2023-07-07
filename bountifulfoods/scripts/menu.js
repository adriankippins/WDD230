document.addEventListener('DOMContentLoaded', (event) => {
  const specialDrinksSection = document.querySelector('#special-drinks');

  fetch('https://brotherblazzard.github.io/canvas-content/fruit.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(drink => {
        const drinkElement = document.createElement('div');
        drinkElement.classList.add('drink');

        const nameElement = document.createElement('h1');
        nameElement.textContent = drink.name;
        drinkElement.appendChild(nameElement);

        const detailsElement = document.createElement('p');
        detailsElement.textContent = `Total Calories: ${drink.nutritions.calories}`;
        drinkElement.appendChild(detailsElement);

        const nutritionalFactsElement = createNutritionalFacts(drink.nutritions);
        drinkElement.appendChild(nutritionalFactsElement);

        specialDrinksSection.appendChild(drinkElement);
      });
    })
    .catch(error => console.error('Error:', error));
});

function createNutritionalFacts(nutritions) {
  const nutritionalFactsElement = document.createElement('div');
  nutritionalFactsElement.classList.add('nutritional-facts');

  const carbohydratesRow = createNutritionalFactRow('Carbohydrates:', nutritions.carbohydrates);
  const proteinRow = createNutritionalFactRow('Protein:', nutritions.protein);
  const fatRow = createNutritionalFactRow('Fat:', nutritions.fat);
  const sugarRow = createNutritionalFactRow('Sugar:', nutritions.sugar);

  nutritionalFactsElement.appendChild(carbohydratesRow);
  nutritionalFactsElement.appendChild(proteinRow);
  nutritionalFactsElement.appendChild(fatRow);
  nutritionalFactsElement.appendChild(sugarRow);

  return nutritionalFactsElement;
}

function createNutritionalFactRow(label, value) {
  const row = document.createElement('div');
  row.classList.add('nutritional-fact-row');

  const labelElement = document.createElement('span');
  labelElement.classList.add('nutritional-fact-label');
  labelElement.textContent = label;

  const valueElement = document.createElement('span');
  valueElement.classList.add('nutritional-fact-value');
  valueElement.textContent = ` ${value}`;

  row.appendChild(labelElement);
  row.appendChild(valueElement);

  return row;
}
