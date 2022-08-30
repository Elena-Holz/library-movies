export default function getRefs() {
  return {
    loader: document.querySelector('.loader'),
    preloader: document.querySelector('.preloader'),
    moviesGallery: document.querySelector('.movies-gallery__list'),
    header: document.querySelector('.header'),
    headerContainer: document.querySelector('.header-container'),
    library: document.querySelector('[data-name="library"]'),
    home: document.querySelector('[data-name="Home"]'),
    searchForm: document.querySelector('.search-form'),
    headerBtnList: document.querySelector('.header-btn-list'),
    logoLink: document.querySelector('.logo-link'),
    modal: document.querySelector('.modal'),
    logoIcon: document.querySelector('.logo-icon'),
    closeModalBtn: document.querySelector('.modal-btn'),
    modalContainerBtn: document.querySelector('.modal-block__btn'),
    watchedBtn: document.querySelector('.modal-btn__addwatch'),
    queueBtn: document.querySelector('.modal-btn__accent'),
    queueBtn: document.querySelector('.modal-btn__addqueue'),
    logoIcon: document.querySelector('.logo-icon'),
    authForm: document.querySelector('.auth-form'),
    authBackdrop: document.querySelector('.auth-backdrop'),
    trendingBtn: document.querySelector('.trending-btn'),
    tvBtn: document.querySelector('.tv-btn'),
    topRatedBtn: document.querySelector('.top-rated-btn'),
    upcomingBtn: document.querySelector('.upcoming-btn'),
    btnFilter: document.querySelector('.filter-btn'),
    yearFilter: document.querySelector('#yearFilter'),
    genreFilter: document.querySelector('#genreFilter'),
    filterInput: document.querySelectorAll('.filter-input'),
    backToTopBtn: document.querySelector('.back-to-top-btn'),
    emptyCard: document.querySelector('.empty-card'),
    moviesGalleryContainer: document.querySelector('.movies-gallery'),
    teamRef: document.querySelector('.footer__link'),
    closeBtnRef: document.querySelector('.modal-team__close-btn'),
    backdropTeamRef: document.querySelector('.backdrop-team'),
    body: document.querySelector('body'),
    backdrop: document.querySelector('.backdrop-modal'),
    container: document.getElementById('tui-pagination-container'),
    logoutBtn: document.querySelector('.logout-btn'),
    nawList: document.querySelector('.naw-list'),
    searchFormInput: document.querySelector('.search-form__input'),
    moviesGalleryItem: document.querySelector('.movies-gallery__item'),
    paginationContainer: document.getElementById('tui-pagination-container'),
  };
}
