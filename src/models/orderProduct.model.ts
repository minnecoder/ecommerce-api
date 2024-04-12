import mongoose, { Schema } from "mongoose";

const orderProductSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantityOrdered: Number,
  status: {
    type: String,
    enum: [
      "created",
      "picked",
      "shipped",
      "delivered",
      "rejected",
      "backordered",
      "returned",
      "credited",
    ],
    default: "created",
  },
});

export const OrderProduct = mongoose.model("OrderProduct", orderProductSchema);
