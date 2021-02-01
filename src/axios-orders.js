import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://my-react-burger-3a6af-default-rtdb.firebaseio.com/'
});

export default instance;