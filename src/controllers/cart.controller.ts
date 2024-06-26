import { NextFunction, Request, Response } from "express";
import { Cart } from "../models/cart.model";

export async function getAllCarts(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const allCarts = await Cart.find();
    return res.status(200).json({ data: allCarts });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function getSingleCart(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const CartId = req.params.id;
    const findSingleCart = await Cart.findOne({ _id: CartId });

    if (!findSingleCart) {
      return res
        .status(404)
        .json({ message: "Unable to find any data with that id" });
    }

    return res.status(200).json({ data: findSingleCart });
  } catch (error) {
    console.error("Error while finding cart:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function createCart(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const cartData = req.body;
  try {
    const newCart = new Cart(cartData);
    await newCart.save();

    return res
      .status(201)
      .json({ message: "Cart created successfully", data: newCart });
  } catch (error) {
    console.error("Error  creating cart:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function updateCart(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const cartId = req.params.id;
  const cartFields = req.body;

  try {
    const updateCart = await Cart.findByIdAndUpdate(
      { _id: cartId },
      { $set: cartFields },
      { new: true },
    );
    if (!updateCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json({
      message: "Cart updated successfully",
      cart: updateCart,
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function deleteCart(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const cartId = req.params.id;
  try {
    const deletedCart = await Cart.findOneAndDelete({ _id: cartId });

    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}
