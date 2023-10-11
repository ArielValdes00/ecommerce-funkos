import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export const getProducts = async (limit) => {
    try {
        const response = await axios.get(`${API_URL}?limit=${limit}`);
        if (!response) {
            console.log("No products available");
            return [];
        }
        return response.data;

    } catch (error) {
        console.log(error);
        return [];
    }
};

export const createProducts = async (formData, userRole) => {
    try {
        const response = await axios.post(`${API_URL}`, formData, userRole);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteProducts = async (id, userRole) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, userRole);
        return response.data.message;
    } catch (error) {
        console.log(error);
    }
};


export const updateProduct = async (id, productData, userRole) => {
    try {
        const { image, ...data } = productData;
        const updatedProductData = { ...data };
        const response = await axios.put(`${API_URL}/${id}`, updatedProductData, userRole);

        if (response.status === 200) {
            return { success: true, message: 'Product updated successfully', product: response.data.product };
        } else {
            return { success: false, message: 'Error updating the product' };
        }
    } catch (error) {
        return { success: false, message: 'An error occurred while processing your request' };
    }
};


export const uploadImage = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}`, formData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;

    }
}
export const deleteImage = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getProduct = async (name) => {
    try {
        const response = await axios.get(`${API_URL}/${name}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
