import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../server.js";
import Vehicle from "../models/vehicle.js";
import Booking from "../models/booking.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Vehicle.deleteMany({});
  await Booking.deleteMany({});
});

describe("Booking API", () => {
  it("should book a vehicle successfully", async () => {
    const vehicle = await Vehicle.create({
      name: "Truck A",
      capacityKg: 200,
      tyres: 6,
      vehicleType: "Truck",
      registrationNumber: "BOOK123",
      fuelType: "Diesel",
    });

    const res = await request(app).post("/api/bookings/book-vehicle").send({
      vehicleId: vehicle._id,
      fromPincode: "110001",
      toPincode: "110002",
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600000),
      customerId: "CUST001",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.vehicle).toBe(vehicle._id.toString());
  });

  it("should not allow booking a vehicle twice", async () => {
    const vehicle = await Vehicle.create({
      name: "Truck B",
      capacityKg: 250,
      tyres: 6,
      vehicleType: "Truck",
      registrationNumber: "BOOK456",
      fuelType: "Diesel",
    });

    await Booking.create({
      vehicle: vehicle._id,
      fromPincode: "110001",
      toPincode: "110002",
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600000),
      customerId: "CUST002",
    });

    const res = await request(app).post("/api/bookings/book-vehicle").send({
      vehicleId: vehicle._id,
      fromPincode: "110003",
      toPincode: "110004",
      startTime: new Date(),
      endTime: new Date(Date.now() + 7200000),
      customerId: "CUST003",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain("Vehicle is already booked");
  });

  it("should get only booked vehicles", async () => {
    const vehicle1 = await Vehicle.create({
      name: "Truck 1",
      capacityKg: 200,
      tyres: 6,
      vehicleType: "Truck",
      registrationNumber: "B1",
      fuelType: "Diesel",
    });

    const vehicle2 = await Vehicle.create({
      name: "Truck 2",
      capacityKg: 250,
      tyres: 6,
      vehicleType: "Truck",
      registrationNumber: "B2",
      fuelType: "Diesel",
    });

    await Booking.create({ vehicle: vehicle1._id, fromPincode: "1", toPincode: "2", startTime: new Date(), endTime: new Date(Date.now() + 3600000), customerId: "CUST1" });

    const res = await request(app).get("/api/vehicles/get-vehicles?booked=true");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]._id).toBe(vehicle1._id.toString());
  });
});
