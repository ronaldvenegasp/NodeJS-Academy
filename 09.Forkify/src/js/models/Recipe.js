import axios from "axios";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const result = await axios(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );
      this.title = result.data.recipe.title;
      this.author = result.data.recipe.publisher;
      this.image = result.data.recipe.image_url;
      this.url = result.data.recipe.source_url;
      this.ingredients = result.data.recipe.ingredients;
    } catch (error) {
      console.error(error);
    }
  }

  calcTime() {
    // Assuming that we need 15 minutes for eachs 3 ingredients
    const numIngredients = this.ingredients.length;
    const periods = Math.ceil(numIngredients / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = [
      "tablespoons",
      "tablespoon",
      "ounces",
      "ounce",
      "teaspoons",
      "teaspoon",
      "cups",
      "pounds",
    ];
    const unitsShort = [
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "tsp",
      "cup",
      "pound",
    ];
    const units = [...unitsShort, "kg", "g"];
    const newIngredients = this.ingredients.map((element) => {
      // Uniform units
      let ingredient = element.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, units[i]);
      });

      // Remove parenthesis
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

      // Parse ingredients into count, unit and ingredient
      const arrIngredient = ingredient.split(" ");
      const unitIndex = arrIngredient.findIndex((el) =>
        unitsShort.includes(el)
      );

      let objIngredient;
      if (unitIndex > -1) {
        // There is a unit
        // Ex. 4 1/2 cups, arrCount is [4, 1/2]
        // Ex. 4 cups, arrCount is [4]
        const arrCount = arrIngredient.slice(0, unitIndex);
        let count;
        if (arrCount.lenght === 1) {
          count = eval(arrIngredient[0].replace("-", "+"));
        } else {
          count = eval(arrIngredient.slice(0, unitIndex).join("+"));
        }
        objIngredient = {
          count,
          unit: arrIngredient[unitIndex],
          ingredient: arrIngredient.slice(unitIndex + 1).join(" "),
        };
      } else if (parseInt(arrIngredient[0], 10)) {
        // There is NO unit but the first element is number
        objIngredient = {
          count: parseInt(arrIngredient[0], 10),
          unit: "",
          ingredient: arrIngredient.slice(1).join(" "),
        };
      } else if (unitIndex === -1) {
        // There is NO unit and NO number inf first position
        objIngredient = {
          count: 1,
          unit: "",
          ingredient,
        };
      }
      return objIngredient;
    });
    this.ingredients = newIngredients;
  }

  updateServings(type) {
    // Servings
    const newServings = type === "dec" ? this.servings - 1 : this.servings + 1;

    // Ingredients
    this.ingredients.forEach((ingredient) => {
      ingredient.count = ingredient.count * (newServings / this.servings);
    });
    this.servings = newServings;
  }
}
