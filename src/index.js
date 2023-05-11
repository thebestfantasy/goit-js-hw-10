import './css/styles.css';


const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

searchInput.addEventListener('input', onInput);

function onInput(evt) {
    evt.preventDefault();
    let countryName = evt.currentTarget.value.trim();
    fetchCountries(countryName)
    .then((data) => createMarkupCountry(data))
    .catch((err) => console.log(err));
};

function fetchCountries(name) {
    const BASE_URL = 'https://restcountries.com/v3.1/translation';
    const FILTER = '?fields=name,capital,languages,population,flags';

    return fetch(`${BASE_URL}/${FILTER}`)
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(resp.statusText);
            }
            
            return resp.json();
        });
};

function createMarkupCountry(arr) {
    return arr.map(({flags : svg, name : common}) => `<li><img src="${svg}" alt="${common}" /><p>${common}</p></li>`).join('');
};

function createMarkupCountryInfo(arr) {
    return arr.map().join('');
};