import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    // USER DETAILS
    user: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true,
      },
      name: String,
      email: String,
    },

    // CART ITEMS SNAPSHOT
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,
        quantity: Number,
        totalPrice: Number,
        image: String,
        category: String,
      },
    ],

    // PRICING DETAILS
    pricing: {
      itemsTotal: Number,
      shippingFee: Number,
      tax: Number,
      finalAmount: Number,
    },

    // DELIVERY ADDRESS SNAPSHOT
    address: {
      house: String,
      street: String,
      city: String,
      state: String,
      pincode: String,
      phone: String,
      country: String,
      label: String,
    },

    // PAYMENT DETAILS
    payment: {
      method: { type: String, enum: ["COD", "ONLINE"], required: true },
      status: {
        type: String,
        enum: ["PENDING", "PAID", "FAILED"],
        default: "PENDING",
      },
      transactionId: String, // only for online
      razorpayOrderId: String, // only for online
    },

    // ORDER STATUS TRACKING
    status: {
      orderStatus: {
        type: String,
        enum: [
          "PLACED",
          "SHIPPED",
          "OUT_FOR_DELIVERY",
          "DELIVERED",
          "CANCELLED",
        ],
        default: "PLACED",
      },
      placedAt: { type: Date },
      shippedAt: { type: Date },
      deliveredAt: { type: Date },
      cancelledAt: { type: Date },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);