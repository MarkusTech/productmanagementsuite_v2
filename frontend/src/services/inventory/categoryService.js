import axios from "axios";

export const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:5001/api/v1/categories");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(
      "http://localhost:5001/api/v1/categories",
      categoryData
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
