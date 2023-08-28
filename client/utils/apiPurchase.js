import axios from "axios";

const API_URL = 'http://localhost:5000/api';

export const purchase = async (userId, cart) => {
    try {
        const res = await axios.post(`${API_URL}/purchase`, { userId, cart });
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
