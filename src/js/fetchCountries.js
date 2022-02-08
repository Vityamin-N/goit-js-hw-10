export default function fetchCountryName(country) {
    const url = `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,flags,languages`;
    return fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    });
  }