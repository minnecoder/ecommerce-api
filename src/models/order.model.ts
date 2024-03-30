import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
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
