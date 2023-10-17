import { observer } from './observer.js';
import COMMONS from '../modules/commons.js';
import Notiflix from 'notiflix';

function noPhotoMsg() {
  COMMONS.loader.classList.add('visually-hidden');
  Notiflix.Notify.failure(`Упс, більше ми не маємо фото по цьому запросу. `);
  const erorItem = `<div style=" margin: 0 auto; margin-top: 75px; width: 1200px;"> <img src="https://static.thenounproject.com/png/1269202-200.png"
   style=" margin: 0 auto; display: flex;" alt="placeholder" width="400"/></div>`;
  return COMMONS.container.insertAdjacentHTML('beforeend', erorItem);
}

function onError(error) {
  if (error.response.data === '[ERROR 400] "page" is out of valid range.') {
    noPhotoMsg();
    return observer.unobserve(COMMONS.guard);
  }
  COMMONS.loader.classList.add('visually-hidden');
  Notiflix.Notify.failure(`Загрузка неможлива, ${error} 🤷‍♂️`);
  return observer.unobserve(COMMONS.guard);
}

function emptyResponse() {
  noPhotoMsg();
  return observer.unobserve(COMMONS.guard);
}

function successResponse(response) {
  Notiflix.Notify.success(
    `Загрузка успішна! Завантажилося ${
      response.data.hits.length * COMMONS.currentPage
    } фото`
  );
}

function isSearchQueryValid() {
  const searchQuery = COMMONS.form.elements['searchQuery'].value;
  if (!searchQuery) {
    Notiflix.Notify.failure(`Загрузка неможлива, введіть текст`);
    resetPageAndContainer();
    const erorItem = `<img src="https://static.thenounproject.com/png/1269202-200.png"
  style=" margin: 0 auto; margin-top: 75px;" alt="placeholder" width="400"/>`;
    COMMONS.container.insertAdjacentHTML('beforeend', erorItem);
    return false;
  }
  return true;
}

function resetPageAndContainer() {
  COMMONS.currentPage = 0;
  COMMONS.container.innerHTML = '';
}

export default {
  onError,
  successResponse,
  emptyResponse,
  isSearchQueryValid,
  resetPageAndContainer,
};
