import axios from "axios";

const API_URL = 'http://localhost:4000/api/users';

export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        if(!response){
            console.log("No users available")
            return []
        }
        return response.data
    } catch (error) {
        console.error(error)
    }    
}

export const deleteUsers = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}