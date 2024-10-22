import axios from "axios";

const API_URL = "http://localhost:5001/api/v1/users";
const ROLE_API_URL = "http://localhost:5001/api/v1/user-role";

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

// Create user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

// Fetch user by ID
export const fetchUserByID = async (userID) => {
  try {
    const response = await axios.get(`${API_URL}/${userID}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching user.");
  }
};

// Update user by ID
export const updateUser = async (userID, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${userID}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error updating user.");
  }
};

// Fetch all user roles
export const fetchUserRoles = async () => {
  try {
    const response = await axios.get(ROLE_API_URL);
    return response.data.data; // Adjust based on your API response structure
  } catch (error) {
    throw new Error("Error fetching user roles: " + error.message);
  }
};
