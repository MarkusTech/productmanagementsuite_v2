import axios from "axios";

const API_URL = "http://localhost:5001/api/v1/inventory";

export const fetchInventories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching inventories:", error);
    throw error;
  }
};
