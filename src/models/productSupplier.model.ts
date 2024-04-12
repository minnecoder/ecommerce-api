import mongoose, { Schema } from "mongoose";

const productSupplierSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },

  supplierId: {
    type: Schema.Types.ObjectId,
    ref: "Supplier",
  },
  notes: String,
});

export const ProductSupplier = mongoose.model(
  "ProductSupplier",
  productSupplierSchema,
);
