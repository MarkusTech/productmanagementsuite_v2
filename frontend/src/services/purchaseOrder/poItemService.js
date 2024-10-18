import axios from "axios";

export const fetchPurchaseOrderItems = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5001/api/v2/purchase-order-items"
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching purchase order items:", error);
    throw error;
  }
};

export const createPurchaseOrderItem = async (purchaseOrderItemData) => {
  try {
    const response = await axios.post(
      "http://localhost:5001/api/v2/purchase-order-items",
      purchaseOrderItemData
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
