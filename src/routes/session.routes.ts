import express from "express";
import {
  createSession,
  getAllSessions,
  getSingleSession,
  updateSession,
  deleteSession,
} from "../controllers/session.controller";

const router = express.Router();

router.get("/", getAllSessions);
router.get("/:id", getSingleSession);
router.post("/", createSession);
router.put("/:id", updateSession);
router.delete("/:id", deleteSession);

export default router;
