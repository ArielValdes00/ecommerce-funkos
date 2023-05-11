import axios from "axios";

const API_URL = 'http://localhost:4000/api/products';

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getProduct = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const createProducts = async (productData) => {
    try {
        const response = await axios.post(`${API_URL}`, productData);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteProducts = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateProducts = async (id, productData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, productData);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const uploadImage = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/upload`, formData);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}