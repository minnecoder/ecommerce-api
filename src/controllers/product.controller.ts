import { Request, Response, NextFunction } from "express";
import { Product } from "../models/product.model";

export async function getAllProducts(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const allProducts = await Product.find();

    return res.status(200).json({ data: allProducts });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function getSingleProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const ProductId = req.params.id;
    const findSingleProduct = await Product.findOne({ _id: ProductId });

    if (!findSingleProduct) {
      return res.status(400).json({ message: "Unable to find any data" });
    }

    return res.status(200).json({ data: findSingleProduct });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const productData = req.body;
  try {
    const newProduct = new Product(productData);
    await newProduct.save();
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const productId = req.params.id;
  const updateFields = req.body;

  try {
    const updateProduct = await Product.findByIdAndUpdate(
      { _id: productId },
      { $set: updateFields },
      { new: true },
    );
    if (!updateProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: updateProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function deleteProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.findOneAndDelete({ _id: productId });
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}
