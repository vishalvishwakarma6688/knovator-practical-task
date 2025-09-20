import Vehicle from "../models/Vehicle.js";
import Booking from "../models/Booking.js";

export const createVehicle = async (req, res, next) => {
  try {
    const {
      name,
      capacityKg,
      tyres,
      vehicleType,
      registrationNumber,
      fuelType,
    } = req.body;

    if (!name || !capacityKg || !tyres || !vehicleType || !registrationNumber || !fuelType) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const vehicle = await Vehicle.create({
      name,
      capacityKg,
      tyres,
      vehicleType,
      registrationNumber,
      fuelType,
    });

    res.status(201).json(vehicle);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Vehicle with this registration number already exists" });
    }
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    next(err);
  }
};


function calculateRideDuration(fromPincode, toPincode) {
  const diff = Math.abs(
    parseInt(fromPincode.slice(-3)) - parseInt(toPincode.slice(-3))
  );
  return Math.max(1, diff);
}

export const getAvailableVehicles = async (req, res, next) => {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query;

    if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
      return res.status(400).json({ message: "All query params are required" });
    }
    const rideDurationHours = calculateRideDuration(fromPincode, toPincode);
    const start = new Date(startTime);
    const end = new Date(start.getTime() + rideDurationHours * 60 * 60 * 1000);
    const vehicles = await Vehicle.find({
      capacityKg: { $gte: capacityRequired },
      availabilityStatus: "available",
    });
    const availableVehicles = [];
    for (let vehicle of vehicles) {
      const overlappingBooking = await Booking.findOne({
        vehicle: vehicle._id,
        $or: [
          { startTime: { $lt: end }, endTime: { $gt: start } }
        ],
      });
      if (!overlappingBooking) {
        availableVehicles.push(vehicle);
      }
    }
    res.status(200).json({
      estimatedRideDurationHours: rideDurationHours,
      availableVehicles,
    });
  } catch (err) {
    next(err);
  }
};


export const getVehicles = async (req, res) => {
  try {
    const { booked } = req.query;

    if (booked === "true") {
      const bookings = await Booking.find().populate("vehicle");
      const bookedVehicles = bookings.map(b => b.vehicle);
      return res.status(200).json(bookedVehicles);
    }

    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
