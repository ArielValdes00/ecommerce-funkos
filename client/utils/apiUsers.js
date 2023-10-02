import axios from "axios";

const API_URL = 'http://localhost:5000/api/users';

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Authentication error');
        }
    }
}


export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        if (!response) {
            console.log("No users available")
            return []
        }
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const getUser = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};


export const deleteUsers = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const updateUser = async (id, updatedUserData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedUserData);
        console.log(response)
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
