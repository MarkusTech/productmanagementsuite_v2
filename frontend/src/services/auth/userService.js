import axios from "axios";

const API_URL = "http://192.168.1.55:5001/api/v1/users";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data; // Extract the data array from the response
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};
