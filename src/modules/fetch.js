import axios from 'axios';
import COMMONS from './commons.js';
import { createMarkup } from './markup.js';
import HELPERS from './helpers.js';

async function getImages(page) {
  const input = COMMONS.form.elements['searchQuery'];
  const inputValue = input.value;
  const params = new URLSearchParams({
    key: `${COMMONS.API_KEY_PIXABAY}`,
    q: `${inputValue}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
  });
  try {
    showLoader();
    const response = await fetchData(page, params);
    handleResponse(response);
    return response.data;
  } catch (error) {
    console.log(error);
    HELPERS.onError(error);
  }
}

function handleResponse(response) {
  if (!response.data.hits.length) {
    HELPERS.emptyResponse();
    return;
  }

  if (response.status === 200) {
    HELPERS.successResponse(response);
  }

  createMarkup(response.data);
  hideLoader();
}

function showLoader() {
  COMMONS.loader.classList.remove('visually-hidden');
}
function hideLoader() {
  COMMONS.loader.classList.add('visually-hidden');
}

function fetchData(page, params) {
  const response = axios.get(`${COMMONS.BASE_URL}/?${params}&page=${page}`);
  return response;
}
export default { getImages };
