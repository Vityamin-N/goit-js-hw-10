import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import createCountryListItems from './templates/country-list.hbs';
import createCountryInformation from './templates/country-info.hbs';
import getCountryName from './js/fetchCountries';
import './css/styles.css';

const refs = {
    search: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
};
const DEBOUNCE_DELAY = 300;
const onInputDebounced = debounce(onInput, DEBOUNCE_DELAY);

refs.search.addEventListener('input', onInputDebounced);

function onInput(evt) {
const inputValue = evt.target.value.trim();
if (!inputValue) {
    updateCountries();
    return;
}
getCountryName(inputValue).then(onResolve).catch(onReject);
}
function onResolve(countries) {
if (countries.length === 1) {
    createCountryInfo(countries[0]);
    return;
}
if (countries.length > 10) {
    updateCountriesUI();
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
}
createCountryList(countries);
}
function createCountryInfo(country) {
const countryListItem = createCountryListItems(country);
const countryInfo = createCountryInformation(country);
updateCountries(countryListItem, countryInfo);
}
function createCountryList(countries) {
const countriesList = createCountriesListMarkup(countries);
updateCountries(countriesList);
}
function onReject() {
Notify.failure('Oops, there is no country with that name');
updateCountries();
}
function createCountriesListMarkup(array) {
return array.map(createCountryListItems).join('');
}
function updateCountries(listItem = '', infoItem = '') {
refs.list.innerHTML = listItem;
refs.info.innerHTML = infoItem;
}
