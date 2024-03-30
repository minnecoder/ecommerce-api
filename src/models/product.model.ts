import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,
  images: Array,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
