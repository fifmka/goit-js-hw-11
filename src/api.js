import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com';
const KEY = '30991696-519a4b1ee3d2e3a1698f60a04';

export default class NewsApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  async fetchPhoto() {
    try {
      const response = await axios.get(`/api/`, {
        params: {
          key: KEY,
          q: this.searchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: this.per_page,
          page: this.page,
        },
      });
      this.page += 1;
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
