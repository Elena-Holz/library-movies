import getRefs from './common/refs';
const refs = getRefs();

const loader = getRefs().loader;

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}
