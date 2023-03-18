export default class ImageSearch {
  constructor() {
    this.apiKey = '34527262-b94b65b29daaf98e2e152eee9';
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const apiUrl = `https://pixabay.com/api/?key=${this.apiKey}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;

    return fetch(apiUrl).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
