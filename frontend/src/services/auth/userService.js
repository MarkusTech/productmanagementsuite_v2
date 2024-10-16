import axios from "axios";

const API_URL = "http://localhost:5001/api/v1/users";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data; // Extract the data array from the response
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

// Create user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data; // Handle the response from the API
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};
