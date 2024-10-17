import axios from "axios";

const API_URL = "http://localhost:5001/api/v1/items";

export const fetchItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    throw new Error("Error fetching items: " + error.message);
  }
};

export const createItem = async () => {
  try {
    const response = await axios.post(API_URL);
    return response.data.data;
  } catch (error) {
    throw new Error("Error fetching items: " + error.message);
  }
};
