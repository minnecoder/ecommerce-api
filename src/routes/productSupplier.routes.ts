import express from "express";
import {
  createProductSupplier,
  getAllProductSuppliers,
  getSingleProductSupplier,
  updateProductSupplier,
  deleteProductSupplier,
} from "../controllers/productSupplier.controller";

const router = express.Router();

router.get("/", getAllProductSuppliers);
router.get("/:id", getSingleProductSupplier);
router.post("/", createProductSupplier);
router.put("/:id", updateProductSupplier);
router.delete("/:id", deleteProductSupplier);

export default router;
