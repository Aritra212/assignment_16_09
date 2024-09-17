import express from "express";
import { createAdmin, verifyAdmin } from "../Controllers/adminControllers.js";

// router object
const router = express.Router();

// routings

// Verify Admin || Method POST
router.post("/verify", verifyAdmin);

// create Admin || Method POST
router.post("/create", createAdmin);

export default router;
