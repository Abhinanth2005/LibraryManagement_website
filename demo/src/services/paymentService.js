import axios from "axios";

const API = import.meta.env.VITE_API_URL

export const createCheckoutSession = async (bookId) => {

    const token = localStorage.getItem("access");

    const response = await axios.post(
        `${API}/checkout/${bookId}/`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};