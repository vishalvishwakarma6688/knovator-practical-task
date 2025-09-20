import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../server.js"; // your Express app
import Vehicle from "../models/vehicle.js";

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
});

describe("Vehicle API", () => {
  it("should create a vehicle successfully", async () => {
    const res = await request(app).post("/api/vehicles/create").send({
      name: "Test Truck",
      capacityKg: 200,
      tyres: 6,
      vehicleType: "Truck",
      registrationNumber: "AB123CD",
      fuelType: "Diesel",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Test Truck");
  });

  it("should fail if capacity is less than 100Kg", async () => {
    const res = await request(app).post("/api/vehicles/create").send({
      name: "Tiny Truck",
      capacityKg: 50,
      tyres: 4,
      vehicleType: "Truck",
      registrationNumber: "XY987ZT",
      fuelType: "Diesel",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain("Capacity must be at least 100Kg");
  });

  it("should not allow duplicate registration number", async () => {
    await Vehicle.create({
      name: "Truck A",
      capacityKg: 200,
      tyres: 6,
      vehicleType: "Truck",
      registrationNumber: "DUP123",
      fuelType: "Diesel",
    });

    const res = await request(app).post("/api/vehicles/create").send({
      name: "Truck B",
      capacityKg: 250,
      tyres: 6,
      vehicleType: "Truck",
      registrationNumber: "DUP123",
      fuelType: "Diesel",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Vehicle with this registration number already exists");
  });

  it("should get all vehicles", async () => {
    await Vehicle.create([
      { name: "Truck 1", capacityKg: 200, tyres: 6, vehicleType: "Truck", registrationNumber: "T1", fuelType: "Diesel" },
      { name: "Truck 2", capacityKg: 250, tyres: 6, vehicleType: "Truck", registrationNumber: "T2", fuelType: "Diesel" },
    ]);

    const res = await request(app).get("/api/vehicles/get-vehicles");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });
});
