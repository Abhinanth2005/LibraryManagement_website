import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
}

api.interceptors.request.use((config) => {
    config.headers["X-CSRFToken"] = getCookie("csrftoken");
    return config;
});

export default api;