import axios from "axios";

const API_URL = "http://localhost:5001";

export const fetchItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/items`);
    return response.data.data;
  } catch (error) {
    throw new Error("Error fetching items: " + error.message);
  }
};

export const createItem = async (itemData) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/items`, itemData);
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

// Update an item by ID
export const updateItem = async (itemID, itemData) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/v1/items/${itemID}`,
      itemData
    );
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

// Fetch a single item by ID
export const fetchItemByID = async (itemID) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/items/${itemID}`);
    return response.data.data;
  } catch (error) {
    throw new Error("Error fetching item by ID: " + error.message);
  }
};
