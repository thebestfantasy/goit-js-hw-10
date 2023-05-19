import './css/styles.css';
import fetchCountries from './js/fetchCountries.js';
import createMarkupCountry from './js/createMarkup.js';
import createMarkupCountryInfo from './js/createMarkup.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");
const BASE_URL = 'https://restcountries.com/v3.1';
const FILTER = '?fields=name,capital,languages,population,flags';
const END_POINT = 'translation';

searchInput.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

/**
 * input search function from api
 * @param {*} evt 
 */
function onInput(evt) {
    evt.preventDefault();
    let countryName = evt.target.value.trim();
    const urlQuery = (`${BASE_URL}/${END_POINT}/${countryName}${FILTER}`);
    fetchCountries(urlQuery)
        .then((data) => {
            if (data.length === 1) {
                deleteMarkup();
                countryInfo.innerHTML = createMarkupCountryInfo(data);
            } else if (data.length > 1 && data.length <= 10) {
                deleteMarkup();
                countryList.innerHTML = createMarkupCountry(data);
            } else {
                deleteMarkup();
                Notify.info('Too many matches found. Please enter a more specific name.');
            }
        }
        )
        .catch((err) => Notify.failure(`${err}`));
};

/**
 * cleaning function
 * @param {*} 
 */
function deleteMarkup() {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    return
}