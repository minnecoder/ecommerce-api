import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  address1: {
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

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
