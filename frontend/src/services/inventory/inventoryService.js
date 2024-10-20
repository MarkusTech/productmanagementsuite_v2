import axios from "axios";

const API_URL = "http://localhost:5001/api/v1/inventory";

const API_BASE_URL = "http://localhost:5001/api/v1";

// Fetches all inventories
export const fetchInventories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data; // Ensure to return only the necessary data
  } catch (error) {
    console.error("Error fetching inventories:", error);
    throw error; // Propagate the error to the caller
  }
};

// Creates a new inventory item
export const createInventory = async (inventoryData) => {
  try {
    const response = await axios.post(API_URL, inventoryData);
    return {
      success: true,
      data: response.data, // Return the created inventory data
    };
  } catch (error) {
    console.error("Error creating inventory:", error); // Log the error for debugging
    return {
      success: false,
      message: error.response?.data?.message || error.message, // Return a user-friendly error message
    };
  }
};

export const fetchInventoryTypes = async () => {
  const response = await axios.get(`${API_BASE_URL}/inventory-type`);
  return response.data.data;
};

export const fetchLocations = async () => {
  const response = await axios.get(`${API_BASE_URL}/locations`);
  return response.data.data;
};

export const fetchItems = async () => {
  const response = await axios.get(`${API_BASE_URL}/items`);
  return response.data.data;
};
