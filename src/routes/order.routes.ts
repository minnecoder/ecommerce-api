import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
} from "../controllers/order.controller";

const router = express.Router();

router.get("/", getAllOrders);
router.get("/:id", getSingleOrder);
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
