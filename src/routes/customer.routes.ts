import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getSingleCustomer,
  updateCustomer,
} from "../controllers/customer.controller";
const router = express.Router();

router.get("/", getAllCustomers);
router.get("/:id", getSingleCustomer);
router.post("/", createCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;
