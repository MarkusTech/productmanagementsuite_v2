import axios from "axios";

const API_URL = "http://localhost:5001/api/v1/adjustment-reason";

// Fetch adjustment reasons
export const fetchAdjustmentReasons = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching adjustment reasons:", error);
    throw error;
  }
};

// Create a new adjustment reason
export const createAdjustmentReason = async (reasonData) => {
  try {
    const response = await axios.post(API_URL, reasonData);
    return response.data;
  } catch (error) {
    console.error("Error creating adjustment reason:", error);
    throw error;
  }
};
