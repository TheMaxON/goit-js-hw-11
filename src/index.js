import './css/styles.css';
import Notiflix from 'notiflix';
import ImageSearch from './js/fetchImages';
import InfiniteAjaxScroll from '@webcreate/infinite-ajax-scroll';

const refs = {
  searchForm: document.querySelector('#search-form'),
  searchInput: document.querySelector('[name="searchQuery"]'),
  searchBtn: document.querySelector('[name="searchBtn"]'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  loadMoreBtnPending: document.querySelector('.pending-btn'),
};

const imageSearch = new ImageSearch();
refs.searchForm.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onFormSubmit(e) {
  e.preventDefault();

  const searchQuery = refs.searchInput.value.trim();
  if (searchQuery === '') {
    Notiflix.Notify.failure('Please enter your query.');
    return;
  }

  imageSearch.searchQuery = searchQuery;
  imageSearch.resetPage();
  clearMarkups();
  imageAPICall();
}

async function imageAPICall() {
  await imageSearch.fetchImages().then(response => {
    const { hits, totalHits } = response.data;
    console.log(totalHits);

    if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }

    galleryMarkup(hits);
  });
}

function galleryMarkup(images) {
  const imagesGrid = images
    .map(
      ({
        webformatURL,
        largeImageURL,
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
    )
    .join('');

  refs.galleryEl.insertAdjacentHTML('beforeend', imagesGrid);
  refs.loadMoreBtn.classList.remove('disabled');
  refs.loadMoreBtnPending.classList.add('disabled');
}

function onLoadMore() {
  refs.loadMoreBtn.classList.add('disabled');
  refs.loadMoreBtnPending.classList.remove('disabled');
  imageSearch.incrementPage();
  imageAPICall();
}

function clearMarkups() {
  refs.galleryEl.innerHTML = '';
  refs.loadMoreBtn.classList.add('disabled');
}
