import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_DEFAULT_BASEURL!,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  },
});

api.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    if (window.localStorage.getItem('@meuM3nu/genericToken')) {
      window.localStorage.removeItem('@meuM3nu/genericToken');
      window.location.reload();
    }
  }
  return error;
});
export const apiTest = axios.create({
  baseURL: "http://localhost:8443/api",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
})
apiTest.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    if (window.localStorage.getItem('@meuM3nu/genericToken')) {
      window.localStorage.removeItem('@meuM3nu/genericToken');
      window.location.reload();
    }
  }
  return error;
});