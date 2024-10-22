import axios from "axios";

const API_URL = "http://localhost:5001/api/v1/inventory-adjustment";
const INVENTORY_URL = "http://localhost:5001/api/v1/inventory";
const ADJUSTMENT_TYPE_URL = "http://localhost:5001/api/v1/adjustment-type";
const ADJUSTMENT_REASON_URL = "http://localhost:5001/api/v1/adjustment-reason";

export const fetchInventoryAdjustments = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching inventory adjustments:", error);
    throw error;
  }
};

export const fetchInventoryAdjustmentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory adjustment:", error);
    throw error;
  }
};

export const createInventoryAdjustment = async (adjustmentData) => {
  try {
    const response = await axios.post(API_URL, adjustmentData);
    return response.data;
  } catch (error) {
    console.error("Error creating inventory adjustment:", error);
    throw error;
  }
};

export const updateInventoryAdjustment = async (id, adjustmentData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, adjustmentData);
    return response.data;
  } catch (error) {
    console.error("Error updating inventory adjustment:", error);
    throw error;
  }
};

// New service functions
export const fetchInventories = async () => {
  try {
    const response = await axios.get(INVENTORY_URL);
    return response.data.data; // Adjust based on your API response structure
  } catch (error) {
    console.error("Error fetching inventories:", error);
    throw error;
  }
};

export const fetchAdjustmentTypes = async () => {
  try {
    const response = await axios.get(ADJUSTMENT_TYPE_URL);
    return response.data.data; // Adjust based on your API response structure
  } catch (error) {
    console.error("Error fetching adjustment types:", error);
    throw error;
  }
};

export const fetchAdjustmentReasons = async () => {
  try {
    const response = await axios.get(ADJUSTMENT_REASON_URL);
    return response.data.data; // Adjust based on your API response structure
  } catch (error) {
    console.error("Error fetching adjustment reasons:", error);
    throw error;
  }
};
