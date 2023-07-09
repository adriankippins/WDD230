document.addEventListener('DOMContentLoaded', (event) => {
  fetch('https://brotherblazzard.github.io/canvas-content/fruit.json')
    .then(response => response.json())
    .then(data => {
      const selectElements = [document.getElementById('fruit1'), document.getElementById('fruit2'), document.getElementById('fruit3')];

      selectElements.forEach(selectElement => {
        // Add the default option to each dropdown
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.text = "Please Select";
        selectElement.appendChild(defaultOption);

        // Add the fruit options
        data.forEach(fruit => {
          const option = document.createElement('option');
          option.value = fruit.name;
          option.text = fruit.name;
          option.classList.add('fruit-option');
          selectElement.appendChild(option);
        });
      });
    });
});

function submitForm() {
  const firstName = document.getElementById('firstName').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const fruit1 = document.getElementById('fruit1').value;
  const fruit2 = document.getElementById('fruit2').value;
  const fruit3 = document.getElementById('fruit3').value;
  const specialInstructions = document.getElementById('specialInstructions').value;

  // Check if any of the dropdowns have the "Please Select" option selected
  if (fruit1 === "" || fruit2 === "" || fruit3 === "") {
    alert("Please select a fruit in each dropdown");
    return;  // Stop the function here
  }

  // Check that the selected fruits are unique
  const selectedFruits = [fruit1, fruit2, fruit3];
  const uniqueFruits = [...new Set(selectedFruits)];

  if (uniqueFruits.length !== selectedFruits.length) {
    alert("Please select different fruits in each dropdown");
    return;  // Stop the function here
  }

  // Calculate nutritional values
  fetch('https://brotherblazzard.github.io/canvas-content/fruit.json')
    .then(response => response.json())
    .then(data => {
      const nutritions = {carbohydrates: 0, protein: 0, fat: 0, calories: 0, sugar: 0};

      selectedFruits.forEach(selectedFruit => {
        const fruit = data.find(fruit => fruit.name === selectedFruit);
        Object.keys(nutritions).forEach(key => {
          nutritions[key] += fruit.nutritions[key];
        });
      });

      const outputDiv = document.getElementById('output');
      outputDiv.innerHTML = `
        <p>Name: ${firstName}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Selected fruits: ${fruit1}, ${fruit2}, ${fruit3}</p>
        <p>Special Instructions: ${specialInstructions}</p>
        <p>Order Date: ${new Date().toLocaleDateString()}</p>
        <p>Total Nutritions:</p>
        <p>Carbohydrates: ${nutritions.carbohydrates.toFixed(2)}</p>
        <p>Protein: ${nutritions.protein.toFixed(2)}</p>
        <p>Fat: ${nutritions.fat.toFixed(2)}</p>
        <p>Calories: ${nutritions.calories.toFixed(2)}</p>
        <p>Sugar: ${nutritions.sugar.toFixed(2)}</p>
      `;
    });

  // Increment the submitted drink count
  let submittedDrinksCount = localStorage.getItem('submittedDrinksCount');
  if (submittedDrinksCount === null) {
    submittedDrinksCount = 0;
  }
  submittedDrinksCount++;
  localStorage.setItem('submittedDrinksCount', submittedDrinksCount);

  // Update the displayed submitted drink count
  const submitCountElement = document.getElementById('submitted-drinks-count');
  submitCountElement.textContent = `Total Submitted Drinks: ${submittedDrinksCount}`;
}