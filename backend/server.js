import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import locationBrandPlatformRoutes from "./routes/locationBrandPlatformRoutes.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/location-brand-platforms", locationBrandPlatformRoutes);
app.use("/api/auth", authRoutes);


pool.connect()
  .then(() => console.log("Connected to PostgreSQL successfully"))
  .catch((err) => console.error("PostgreSQL connection error:", err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
