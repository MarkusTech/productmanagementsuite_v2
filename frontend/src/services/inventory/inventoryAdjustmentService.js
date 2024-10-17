import axios from "axios";

const API_URL = "http://localhost:5001/api/v1/inventory-adjustment";

export const fetchInventoryAdjustments = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching inventory adjustments:", error);
    throw error;
  }
};

export const createInventoryAdjustment = async (adjustmentData) => {
  try {
    const response = await axios.post(API_URL, adjustmentData);
    return response.data; // Assuming your API returns a success message here
  } catch (error) {
    console.error("Error creating inventory adjustment:", error);
    throw error;
  }
};
