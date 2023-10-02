/**
 * @typedef {{
 *  "albumId": number,
 *  "id": number,
 *  "title": string,
 *  "url": string,
 *  "thumbnailUrl": string
 * }} Photo
 */

const URL = "https://jsonplaceholder.typicode.com/photos";
/**
 *  @type {Photo[]}
 */
let photos = [];

/**
 * @returns {Promise<Photo>}
 */
const getPhotos = async () => {
  const limit = 12;
  /**
   *  @type {Photo[]}
   */
  const photos = await (await fetch(URL)).json();
  return photos.slice(0, 12);
};

/**
 * @param {Photo} photo
 */
const getCardHtml = (photo) => `<div class="card m-auto h-full" style="width: 18rem;">
    <img src="${photo.thumbnailUrl}" class="card-img-top" alt="${photo.title} image">
    <div class="card-body">
      <h5 class="card-title">${photo.title}</h5>
    </div>
  </div>`;

/**
 * @param {Photo[]} photos
 * @param {number?} id
 */
const renderCards = (photos, id) => {
  const container = document.getElementById("cards-container");
  const filteredPhotos = id
    ? photos.filter((photo) => photo.id === id)
    : photos;
  const photosCards = filteredPhotos.map(getCardHtml);
  container.innerHTML = photosCards.join("");
};

/**
 * @param {Photo[]} photos
 */
const renderFilterOptions = (photos) => {
  const select = document.getElementById("photos-filter");
  const photosOptions = photos.map(
    (photo) => `<option value="${photo.id}">${photo.title}</option>`
  );
  select.innerHTML = ['<option>Todas</option>', ...photosOptions].join("");
};

const init = async () => {
  photos = await getPhotos();
  renderCards(photos);
  renderFilterOptions(photos);
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("photos-filter")?.addEventListener("change", (e) => {
    renderCards(photos, +e.target.value);
  });
});

init();
