import express from "express";
import { getLocationBrandPlatforms, addLocationBrandPlatform } from "../controllers/locationBrandPlatformController.js";
import { authenticateJWT } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/location-brand-platforms:
//  Returns a list of joined data (location name, brand name, platform name, status, commission_rate, etc.).
router.get("/" ,getLocationBrandPlatforms);

//POST /api/location-brand-platforms:
//  Creates a new record in location_brand_platforms.
// added jwt to protect the route
router.post("/", authenticateJWT,addLocationBrandPlatform);

export default router;
