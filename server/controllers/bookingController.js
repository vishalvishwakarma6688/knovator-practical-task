import Vehicle from "../models/Vehicle.js";
import Booking from "../models/Booking.js";

function calculateRideDuration(fromPincode, toPincode) {
    return Math.abs(parseInt(toPincode) - parseInt(fromPincode)) % 24 || 1;
}

export const createBooking = async (req, res, next) => {
    try {
        const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body;

        if (!vehicleId || !fromPincode || !toPincode || !startTime || !customerId) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        const estimatedRideDurationHours = calculateRideDuration(fromPincode, toPincode);
        const start = new Date(startTime);
        const end = new Date(start.getTime() + estimatedRideDurationHours * 60 * 60 * 1000);

        const conflict = await Booking.findOne({
            vehicle: vehicleId,
            $or: [{ startTime: { $lt: end }, endTime: { $gt: start } }]
        });

        if (conflict) {
            return res.status(409).json({ message: "Vehicle already booked for this time slot" });
        }

        const booking = await Booking.create({
            vehicle: vehicleId,
            fromPincode,
            toPincode,
            startTime: start,
            endTime: end,
            customerId
        });

        res.status(201).json(booking);
    } catch (err) {
        next(err);
    }
};


export const getBookings = async (req, res) => {
    try {
        const now = new Date();
        const bookings = await Booking.find({
            endTime: { $gte: now }
        })
            .populate("vehicle")
            .sort({ createdAt: -1 });

        res.status(200).json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};



export const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByIdAndDelete(id);

        if (!booking)
            return res.status(404).json({ message: "Booking not found" });

        res.status(200).json({ message: "Booking cancelled successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};