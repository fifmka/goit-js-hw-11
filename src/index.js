import './css/styles.css';
import Notiflix from 'notiflix';
import NewsApi from './api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import createMarkUpPhoto from './createMarkUp';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

form.addEventListener('submit', onSubmitForm);
loadMore.addEventListener('click', onLoadMore);

const newsApi = new NewsApi();
let lightbox = new SimpleLightbox('.gallery a');

async function onSubmitForm(e) {
  e.preventDefault();
  loadMore.classList.add('is-hidden');
  if (e.target.tagName !== 'FORM') return;
  clearPhotoList();
  newsApi.query = e.target.elements.searchQuery.value.trim();
  if (!newsApi.query)
    return Notiflix.Notify.info('Sorry, you need to enter a value');
  newsApi.resetPage();
  try {
    let response = await newsApi.fetchPhoto();
    let totalHits = response.data.totalHits;
    if (totalHits > 0)
      Notiflix.Notify.info(`Hooray! We found ${totalHits} images`);
    let setPhotos = response.data.hits;
    if (setPhotos.length === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      createMarkUpPhoto(gallery, setPhotos);
      lightbox.refresh();
      loadMore.classList.remove('is-hidden');
    }
  } catch (error) {
    Notiflix.Notify.failure(`Request error`);
  }
}

async function onLoadMore(e) {
  if (e.target.tagName !== 'BUTTON') return;
  try {
    let response = await newsApi.fetchPhoto();
    let setPhotos = response.data.hits;
    createMarkUpPhoto(gallery, setPhotos);
    lightbox.refresh();
    scrollTo();
    if ((newsApi.page - 1) * newsApi.per_page > response.data.totalHits) {
      loadMore.classList.add('is-hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results"
      );
    }
  } catch (error) {
    Notiflix.Notify.failure(`Request error`);
  }
}

function clearPhotoList() {
  gallery.innerHTML = '';
}

function scrollTo() {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
// Scroll

// let isEnd = false;
// let isPromise = false;
// window.addEventListener('scroll', async () => {
//   const documentRect = document.documentElement.getBoundingClientRect();
//   if (documentRect.bottom < document.documentElement.clientHeight + 150) {
//     if ((newsApi.page - 1) * newsApi.per_page > totalHits) {
//       if (!isEnd) {
//         isEnd = true;
//         Notiflix.Notify.info(
//           "We're sorry, but you've reached the end of search results"
//         );
//       }
//       return;
//     }
//     if (!isPromise) {
//       isPromise = true;
//       let response = await newsApi.fetchPhoto();
//       isPromise = false;
//       let setPhotos = response.data.hits;
//       createMarkUpPhoto(gallery, setPhotos);
//       lightbox.refresh();
//     }
//   }
// });
