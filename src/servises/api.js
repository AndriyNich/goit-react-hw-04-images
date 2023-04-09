import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

export const loadPictures = async (search, page) => {
  const result = await axios.get('/api/', {
    params: {
      q: search,
      page: page,
      key: '32660703-81d5f2d1cd5893d94cddf879d',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  return result.data;
};
