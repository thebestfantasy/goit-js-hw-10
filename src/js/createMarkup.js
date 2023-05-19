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