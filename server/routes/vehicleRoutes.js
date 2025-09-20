import express from "express";
import { createVehicle, getAvailableVehicles, getVehicles } from "../controllers/vehicleController.js";

const router = express.Router();

router.post("/", createVehicle);

router.get("/available", getAvailableVehicles);

router.get("/get-vehicles", getVehicles);

export default router;
