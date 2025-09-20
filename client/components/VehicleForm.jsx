"use client";

import { useState } from "react";
import { FaTruck, FaCubes, FaCarSide, FaGasPump, FaClipboardList, FaRoad } from "react-icons/fa";

export default function VehicleForm({ onSubmit, isSubmitting }) {
  const [form, setForm] = useState({
    name: "",
    capacityKg: "",
    tyres: "",
    vehicleType: "",
    registrationNumber: "",
    fuelType: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: "",
      capacityKg: "",
      tyres: "",
      vehicleType: "",
      registrationNumber: "",
      fuelType: "",
    })
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white p-8 rounded-xl max-w-lg mx-auto"
    >
      {/* Vehicle Name */}
      <div className="flex items-center gap-3 border rounded-lg p-3 transition">
        <FaTruck className="w-6 h-6" />
        <input
          type="text"
          name="name"
          placeholder="Vehicle Name"
          value={form.name}
          onChange={handleChange}
          required
          className="flex-1 text-lg border-none outline-none"
        />
      </div>

      {/* Capacity */}
      <div className="flex items-center gap-3 border rounded-lg p-3 transition">
        <FaCubes className="w-6 h-6" />
        <input
          type="number"
          name="capacityKg"
          placeholder="Capacity (Kg)"
          value={form.capacityKg}
          onChange={handleChange}
          required
          className="flex-1 text-lg border-none outline-none appearance-none"
        />
      </div>

      {/* Tyres */}
      <div className="flex items-center gap-3 border rounded-lg p-3 transition">
        <FaCarSide className="w-6 h-6" />
        <input
          type="number"
          name="tyres"
          placeholder="Number of Tyres"
          value={form.tyres}
          onChange={handleChange}
          required
          className="flex-1 text-lg border-none outline-none appearance-none"
        />
      </div>

      {/* Vehicle Type */}
      <div className="flex items-center gap-3 border rounded-lg p-3 transition">
        <FaRoad className="w-6 h-6" />
        <select
          name="vehicleType"
          value={form.vehicleType}
          onChange={handleChange}
          required
          className="flex-1 text-lg border-none bg-transparent outline-none"
        >
          <option value="">Select Vehicle Type</option>
          <option value="Truck">Truck</option>
          <option value="Van">Van</option>
          <option value="Mini-Truck">Mini-Truck</option>
          <option value="Trailer">Trailer</option>
          <option value="Tempo">Tempo</option>
        </select>
      </div>

      {/* Registration Number */}
      <div className="flex items-center gap-3 border rounded-lg p-3 transition">
        <FaClipboardList className="w-6 h-6" />
        <input
          type="text"
          name="registrationNumber"
          placeholder="Registration Number"
          value={form.registrationNumber}
          onChange={handleChange}
          required
          className="flex-1 text-lg border-none outline-none"
        />
      </div>

      {/* Fuel Type */}
      <div className="flex items-center gap-3 border rounded-lg p-3 transition">
        <FaGasPump className="w-6 h-6" />
        <select
          name="fuelType"
          value={form.fuelType}
          onChange={handleChange}
          required
          className="flex-1 text-lg border-none bg-transparent outline-none"
        >
          <option value="">Select Fuel Type</option>
          <option value="Diesel">Diesel</option>
          <option value="Petrol">Petrol</option>
          <option value="Electric">Electric</option>
          <option value="CNG">CNG</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white cursor-pointer px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
      >
        {isSubmitting ? "Submitting..." : "Add Vehicle"}
      </button>
    </form>
  );
}
