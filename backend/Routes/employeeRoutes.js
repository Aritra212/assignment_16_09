import express from "express";
import {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees,
} from "../Controllers/employeeControllers.js";
import upload from "../Middleware/multer.js";

// router object
const router = express.Router();

//routings

// Add employee || Method POST
router.post("/add", upload.single("image"), addEmployee);

// Update employee || Method POST
router.put("/update/:id", upload.single("image"), updateEmployee);

// Delete employee || Method DELETE
router.delete("/delete/:id", deleteEmployee);

// Search employees || Method GET
router.get("/search", searchEmployees);

export default router;
