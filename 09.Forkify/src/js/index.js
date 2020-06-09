// Global app controller
import Search from "./models/Search";

/* Global state of the app:
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

const controlSearch = async () => {
  // 1. Get the query from the view
  const query = "pizza"; //TODO
  if (query) {
    // 2. Create new search object and add to state
    state.search = new Search(query);

    // 3. Prepare the UI

    // 4. Search for recipes
    await state.search.getResults(); // This returns a Promise
    console.log(state.search.recipes);

    // 5. Render results on the UI
  }
};

// Event Listener for the search form
document.querySelector(".search").addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
