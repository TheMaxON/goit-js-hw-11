// const axios = require('axios');
import axios from 'axios';

export default class ImageSearch {
  constructor() {
    this.baseUrl = 'https://pixabay.com/api/';
    this.apiKey = '34527262-b94b65b29daaf98e2e152eee9';
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    // const apiUrl = `https://pixabay.com/api/?key=${this.apiKey}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;

    try {
      const response = await axios.get(`${this.baseUrl}`, {
        params: {
          key: this.apiKey,
          q: this.searchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: 40,
          page: this.page,
        },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
