import axios from "axios";

const API_URL = "http://localhost:5001/api/v1/locations";

// Fetch locations
export const fetchLocations = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

// Create a new location
export const createLocation = async (locationData) => {
  try {
    const response = await axios.post(API_URL, locationData);
    return response.data; // Assuming the response has a success message or data
  } catch (error) {
    console.error("Error creating location:", error);
    throw error; // Rethrow to handle it in the component
  }
};
