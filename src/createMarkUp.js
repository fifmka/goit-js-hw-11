export default function createMarkUpPhoto(gallery, photos = []) {
  let markUp = photos
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<a href="${largeImageURL}">
      <div class="photo-card">
  <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" width="360" height="240" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>
</a>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markUp);
}
