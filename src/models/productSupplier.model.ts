import mongoose, { Schema } from "mongoose";

const productSupplierSchema = new mongoose.Schema({

  _id: Schema.Types.ObjectId,
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },

  supplierId: {
    type: Schema.Types.ObjectId,
    ref: 'Supplier'
  },
  notes: String
})

const ProductSupplier = mongoose.model('ProductSupplier', productSupplierSchema)

module.exports = ProductSupplier
