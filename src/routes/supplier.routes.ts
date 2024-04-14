import express from "express";
import {
  createSupplier,
  getAllSuppliers,
  getSingleSupplier,
  updateSupplier,
  deleteSupplier,
} from "../controllers/supplier.controller";

const router = express.Router();

router.get("/", getAllSuppliers);
router.get("/:id", getSingleSupplier);
router.post("/", createSupplier);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

export default router;
