import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

export const Review = mongoose.model("Review", reviewSchema);
