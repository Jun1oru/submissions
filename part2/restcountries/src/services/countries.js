import axios from 'axios';
const baseUrl =
  'https://studies.cs.helsinki.fi/restcountries/api/all';

const search = (value) => {
  const request = axios
    .get(baseUrl)
    .then((response) => response.data)
    .then((response) => {
      const filter = response.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(value.toLowerCase())
      );
      return filter;
    });
  return request;
};

export default { search };
