// Global app controller
import { elements, renderLoaderSpinner, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import * as recipeView from "./view/recipeView";
import * as listView from "./view/listView";
import * as likesView from "./view/likesView";
import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import Likes from "./models/Likes";

/* Global state of the app:
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/* SEARCH CONSTROLLER */
const controlSearch = async () => {
  // 1. Get the query from the view
  const query = searchView.getInput();
  if (query) {
    // 2. Create new search object and add to state
    state.search = new Search(query);

    // 3. Prepare the UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoaderSpinner(elements.searchResults);

    try {
      // 4. Search for recipes
      await state.search.getResults(); // This returns a Promise

      // 5. Render results on the UI
      clearLoader();
      searchView.renderResults(state.search.recipes);
    } catch (error) {
      console.error(error);
      clearLoader();
    }
  }
};

// Event Listener for the search form
elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.searchResultsPages.addEventListener("click", (event) => {
  const btn = event.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.recipes, goToPage);
  }
});

/* RECIPE CONSTROLLER */
const controlRecipe = async () => {
  const id = window.location.hash.replace("#", "");
  if (id) {
    // Prepare UI for changes
    recipeView.clearResults();
    renderLoaderSpinner(elements.recipe);

    // Highlight selected item
    if (state.search) {
      searchView.highlightSelected(id);
    }

    // Create new recipe object
    state.recipe = new Recipe(id);
    try {
      // Get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (error) {
      console.error(error);
    }
  }
};

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);

/* LIST CONSTROLLER */
const controlList = () => {
  // Create a new list IF there is nono yet
  if (!state.list) {
    state.list = new List();
  }

  // Add each ingredient to the list and UI
  state.recipe.ingredients.forEach((element) => {
    const item = state.list.addItem(
      element.count,
      element.unit,
      element.ingredient
    );
    listView.renderItem(item);
  });

  // Handle delete and update list item events
  elements.shopping.addEventListener("click", (event) => {
    const id = event.target.closest(".shopping__item").dataset.itemid;

    // Handle the delete button
    if (event.target.matches(".shopping__delete, .shopping__delete *")) {
      // Delete from state
      state.list.deleteItem(id);

      // Delete from UI
      listView.deleteItem(id);
    } else if (event.target.matches(".shopping__count-value")) {
      // Handle he count update
      const val = parseFloat(event.target.value);
      state.list.updateCount(id, val);
    }
  });
};

/* LIKE CONSTROLLER */
const controlLike = () => {
  if (!state.likes) {
    state.likes = new Likes();
  }
  const currentId = state.recipe.id;

  if (!state.likes.isLiked(currentId)) {
    // User has NOT yet liked current recipe
    // Add like to the state
    const newLike = state.likes.addLike(
      currentId,
      state.recipe.title,
      state.recipe.author,
      state.recipe.image
    );

    // Toggle the like button
    likesView.toggleLikeButton(true);

    // Add like to UI list
    likesView.renderLike(newLike);
  } else {
    // User HAS yet liked current recipe
    // Remove like to the state
    state.likes.deleteLike(currentId);

    // Toggle the like button
    likesView.toggleLikeButton(false);

    // Remove like from UI list
    likesView.deleteLike(currentId);
  }
  likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// Restore like recipes on page load
window.addEventListener("load", () => {
  state.likes = new Likes();

  // Restore likes
  state.likes.readStorage();

  // Toggle the menu button
  likesView.toggleLikeMenu(state.likes.getNumLikes());

  // Render the existing likes
  state.likes.likes.forEach((like) => likesView.renderLike(like));
});

// Handling recipe button clicks
elements.recipe.addEventListener("click", (event) => {
  if (event.target.matches(".btn-decrease, .btn-decrease *")) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateServingIngredients(state.recipe);
    }
  } else if (event.target.matches(".btn-increase, .btn-increase *")) {
    state.recipe.updateServings("inc");
    recipeView.updateServingIngredients(state.recipe);
  } else if (event.target.matches(".recipe__btn-add, .recipe__btn-add *")) {
    // Add ingredients to shopping list
    controlList();
  } else if (event.target.matches(".recipe__love, .recipe__love *")) {
    // Like controller
    controlLike();
  }
});
