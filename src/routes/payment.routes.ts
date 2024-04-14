import express from "express";
import {
  createPayment,
  getAllPayments,
  getSinglePayment,
  updatePayment,
  deletePayment,
} from "../controllers/payment.controller";

const router = express.Router();

router.get("/", getAllPayments);
router.get("/:id", getSinglePayment);
router.post("/", createPayment);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

export default router;
