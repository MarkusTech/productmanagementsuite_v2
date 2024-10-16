import axios from "axios";

const API_URL = "http://localhost:5001/api/v1/categories";

export const fetchCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
