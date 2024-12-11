const apiKey = '2e888f5a06274c6ca1b6737d07e4a9a2'; 
const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=`; 

const searchBtn = document.getElementById("searchBtn");
const ingredientInput = document.getElementById("ingredientInput");
const recipeResults = document.getElementById("recipeResults");

searchBtn.addEventListener("click", () => {
  const ingredients = ingredientInput.value.trim();
  if (ingredients) {
    fetchRecipes(ingredients);
  } else {
    alert("Please enter some ingredients.");
  }
});

async function fetchRecipes(ingredients) {
  const response = await fetch(apiUrl + ingredients);
  const data = await response.json();
  displayRecipes(data.results);
}

function displayRecipes(recipes) {
  recipeResults.innerHTML = '';
  if (recipes.length === 0) {
    recipeResults.innerHTML = `<p>No recipes found for the given ingredients.</p>`;
    return;
  }

  recipes.forEach(recipe => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">
      <div class="card-content">
        <h3>${recipe.title}</h3>
        <p>Ready in ${recipe.readyInMinutes} mins</p>
        <button class="view-btn" onclick="viewRecipe(${recipe.id})">View Recipe</button>
      </div>
    `;

    recipeResults.appendChild(recipeCard);
  });
}

async function viewRecipe(recipeId) {
  const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`);
  const recipe = await response.json();

  alert(`Recipe: ${recipe.title}\n\nIngredients: ${recipe.extendedIngredients.map(ingredient => ingredient.name).join(', ')}\n\nInstructions: ${recipe.instructions}`);
}
