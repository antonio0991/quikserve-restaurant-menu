import axios from 'axios';

export default axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/',
  headers: {
    'Content-type': 'application/json',
  },
});
