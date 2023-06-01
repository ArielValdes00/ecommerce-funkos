import axios from "axios";

const API_URL = 'http://localhost:4000/api';

export const purchase = async (userId, productId) => {
    try {
        const res = await axios.post(`${API_URL}/purchase`, { userId, productId });
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getCart = async () => {
    try {
        const res = await axios.get(`${API_URL}/cart`)
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}