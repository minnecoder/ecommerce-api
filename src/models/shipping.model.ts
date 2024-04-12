import mongoose, { Schema } from "mongoose";

const shippingSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
  shippingMethod: String,
  cost: Number,
  address: String,
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
  },
  trackingNumber: String,
});

export const Shipping = mongoose.model("Shipping", shippingSchema);
