import { NextFunction, Request, Response } from "express";
import { OrderProduct } from "../models/orderProduct.model";

export async function getAllOrderProducts(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const allOrderProducts = await OrderProduct.find();
        return res.status(200).json({ data: allOrderProducts });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function getSingleOrderProduct(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const OrderProductId = req.params.id;
        const findSingleOrderProduct = await OrderProduct.findOne({ _id: OrderProductId });

        if (!findSingleOrderProduct) {
            return res
                .status(404)
                .json({ message: "Unable to find any data with that id" });
        }

        return res.status(200).json({ data: findSingleOrderProduct });
    } catch (error) {
        console.error("Error while finding order product:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function createOrderProduct(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const orderProductData = req.body;
    try {
        const OrderProductId = req.params.id;
        const checkExisting = await OrderProduct.findOne({ _id: OrderProductId });
        if (checkExisting) {
            return res.status(400).json({ message: "OrderProduct already exists" });
        }
        const newOrderProduct = new OrderProduct(orderProductData);
        await newOrderProduct.save();

        return res
            .status(201)
            .json({ message: "OrderProduct created successfully", data: newOrderProduct });
    } catch (error) {
        console.error("Error  creating order product:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function updateOrderProduct(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const orderProductId = req.params.id;
    const orderProductFields = req.body;

    try {
        const updateOrderProduct = await OrderProduct.findByIdAndUpdate(
            { _id: orderProductId },
            { $set: orderProductFields },
            { new: true },
        );
        if (!updateOrderProduct) {
            return res.status(404).json({ message: "OrderProduct not found" });
        }

        return res.status(200).json({
            message: "OrderProduct updated successfully",
            orderProduct: updateOrderProduct,
        });
    } catch (error) {
        console.error("Error updating order product:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function deleteOrderProduct(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const orderProductId = req.params.id;
    try {
        const deletedOrderProduct = await OrderProduct.findOneAndDelete({ _id: orderProductId });

        if (!deletedOrderProduct) {
            return res.status(404).json({ message: "OrderProduct not found" });
        }

        return res.status(200).json({ message: "OrderProduct deleted successfully" });
    } catch (error) {
        console.error("Error deleting order product:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}
