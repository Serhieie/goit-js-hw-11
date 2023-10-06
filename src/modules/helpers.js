import { observer } from './observer.js';
import COMMONS from '../modules/commons.js';
import Notiflix from 'notiflix';

function onError(error) {
  COMMONS.loader.classList.add('visually-hidden');
  Notiflix.Notify.failure(`Загрузка неможлива, ${error} 🤷‍♂️`);
  return observer.unobserve(COMMONS.guard);
}

function emptyResponse() {
  COMMONS.loader.classList.add('visually-hidden');
  Notiflix.Notify.failure(`Упс, щось пішло не так ☠️. Введіть щось інше. `);
  resetPageAndContainer();
  const erorItem = `<img src="https://static.thenounproject.com/png/1269202-200.png"
  style=" margin: 0 auto; margin-top: 75px;" alt="placeholder" width="400"/>`;
  COMMONS.container.insertAdjacentHTML('beforeend', erorItem);
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
