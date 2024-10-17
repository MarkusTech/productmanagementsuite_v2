import axios from "axios";

const API_URL = "http://localhost:5001/api/v1/inventory-type";

export const fetchInventoryTypes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching inventory types:", error);
    throw error;
  }
};

export const createInventoryType = async (inventoryTypeData) => {
  try {
    const response = await axios.post(API_URL, inventoryTypeData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
