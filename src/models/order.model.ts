import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
  totalPrice: Number,
  status: {
    type: String,
    enum: [
      "created",
      "pending",
      "picked",
      "shipped",
      "out for delivery",
      "delivered",
    ],
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
