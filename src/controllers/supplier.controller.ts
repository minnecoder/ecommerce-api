import { NextFunction, Request, Response } from "express";
import { Supplier } from "../models/supplier.model";

export async function getAllSuppliers(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const allSuppliers = await Supplier.find();
        return res.status(200).json({ data: allSuppliers });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function getSingleSupplier(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const SupplierId = req.params.id;
        const findSingleSupplier = await Supplier.findOne({ _id: SupplierId });

        if (!findSingleSupplier) {
            return res
                .status(404)
                .json({ message: "Unable to find any data with that id" });
        }

        return res.status(200).json({ data: findSingleSupplier });
    } catch (error) {
        console.error("Error while finding supplier:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function createSupplier(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const supplierData = req.body;
    try {
        const SupplierId = req.params.id;
        const checkExisting = await Supplier.findOne({ _id: SupplierId });
        if (checkExisting) {
            return res.status(400).json({ message: "Supplier already exists" });
        }
        const newSupplier = new Supplier(supplierData);
        await newSupplier.save();

        return res
            .status(201)
            .json({ message: "Supplier created successfully", data: newSupplier });
    } catch (error) {
        console.error("Error  creating supplier:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function updateSupplier(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const supplierId = req.params.id;
    const supplierFields = req.body;

    try {
        const updateSupplier = await Supplier.findByIdAndUpdate(
            { _id: supplierId },
            { $set: supplierFields },
            { new: true },
        );
        if (!updateSupplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }

        return res.status(200).json({
            message: "Supplier updated successfully",
            supplier: updateSupplier,
        });
    } catch (error) {
        console.error("Error updating supplier:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function deleteSupplier(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const supplierId = req.params.id;
    try {
        const deletedSupplier = await Supplier.findOneAndDelete({ _id: supplierId });

        if (!deletedSupplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }

        return res.status(200).json({ message: "Supplier deleted successfully" });
    } catch (error) {
        console.error("Error deleting supplier:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}
