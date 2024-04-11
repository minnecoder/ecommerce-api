import express from "express";
import {
  createCart,
  deleteCart,
  getAllCarts,
  getSingleCart,
  updateCart,
} from "../controllers/cart.controller";

const router = express.Router();

router.get("/", getAllCarts);
router.get("/:id", getSingleCart);
router.post("/", createCart);
router.put("/:id", updateCart);
router.delete("/:id", deleteCart);

export default router;
