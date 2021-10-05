import axios from 'axios';
import { BASE_URL, TOKEN } from '../setting/apiConfig';

const callApiUser =  (endpoint, method = 'POST') => {
    return axios({
      url: `${BASE_URL}/${endpoint}`,
      method,
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) } //
    });
  };
  export default callApiUser