import {
  getTrendingMovies,
  fetchGenresList,
  getGenresList,
} from './main-page-render.js';
import sprite from '../images/symbol-defs.svg';
import getRefs from './common/refs';
const { moviesGallery } = getRefs();

export const getCardTemplate = (movie, genres) => {
  const {
    title,
    original_name,
    original_title,
    poster_path,
    genre_ids,
    vote_average,
    release_date,
    id,
  } = movie;

  return `
    <li class='movies-gallery__item' data-id='${id}'>
      <div class='movies-gallery__img'>
        <img
          src='${
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://ik.imagekit.io/rqegzjddo/no-poster-avalible.png?ik-sdk-version=javascript-1.4.3&updatedAt=1661766934161'
          }'
          alt='${original_title || original_name}'
          loading='lazy'
          width='395'
        />
      </div>
      <div class='movies-gallery__text'>
        <p class='movies-gallery__title'>${
          title || original_title || original_name
        }</p>
        <p class='movies-gallery__genre ellipsis'>
          ${correctGenres} | ${release_date?.split('-')[0] || '2077'}
        </p>
        <span class='movies-gallery__rating'>${Number(vote_average).toFixed(
          1
        )}</span>
      </div>
    </li>
  `;
};

export const getModalTemplate = (movie, existsInQueueLS, existsInWatchedLS) => {
  const {
    title,
    original_name,
    original_title,
    name,
    poster_path,
    genres,
    popularity,
    vote_average,
    vote_count,
    overview,
  } = movie;
  const genresArr = genres.map(({ name }) => name);
  return `
  <div class="modal container" data-modal>
    <div class="modal-contaner">
      <button class="modal-close" type="button">
        <svg class="modal-btn__icon" width="30" height="30">
            <use href="${sprite}#cross"></use>
        </svg>
      </button>
      <img class="modal-img" src="${
        poster_path
          ? `https://image.tmdb.org/t/p/w500${poster_path}`
          : 'https://ik.imagekit.io/rqegzjddo/no-poster-avalible.png?ik-sdk-version=javascript-1.4.3&updatedAt=1661766934161'
      }" alt="${title}"
      loading='lazy' />
        <div class="modal-block__text">
            <h2 class="modal-title">${title}</h2>
            <ul class="modal-list__key">
                <li class="modal-info">Vote / Votes</li>
                <li class="modal-info modal-info__library"><span class="modal-info__vote">${Number(
                  vote_average
                ).toFixed(
                  1
                )} </span> / <span class="modal-info__votes">${vote_count}</span></li>
            </ul>
              <ul class="modal-list__key">
                <li class="modal-info">Popularity</li>
                <li class="modal-info modal-info__library">${popularity}</li>
            </ul>
              <ul class="modal-list__key">
                <li class="modal-info">Original Title</li>
                  <li class="modal-info modal-info__library">${title.toUpperCase()}</li>
            </ul>
              <ul class="modal-list__key">
                <li class="modal-info">Genre</li>
                <li class="modal-info modal-info__library">${genresArr.join(
                  ', '
                )}</li>
            </ul>
            <ul class="modal-list__library">  
            </ul>
            <h3 class="modal-text__title">About</h3>
            <p class="modal-text__review">${overview}</p>
            <div class="modal-block__btn">
                   <button class="modal-btn__addwatch" type="button">${
                     existsInWatchedLS
                       ? 'remove from watched'
                       : 'add to watched'
                   }
                   </button>
                <button class="modal-btn__addqueue" type="button">${
                  existsInQueueLS ? 'remove from queue' : 'add to queue'
                }</button>
            </div>
        </div>
    </div>
  `;
};

export function secondModalMarkup() {
  return `<div class="modal container" data-modal>
    <div class="modal-contaner">
      <button class="modal-btn" type="button" data-modal-close>
        <svg class="modal-btn__icon" width="30" height="30">
           <use href="${sprite}#cross"></use>
        </svg>
      </button>
      <img class="modal-img" src="images/modal-img.jpg" alt="movies img" />
      <div class="modal-block__text">
        <h2 class="modal-title">A FISTFUL OF LEAD</h2>
        <ul class="modal-list__key">
          <li class="modal-info">Vote / Votes</li>
          <li class="modal-info">Popularity</li>
          <li class="modal-info">Original Title</li>
          <li class="modal-info">Genre</li>
        </ul>
        <ul class="modal-list__library">
          <li class="modal-info__library">Vote / Votes</li>
          <li class="modal-info__library">Popularity</li>
          <li class="modal-info__library">Original Title</li>
          <li class="modal-info__library">Genre</li>
        </ul>
        <h3 class="modal-text__title">About</h3>
        <p>
          Four of the West???s most infamous outlaws assemble to steal a huge
          stash of gold from the most corrupt settlement of the gold rush towns.
          But not all goes to plan one is killed and the other three escapes
          with bags of gold hide out in the abandoned gold mine where they
          happen across another gang of three ??? who themselves were planning to
          hit the very same bank! As tensions rise, things go from bad to worse
          as they realise the bags of gold are filled with lead... they???ve been
          double crossed ??? but by who and how?
        </p>
        <div class="modal-block__btn">
          <button class="modal-btn__addwatch" type="button" data-modal>
            add to watched
          </button>
          <button class="modal-btn__accent" type="button" data-modal>
            add to queue
          </button>
        </div>
      </div>
    </div>
  </div>`;
}

const getGenresNames = (genresIds, genresListObj) => {
  const genresIdList = genresIds.map(genreId => genresListObj[genreId]);
  let genresString = '';

  if (genresIdList.length > 2) {
    genresString = genresIdList.slice(0, 2).join(', ') + ', Other';
  } else {
    genresString = genresIdList.join(', ');
  }
  return genresString;
};

export async function renderGalleryFromTemplate(data) {
  moviesGallery.innerHTML = '';
  try {
    const genresListObj = await getGenresList(data);

    const galleryMarkup = data
      .map(
        ({
          title,
          original_name,
          original_title,
          name,
          poster_path,
          release_date,
          genre_ids,
          popularity,
          vote_average,
          vote_count,
          overview,
          id,
        }) => {
          const genryStr = getGenresNames(genre_ids, genresListObj);
          return `
    <li class='movies-gallery__item' data-id='${id}'>
      <div class='movies-gallery__img'>

  <picture>
  <source
    srcset="https://image.tmdb.org/t/p/w780${poster_path ? poster_path : '/h5oGodvcoq8cyIDTy79yKn4qbey.jpg'
        }"
    media="(min-width: 1280px)"
  />
  <source
    srcset="https://image.tmdb.org/t/p/w500${poster_path ? poster_path : '/h5oGodvcoq8cyIDTy79yKn4qbey.jpg'
        }"
    media="(min-width: 768px)"
  />
  <source
    srcset="https://image.tmdb.org/t/p/w342${poster_path ? poster_path : '/h5oGodvcoq8cyIDTy79yKn4qbey.jpg'
        }"
    media="(min-width: 320px)"
  />
  <img
    srcset="https://image.tmdb.org/t/p/w342${poster_path ? poster_path : '/h5oGodvcoq8cyIDTy79yKn4qbey.jpg'
        }"
    alt="${title || name ||original_title || original_name}"
    loading="lazy"
    width="395"
  />
</picture>

      </div>
      <div class='movies-gallery__text'>
        <p class='movies-gallery__title'>${
          title || name || original_title || original_name
        }</p>
        <p class='movies-gallery__genre ellipsis'>
          ${genryStr} | ${release_date?.split('-')[0] || 'Coming soon'}
        </p>
        <span class='movies-gallery__rating'>${Number(vote_average).toFixed(
          1
        )}</span>
      </div>
    </li>
  `;
        }
      )
      .join('');
    moviesGallery.insertAdjacentHTML('beforeend', galleryMarkup);
  } catch (error) {
    console.log(error.message);
  }
}
