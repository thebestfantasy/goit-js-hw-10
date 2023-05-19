import './css/styles.css';
import fetchCountries from './js/fetchCountries.js';
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
        .then(data => {
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
        .catch((err) => Notify.failure(`${err} "Oops, there is no country with that name"`));
};

/**
 * drawing markup from 2 to 10 countries
 * @param {*} arr 
 * @returns HTML
 */
export default function createMarkupCountry(arr) {
    return arr.map(({ flags: { svg }, name: { common } }) => `<li class='list'><img src="${svg}" alt="${common}" class="flag" />
    <h2 class='text'>${common}</h2></li>`).join('');
};

/**
 * drawing markup 1 country
 * @param {*} arr 
 * @returns HTML
 */
export default function createMarkupCountryInfo(arr) {
    return arr.map(({ flags: { svg }, name: { common }, capital, population, languages  }) => `<li><img src="${svg}" alt="${common}" class="flag" />
    <h2>${common}</h2><h3>Capital: ${capital}</h3><h3>Popultaion: ${population}</h3><h3>Languages: ${Object.values(languages)}</h3></li>`).join('');
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