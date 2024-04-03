import mongoose, { Schema } from "mongoose";

const supplierSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  address: String,
  city: String,
  state: String,
  zipcode: String,
  phone: String,
  email: String
})

const Supplier = mongoose.model('Supplier', supplierSchema)

module.exports = Supplier
