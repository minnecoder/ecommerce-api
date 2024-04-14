import express from "express";
import {
  createShipping,
  getAllShippings,
  getSingleShipping,
  updateShipping,
  deleteShipping,
} from "../controllers/shipping.controller";

const router = express.Router();

router.get("/", getAllShippings);
router.get("/:id", getSingleShipping);
router.post("/", createShipping);
router.put("/:id", updateShipping);
router.delete("/:id", deleteShipping);

export default router;
