import mongoose, { Schema } from "mongoose";

const itemSchema = new mongoose.Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const cartSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  items: [itemSchema],
  totalPrice: Number,
});

export const Cart = mongoose.model("Cart", cartSchema);
