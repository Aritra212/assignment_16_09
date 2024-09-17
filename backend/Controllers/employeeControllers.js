import { employee } from "../Models/employeeSchema.js";
import path from "path";
import fs from "fs";
import { json } from "express";
import { fileURLToPath } from "url";

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Add employee
const addEmployee = async (req, res) => {
  const { name, email, phone, designation, gender, course } = req.body;

  // File handling - image
  const image = req.file ? req.file.filename : null;

  // Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  if (!name || !email || !phone || !designation) {
    return res.status(400).json({
      status: false,
      message: "Empty Input fields",
    });
  }

  if (!gender) {
    return res.status(400).json({
      status: false,
      message: "Please select gender",
    });
  }

  if (!course) {
    return res.status(400).json({
      status: false,
      message: "Please select at least one course",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: false,
      message: "Invalid email format",
    });
  }

  if (!phoneRegex.test(phone)) {
    return res.status(400).json({
      status: false,
      message: "Invalid phone number format. It should contain 10 digits",
    });
  }

  try {
    // Check for duplicate email
    const existingEmployee = await employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({
        status: false,
        message: "The email id already exists in the database",
      });
    }

    // Create new employee
    const newEmployee = new employee({
      name,
      email,
      phone,
      designation,
      gender,
      course,
      image, // Store the filename or URL of the image here
    });

    await newEmployee.save();

    return res.status(201).json({
      status: true,
      message: "Employee added successfully",
      data: newEmployee,
    });
  } catch (error) {
    console.error("Error in adding employee:", error);
    return res.status(500).json({
      status: false,
      message: "Server error",
      error,
    });
  }
};

// Update employee
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, designation, gender, course } = req.body;

  // Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  if (!name || !email || !phone || !designation) {
    return res.status(400).send({
      status: false,
      message: "Empty input fields",
    });
  }

  if (!gender) {
    return res.status(400).send({
      status: false,
      message: "Select gender",
    });
  }

  if (!course || course.length === 0) {
    return res.status(400).send({
      status: false,
      message: "Select at least one course",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).send({
      status: false,
      message: "Invalid email format",
    });
  }

  if (!phoneRegex.test(phone)) {
    return res.status(400).send({
      status: false,
      message: "Invalid phone number format. It should contain 10 digits",
    });
  }

  try {
    // Check if employee exists
    const emp = await employee.findById(id);
    if (!emp) {
      return res.status(404).send({
        status: false,
        message: "Employee not found",
      });
    }

    // Handle image file (if any new image is uploaded)
    if (req.file) {
      // Delete previous image if exists
      if (emp.image) {
        const previousImagePath = path.join(
          __dirname,
          "..",
          "uploads",
          emp.image
        );
        fs.unlink(previousImagePath, (err) => {
          if (err) {
            console.error("Error deleting previous image:", err);
          } else {
            console.log("Previous image deleted:", emp.image);
          }
        });
      }

      // Update image field with new uploaded image filename
      emp.image = req.file.filename;
    }

    // Update other employee fields
    emp.name = name;
    emp.email = email;
    emp.phone = phone;
    emp.designation = designation;
    emp.gender = gender;
    emp.course = Array.isArray(course) ? course : JSON.parse(course); // Ensure course is an array

    await emp.save();

    return res.status(200).send({
      status: true,
      message: "Employee updated successfully",
      data: emp,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    return res.status(500).send({
      status: false,
      message: "Error updating employee",
      error,
    });
  }
};

// Delete employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params; // Get employee ID from request params

  try {
    // Find the employee by ID
    const emp = await employee.findById(id);

    if (!emp) {
      return res.status(404).json({
        status: false,
        message: "Employee not found",
      });
    }

    // Get the image filename from the employee object
    const imageFileName = emp.image;

    // Delete the employee from the database
    await employee.findByIdAndDelete(id);

    // If the employee has an image, remove it from the server
    if (imageFileName) {
      const imagePath = path.join(__dirname, "../uploads", imageFileName);

      // Check if the image file exists and then delete it
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Failed to delete image: ${imagePath}`, err);
          return res.status(500).json({
            status: false,
            message: "Employee deleted, but failed to delete the image",
            error: err,
          });
        }

        console.log(`Image deleted: ${imagePath}`);
      });
    }

    // Send success response
    return res.status(200).json({
      status: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleting employee:", error);
    return res.status(500).json({
      status: false,
      message: "Error in deletion of Employee ",
      error,
    });
  }
};

// Get employees by search values (phone, email, or name)
const searchEmployees = async (req, res) => {
  const { phone, email, name } = req.query;

  try {
    // Build search query
    const query = {};
    if (phone) query.phone = phone;
    if (email) query.email = email;
    if (name) query.name = new RegExp(name, "i"); // Case-insensitive search

    // Find employees
    const employees = await employee.find(query);

    if (employees.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No employees found",
      });
    }

    // Construct image URLs
    const imageBaseUrl = `http://localhost:${process.env.PORT}/uploads/`;
    const employeesWithImageUrl = employees.map((emp) => {
      return {
        ...emp.toObject(), // Convert mongoose document to plain object
        image: emp.image ? `${imageBaseUrl}${emp.image}` : null, // Add image URL if available
      };
    });

    return res.status(200).json({
      status: true,
      message: "Employees found",
      data: employeesWithImageUrl,
    });
  } catch (error) {
    console.error("Error in searching employees:", error);
    return res.status(500).json({
      status: false,
      message: "Server error",
      error,
    });
  }
};

export { addEmployee, updateEmployee, deleteEmployee, searchEmployees };
