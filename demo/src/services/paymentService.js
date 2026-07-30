import axios from "axios";

const API = "http://localhost:8000/api";

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