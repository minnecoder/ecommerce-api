import mongoose, { Schema } from 'mongoose'

const paymentSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order'
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'Customer'
  },
  total: Number,
  method: {
    type: String,
    enum: ['stripe', 'credit card', 'other']
  },
  status: {
    type: String,
    enum: ['processed', 'paid', 'payment failed']
  }
})

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment
