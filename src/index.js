import './css/styles.css';
import Notiflix from 'notiflix';
import ImageSearch from './js/fetchImages';

const refs = {
  searchForm: document.querySelector('#search-form'),
  searchInput: document.querySelector('[name="searchQuery"]'),
  searchBtn: document.querySelector('[name="searchBtn"]'),
  galleryEl: document.querySelector('.gallery'),
};

const imageSearch = new ImageSearch();
refs.searchForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const searchQuery = refs.searchInput.value.trim();
  if (searchQuery === '') {
    Notiflix.Notify.failure('Please enter your query.');
    return;
  }

  imageSearch.searchQuery = searchQuery;

  imageSearch.fetchImages().then(response => {
    const images = response.hits;

    if (images.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    imageSearch.resetPage();
    galleryMarkup(images);
    console.log(response);
  });
}

function galleryMarkup(images) {
  const imagesGrid = images.map(
    ({
      webformatURL,
      //   largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      return `
        <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
            <p class="info-item">
            <b>Likes ${likes}</b>
            </p>
            <p class="info-item">
            <b>Views ${views}</b>
            </p>
            <p class="info-item">
            <b>Comments ${comments}</b>
            </p>
            <p class="info-item">
            <b>Downloads ${downloads}</b>
            </p>
        </div>
        </div>`;
    }
  );
  refs.galleryEl.insertAdjacentHTML('beforeend', imagesGrid.join(''));
}
