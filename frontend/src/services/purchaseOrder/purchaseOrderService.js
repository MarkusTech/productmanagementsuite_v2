import axios from "axios";

export const fetchPurchaseOrders = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5001/api/v2/purchase-orders"
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching purchase orders:", error);
    throw error;
  }
};

export const createPurchaseOrder = async (purchaseOrderData) => {
  try {
    const response = await axios.post(
      "http://localhost:5001/api/v2/purchase-orders",
      purchaseOrderData
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
