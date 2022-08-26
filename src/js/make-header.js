import getRefs from './common/refs';
import search from '../images/header/search.svg';
import { page, getTrendingMovies } from './main-page-render.js';
const debounce = require('lodash.debounce');
const refs = getRefs();

addHeaderSearchForm();
chandeLogoLink();
const searchForm = getRefs().searchForm;
searchForm.addEventListener('input', searchMovies);

refs.library.addEventListener('click', onClickLibrary);
refs.home.addEventListener('click', onClickHome);
refs.logoLink.addEventListener('click', onClickLogoLink);
window.addEventListener('resize', debounce(chandeLogoLink, 250));

function onClickLibrary(e) {
  e.preventDefault();
  refs.library.classList.add('current');
  refs.home.classList.remove('current');
  refs.header.classList.remove('home-header-bg');
  refs.header.classList.add('library-header-bg');
  addHeaderBtnList();
  addLogoHover();
}

function onClickHome(e) {
  e.preventDefault();
  goHomePage(e);
  removeLogoHover();
  getTrendingMovies(page);
}

function onClickLogoLink(e) {
  e.preventDefault();
  if (refs.home.classList.contains('current')) {
    return;
  }
  goHomePage();
  removeLogoHover();
  refs.logoLink.classList.remove('logo-link-hover');
  getTrendingMovies(page);
}

function searchMovies(e) {
  console.log(e.currentTarget.elements.search.value);
}

function addHeaderSearchForm() {
  const searchForm = getRefs().searchForm;
  const headerBtnList = getRefs().headerBtnList;

  if (headerBtnList) {
    headerBtnList.remove();
  }
  if (searchForm) {
    return;
  }
  refs.headerContainer.insertAdjacentHTML(
    'beforeend',
    markupHeaderSearchForm()
  );
}

function addHeaderBtnList() {
  const searchForm = getRefs().searchForm;
  const headerBtnList = getRefs().headerBtnList;

  if (searchForm) {
    searchForm.remove();
  }

  if (headerBtnList) {
    return;
  }
  refs.headerContainer.insertAdjacentHTML('beforeend', markupHeaderBtnList());
}

function markupHeaderSearchForm() {
  return `
    <form class="search-form" data-id = "search-form">
    <label class="search-form__field">
    <input class="search-form__input" type="text" name="search" placeholder = 'Movie search' />
    </label>
    <img
        class="search-icon"
        src="${search}"
        width="12"
        height="12"
        alt="logo icon"
      />`;
}

function markupHeaderBtnList() {
  return `<div class="header-btn-list">
  <button class='header-btn' type="button" data-name="Watched">Watched</button>
  <button class='header-btn' type="button" data-name="queue">queue</button>
</div>`;
}

function goHomePage() {
  refs.library.classList.remove('current');
  refs.home.classList.add('current');
  refs.header.classList.add('home-header-bg');
  refs.header.classList.remove('library-header-bg');

  addHeaderSearchForm();
  const searchForm = getRefs().searchForm;
  searchForm.addEventListener('input', searchMovies);
}

function chandeLogoLink() {
  const logoTitle = document.querySelector('.lodo-title');

  if (window.innerWidth < 768 && logoTitle) {
    logoTitle.remove();
  }

  if (logoTitle) {
    return;
  }

  if (window.innerWidth > 768) {
    refs.logoLink.insertAdjacentHTML(
      'beforeend',
      '<p class = "lodo-title"  data-id="logo-item" >Filmoteka</p>'
    );
    return;
  }
}

function addLogoHover() {
  refs.logoLink.addEventListener('mouseover', onMouseover);
  refs.logoLink.addEventListener('mouseout', onMouseout);
}

function removeLogoHover() {
  refs.logoLink.removeEventListener('mouseover', onMouseover);
  refs.logoLink.removeEventListener('mouseout', onMouseout);
}

function onMouseover() {
  refs.logoLink.classList.add('logo-link-hover');
}
function onMouseout() {
  refs.logoLink.classList.remove('logo-link-hover');
}
