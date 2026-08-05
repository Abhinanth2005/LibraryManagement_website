import axios from "axios";

console.log(import.meta.env.VITE_API_URL);

const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFToken",
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
}

console.log(import.meta.env.VITE_API_URL);

api.interceptors.request.use((config) => {
    config.headers["X-CSRFToken"] = getCookie("csrftoken");
    return config;
});

export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,

//   xsrfCookieName: "csrftoken",
//   xsrfHeaderName: "X-CSRFToken",
// });

// export default api;