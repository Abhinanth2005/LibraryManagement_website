// import axios from "axios";

// console.log(import.meta.env.VITE_API_URL);

// const api = axios.create({
//    baseURL: import.meta.env.VITE_API_URL,
//     withCredentials: true,
// });

// function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) {
//         return parts.pop().split(";").shift();
//     }
// }

// console.log(import.meta.env.VITE_API_URL);

// api.interceptors.request.use((config) => {
//     config.headers["X-CSRFToken"] = getCookie("csrftoken");
//     return config;
// });

// export default api;


import axios from "axios";

console.log(import.meta.env.VITE_API_URL);

const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

// The backend is on a different domain than the frontend, so JS here
// can never read its csrftoken cookie via document.cookie (cross-origin
// cookies aren't visible to JS). Instead we keep the token in memory,
// set from the "csrftoken" field the backend includes in its JSON responses.
let csrfToken = null;

export function setCsrfToken(token) {
    csrfToken = token;
}

api.interceptors.request.use((config) => {
    if (csrfToken) {
        config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
});

// Capture a fresh token from any response that includes one (e.g. /me/, /login/)
api.interceptors.response.use((response) => {
    if (response.data?.csrftoken) {
        csrfToken = response.data.csrftoken;
    }
    return response;
}, (error) => {
    if (error.response?.data?.csrftoken) {
        csrfToken = error.response.data.csrftoken;
    }
    return Promise.reject(error);
});

export default api;