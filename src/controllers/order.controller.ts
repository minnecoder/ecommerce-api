import { NextFunction, Request, Response } from "express";
import { Order } from "../models/order.model";
import { Customer } from "../models/customer.model";

export async function getAllOrders(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const allOrders = await Order.find();
    return res.status(200).json({ data: allOrders });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function getSingleOrder(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const OrderId = req.params.id;
    const findSingleOrder = await Order.findOne({ _id: OrderId });

    if (!findSingleOrder) {
      return res
        .status(404)
        .json({ message: "Unable to find any data with that id" });
    }

    return res.status(200).json({ data: findSingleOrder });
  } catch (error) {
    console.error("Error while finding order:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const orderData = req.body;
  try {
    const OrderId = req.params.id;
    const CustomerId = req.body.customerId;

    // Check if there is not already an Order with the same _id
    const checkExisting = await Order.findOne({ _id: OrderId });
    if (checkExisting) {
      return res.status(400).json({ message: "Order already exists" });
    }

    // Verify that the customerId is a valid _id for a Customer
    const customerIsValid = await Customer.findOne({ _id: CustomerId });
    if (!customerIsValid) {
      return res
        .status(404)
        .json({ message: "There is no customer with the given customerId" });
    }

    const newOrder = new Order(orderData);
    await newOrder.save();

    return res
      .status(201)
      .json({ message: "Order created successfully", data: newOrder });
  } catch (error) {
    console.error("Error  creating order:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function updateOrder(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const orderId = req.params.id;
  const orderFields = req.body;

  try {
    const updateOrder = await Order.findByIdAndUpdate(
      { _id: orderId },
      { $set: orderFields },
      { new: true },
    );
    if (!updateOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      message: "Order updated successfully",
      order: updateOrder,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function deleteOrder(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const orderId = req.params.id;
  try {
    const deletedOrder = await Order.findOneAndDelete({ _id: orderId });

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}
