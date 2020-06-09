import axios from "axios";

export default class Search {
  // API_URL = "https://forkify-api.herokuapp.com/api/";
  constructor(query) {
    this.query = query;
  }
  // Async await function to request the data from the forkify API
  async getResults() {
    try {
      const result = await axios(
        `https://forkify-api.herokuapp.com/api/search?q=${this.query}`
      );
      this.recipes = result.data.recipes;
      //   console.log(this.recipes);
    } catch (error) {
      console.log(error);
    }
  }
}
