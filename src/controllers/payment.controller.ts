import { NextFunction, Request, Response } from "express";
import { Payment } from "../models/payment.model";
import { Order } from "../models/order.model";
import { Customer } from "../models/customer.model";

export async function getAllPayments(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const allPayments = await Payment.find();
    return res.status(200).json({ data: allPayments });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function getSinglePayment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const PaymentId = req.params.id;
    const findSinglePayment = await Payment.findOne({ _id: PaymentId });

    if (!findSinglePayment) {
      return res
        .status(404)
        .json({ message: "Unable to find any data with that id" });
    }

    return res.status(200).json({ data: findSinglePayment });
  } catch (error) {
    console.error("Error while finding payment:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function createPayment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const paymentData = req.body;
  try {
    const PaymentId = req.params.id;
    const OrderId = req.body.orderId;
    const CustomerId = req.body.customerId;

    // Check if there is not another Payment with the same _id
    const checkExisting = await Payment.findOne({ _id: PaymentId });
    if (checkExisting) {
      return res.status(400).json({ message: "Payment already exists" });
    }

    // Check if the Order _id is valid
    const isOrderIdValid = await Order.findOne({ _id: OrderId });
    if (!isOrderIdValid) {
      return res
        .status(404)
        .json({ message: "The given order id is not valid" });
    }

    // Check if the Customer _id is valid
    const isCustomerIdValid = await Customer.findOne({ _id: CustomerId });
    if (!isCustomerIdValid) {
      return res
        .status(404)
        .json({ message: " The given customer id is not valid" });
    }

    const newPayment = new Payment(paymentData);
    await newPayment.save();

    return res
      .status(201)
      .json({ message: "Payment created successfully", data: newPayment });
  } catch (error) {
    console.error("Error  creating payment:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function updatePayment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const paymentId = req.params.id;
  const paymentFields = req.body;

  try {
    const updatePayment = await Payment.findByIdAndUpdate(
      { _id: paymentId },
      { $set: paymentFields },
      { new: true },
    );
    if (!updatePayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    return res.status(200).json({
      message: "Payment updated successfully",
      payment: updatePayment,
    });
  } catch (error) {
    console.error("Error updating payment:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function deletePayment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const paymentId = req.params.id;
  try {
    const deletedPayment = await Payment.findOneAndDelete({ _id: paymentId });

    if (!deletedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    return res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.error("Error deleting payment:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}
