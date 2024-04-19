import { Request, Response, NextFunction } from "express";
import { Customer } from "../models/customer.model";

export async function getAllCustomers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const allCustomers = await Customer.find();

    return res.status(200).json({
      data: allCustomers,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function getSingleCustomer(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const CustomerId = req.params.id;
    const findSingleCustomer = await Customer.findOne({ _id: CustomerId });

    if (!findSingleCustomer) {
      return res.status(400).json({ message: "Unable to find any data" });
    }

    return res.status(200).json({
      data: findSingleCustomer,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function createCustomer(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const customerData = req.body;
  try {
    const newCustomer = new Customer(customerData);
    await newCustomer.save();
  } catch (error) {
    console.error("Error creating customer:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function updateCustomer(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const customerId = req.params.id;
  const updateFields = req.body;

  try {
    const updateCustomer = await Customer.findByIdAndUpdate(
      { _id: customerId },
      { $set: updateFields },
      { new: true },
    );
    if (!updateCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(200).json({
      message: "Customer updated successfully",
      customer: updateCustomer,
    });
  } catch (error) {
    console.error("Error updating customer:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function deleteCustomer(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const customerId = req.params.id;
  try {
    const deletedCustomer = await Customer.findOneAndDelete({
      _id: customerId,
    });

    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}
