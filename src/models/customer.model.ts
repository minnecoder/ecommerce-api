import mongoose, { Schema } from "mongoose";

const customerSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  address: {
    required: true,
    houseNumber: String,
    city: String,
    state: String,
    zip: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Customer = mongoose.model("Customer", customerSchema);

//module.exports = Customer;
