import axios from 'axios';

const server = process.env.REACT_APP_APIBACKEND || 'http://localhost:8080';

const API = {
  get: async (path, body) => axios.get(`${server}${path}`, { params: body }).then((response) => response.data),
  put: (path, body) => axios.put(`${server}${path}`, body).then((response) => response.data),
  post: (path, body) => axios.post(`${server}${path}`, body).then((response) => response.data),
  delete: (path, body) => axios.delete(`${server}${path}`, body).then((response) => response.data),
};

export default API;
