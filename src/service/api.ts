import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_DEFAULT_BASEURL,
  //baseURL: "http://localhost:3333/api",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    "Access-Control-Allow-Headers":
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
  },
});

// api.interceptors.response.use(response => {
//     return response;
// }, error => {
//     if (error.response.status === 401) {
//         if (window.localStorage.getItem('@slwc/genericToken')) {
//             window.localStorage.removeItem('@slwc/genericToken');
//             window.location.reload();
//         }
//     }
//     return error;
// });
