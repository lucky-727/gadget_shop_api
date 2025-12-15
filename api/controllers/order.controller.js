import Order from "../models/order.schema.js";

export const createOrder = async (req, res) => {
  try {
    const orderData = req.body;

    // Basic validation
    if (!orderData?.user?.userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required!",
      });
    }

    // Create order
    const newOrder = await Order.create(orderData);

    return res.status(201).json({
      success: true,
      message: "Order created successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.log("CREATE ORDER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ "user.userId": userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log("GET USER ORDERS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user's orders",
      error: error.message,
    });
  }
};