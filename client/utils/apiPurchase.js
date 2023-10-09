import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const purchase = async (userId, order) => {
    try {
        const res = await axios.post(`${API_URL}/purchase`, { userId, order });
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getUserPurchaseHistory = async (userId) => {
    try {
        const response = await axios.post(`${API_URL}/getUserPurchaseHistory`, { userId });
        return response.data.purchaseHistory;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getMostSoldProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/getMostSoldProducts`);
        return response.data.mostSoldProducts;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getAllSales = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllSales`);
        return response.data.allSales;
    } catch (error) {
        console.log(error);
    }
}

