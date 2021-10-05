import axios from 'axios';
import { BASE_URL } from '../setting/apiConfig';


const callApi = (endpoint, method = 'GET', data = null, token = null) => {
  return axios({
    url: `${BASE_URL}/${endpoint}`,
    method,
    data,
    headers: token ? {
      Authorization: `Bearer ${token}`
    } : null,
  });
};


export default callApi;