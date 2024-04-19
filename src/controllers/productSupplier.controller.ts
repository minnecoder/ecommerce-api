import { NextFunction, Request, Response } from "express";
import { ProductSupplier } from "../models/productSupplier.model";
import { Product } from "../models/product.model";
import { Supplier } from "../models/supplier.model";

export async function getAllProductSuppliers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const allProductSuppliers = await ProductSupplier.find();
    return res.status(200).json({ data: allProductSuppliers });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function getSingleProductSupplier(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const ProductSupplierId = req.params.id;
    const findSingleProductSupplier = await ProductSupplier.findOne({
      _id: ProductSupplierId,
    });

    if (!findSingleProductSupplier) {
      return res
        .status(404)
        .json({ message: "Unable to find any data with that id" });
    }

    return res.status(200).json({ data: findSingleProductSupplier });
  } catch (error) {
    console.error("Error while finding productSupplier:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function createProductSupplier(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const productSupplierData = req.body;
  try {
    const ProductSupplierId = req.params.id;
    const checkExisting = await ProductSupplier.findOne({
      _id: ProductSupplierId,
    });
    if (checkExisting) {
      return res
        .status(400)
        .json({ message: "ProductSupplier already exists" });
    }

    // Check if the Product _id is valid
    const isProductIdValid = await Product.findOne({ _id: req.body.productId });
    if (!isProductIdValid) {
      return res
        .status(400)
        .json({ message: "The given product id is not valid" });
    }

    // Check if the Supplier _id is valid
    const isSupplierIdValid = await Supplier.findOne({
      _id: req.body.supplierId,
    });
    if (!isSupplierIdValid) {
      return res
        .status(400)
        .json({ message: "The given supplier id is not valid" });
    }

    const newProductSupplier = new ProductSupplier(productSupplierData);
    await newProductSupplier.save();

    return res.status(201).json({
      message: "ProductSupplier created successfully",
      data: newProductSupplier,
    });
  } catch (error) {
    console.error("Error  creating productSupplier:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function updateProductSupplier(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const productSupplierId = req.params.id;
  const productSupplierFields = req.body;

  try {
    const updateProductSupplier = await ProductSupplier.findByIdAndUpdate(
      { _id: productSupplierId },
      { $set: productSupplierFields },
      { new: true },
    );
    if (!updateProductSupplier) {
      return res.status(404).json({ message: "ProductSupplier not found" });
    }

    return res.status(200).json({
      message: "ProductSupplier updated successfully",
      productSupplier: updateProductSupplier,
    });
  } catch (error) {
    console.error("Error updating productSupplier:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function deleteProductSupplier(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const productSupplierId = req.params.id;
  try {
    const deletedProductSupplier = await ProductSupplier.findOneAndDelete({
      _id: productSupplierId,
    });

    if (!deletedProductSupplier) {
      return res.status(404).json({ message: "ProductSupplier not found" });
    }

    return res
      .status(200)
      .json({ message: "ProductSupplier deleted successfully" });
  } catch (error) {
    console.error("Error deleting productSupplier:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}
