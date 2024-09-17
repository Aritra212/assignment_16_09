import express from "express";
import colors from "colors";
// import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";
import adminRoutes from "./Routes/adminRoutes.js";
import employeeRoutes from "./Routes/employeeRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

// config env
dotenv.config();

//database config
connectDB();

// rest object
const app = express();

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

// middlewares
app.use(express.json());
app.use(morgan("dev"));
// app.use(cors(corsOpts));

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/employee", employeeRoutes);

// rest api
app.get("/", (req, res) => {
  res.status(200).send({
    status: true,
    message: "Wellcome to Backend",
  });
});

// port
const PORT = process.env.PORT;

// listen
app.listen(PORT, () => {
  console.log(`server running on port- ${PORT}`.magenta);
});
