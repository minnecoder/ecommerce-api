import { NextFunction, Request, Response } from "express";
import { Shipping } from "../models/shipping.model";

export async function getAllShippings(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const allShippings = await Shipping.find();
        return res.status(200).json({ data: allShippings });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function getSingleShipping(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const ShippingId = req.params.id;
        const findSingleShipping = await Shipping.findOne({ _id: ShippingId });

        if (!findSingleShipping) {
            return res
                .status(404)
                .json({ message: "Unable to find any data with that id" });
        }

        return res.status(200).json({ data: findSingleShipping });
    } catch (error) {
        console.error("Error while finding shipping:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function createShipping(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const shippingData = req.body;
    try {
        const ShippingId = req.params.id;
        const checkExisting = await Shipping.findOne({ _id: ShippingId });
        if (checkExisting) {
            return res.status(400).json({ message: "Shipping already exists" });
        }
        const newShipping = new Shipping(shippingData);
        await newShipping.save();

        return res
            .status(201)
            .json({ message: "Shipping created successfully", data: newShipping });
    } catch (error) {
        console.error("Error  creating shipping:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function updateShipping(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const shippingId = req.params.id;
    const shippingFields = req.body;

    try {
        const updateShipping = await Shipping.findByIdAndUpdate(
            { _id: shippingId },
            { $set: shippingFields },
            { new: true },
        );
        if (!updateShipping) {
            return res.status(404).json({ message: "Shipping not found" });
        }

        return res.status(200).json({
            message: "Shipping updated successfully",
            shipping: updateShipping,
        });
    } catch (error) {
        console.error("Error updating shipping:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function deleteShipping(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const shippingId = req.params.id;
    try {
        const deletedShipping = await Shipping.findOneAndDelete({ _id: shippingId });

        if (!deletedShipping) {
            return res.status(404).json({ message: "Shipping not found" });
        }

        return res.status(200).json({ message: "Shipping deleted successfully" });
    } catch (error) {
        console.error("Error deleting shipping:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}
