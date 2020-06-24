import axios from "axios";

export default class Search {
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
    } catch (error) {
      console.error(error);
    }
  }
}
