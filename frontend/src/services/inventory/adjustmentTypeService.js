import axios from "axios";

const API_URL = "http://localhost:5001/api/v1/adjustment-type";

export const fetchAdjustmentTypes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching adjustment types:", error);
    throw error;
  }
};
