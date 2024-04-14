import express from "express";
import {
  createOrderProduct,
  getAllOrderProducts,
  getSingleOrderProduct,
  updateOrderProduct,
  deleteOrderProduct,
} from "../controllers/orderProduct.controller";

const router = express.Router();

router.get("/", getAllOrderProducts);
router.get("/:id", getSingleOrderProduct);
router.post("/", createOrderProduct);
router.put("/:id", updateOrderProduct);
router.delete("/:id", deleteOrderProduct);

export default router;
