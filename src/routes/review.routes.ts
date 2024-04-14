import express from "express";
import {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} from "../controllers/review.controller";

const router = express.Router();

router.get("/", getAllReviews);
router.get("/:id", getSingleReview);
router.post("/", createReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
