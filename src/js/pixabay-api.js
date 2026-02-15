import axios from 'axios';

const apiKey = '53488466-2fe47a70cbfd22011f3ae89f6';

export default function getImagesByQuery(query) {
  const searchParams = new URLSearchParams({
    key: apiKey,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  return axios
    .get(`https://pixabay.com/api/?${searchParams}`)
    .then(response => {
      return response.data;
    });
}
