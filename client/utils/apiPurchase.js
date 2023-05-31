import axios from "axios";

const API_URL = 'http://localhost:4000/api/purchase';

export const purchase = async (userId, productId) => {
    try {
      const res = await axios.post(API_URL, { userId, productId });
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  