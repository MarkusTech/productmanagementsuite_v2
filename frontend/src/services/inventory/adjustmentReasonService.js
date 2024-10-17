import axios from "axios";

const API_URL = "http://localhost:5001/api/v1/adjustment-reason";

// Fetch adjustment reasons
export const fetchAdjustmentReasons = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data; // Return the list of adjustment reasons
  } catch (error) {
    console.error("Error fetching adjustment reasons:", error);
    throw error; // Throw error to be handled in the component
  }
};

// Create a new adjustment reason
export const createAdjustmentReason = async (reasonData) => {
  try {
    const response = await axios.post(API_URL, reasonData);
    return response.data; // Assuming the response has a success message or data
  } catch (error) {
    console.error("Error creating adjustment reason:", error);
    throw error; // Rethrow to handle it in the component
  }
};
