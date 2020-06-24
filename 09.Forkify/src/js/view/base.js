export const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  searchResults: document.querySelector(".results"),
  searchResultsList: document.querySelector(".results__list"),
  searchResultsPages: document.querySelector(".results__pages"),
  recipe: document.querySelector(".recipe"),
  shopping: document.querySelector(".shopping__list"),
  likesMenu: document.querySelector(".likes__field"),
  likesList: document.querySelector(".likes__list"),
};

const elementStrings = {
  loader: "loader",
};

export const renderLoaderSpinner = (parent) => {
  const loader = `
    <div class="${elementStrings.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
  `;
  parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};
