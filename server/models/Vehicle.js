import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vehicle name is required"],
      trim: true,
    },
    capacityKg: {
      type: Number,
      required: [true, "Capacity (Kg) is required"],
      min: [100, "Capacity must be at least 100Kg"],
    },
    tyres: {
      type: Number,
      required: [true, "Number of tyres is required"],
      min: [2, "A vehicle must have at least 2 tyres"],
    },
    vehicleType: {
      type: String,
      enum: ["Truck", "Van", "Mini-Truck", "Trailer", "Tempo"],
      required: [true, "Vehicle type is required"],
    },
    registrationNumber: {
      type: String,
      required: [true, "Registration number is required"],
      unique: true,
      uppercase: true,
    },
    availabilityStatus: {
      type: String,
      enum: ["available", "booked", "maintenance"],
      default: "available",
    },
    fuelType: {
      type: String,
      enum: ["Diesel", "Petrol", "Electric", "CNG"],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
