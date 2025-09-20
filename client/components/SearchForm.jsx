"use client";

import { useState } from "react";
import { FaCubes, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SearchForm({ searchParams, onChange, onSubmit, isSubmitting }) {
  const [localParams, setLocalParams] = useState({
    ...searchParams,
    startTime: searchParams.startTime ? new Date(searchParams.startTime) : null,
  });

  const handleChange = (e) => {
    setLocalParams({ ...localParams, [e.target.name]: e.target.value });
    onChange(e);
  };

  const handleDateChange = (date) => {
    setLocalParams({ ...localParams, startTime: date });
    onChange({ target: { name: "startTime", value: date.toISOString() } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { capacityRequired, fromPincode, toPincode, startTime } = localParams;
    if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
      toast.error("Please fill in all fields");
      return;
    }
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-8 rounded-xl max-w-lg mx-auto">
      {/* Capacity */}
      <div className="flex items-center gap-3 border rounded-lg p-3 transition">
        <FaCubes className="w-6 h-6" />
        <input
          type="number"
          name="capacityRequired"
          placeholder="Capacity Required"
          value={localParams.capacityRequired}
          onChange={handleChange}
          required
          className="flex-1 text-lg border-none outline-none appearance-none"
        />
      </div>

      {/* From Pincode */}
      <div className="flex items-center gap-3 border rounded-lg p-3 transition">
        <FaMapMarkerAlt className="w-6 h-6" />
        <input
          type="text"
          name="fromPincode"
          placeholder="From Pincode"
          value={localParams.fromPincode}
          onChange={handleChange}
          required
          className="flex-1 text-lg border-none outline-none"
        />
      </div>

      {/* To Pincode */}
      <div className="flex items-center gap-3 border rounded-lg p-3 transition">
        <FaMapMarkerAlt className="w-6 h-6" />
        <input
          type="text"
          name="toPincode"
          placeholder="To Pincode"
          value={localParams.toPincode}
          onChange={handleChange}
          required
          className="flex-1 text-lg border-none outline-none"
        />
      </div>
      <div className="flex items-center gap-3 border rounded-lg p-3 transition">
        <FaCalendarAlt className="w-6 h-6" />
        <DatePicker
          selected={localParams.startTime}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          placeholderText="Select Date & Time"
          className="flex-1 text-lg border-none outline-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-600 cursor-pointer text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition-transform transform hover:scale-105"
      >
        {isSubmitting ? "Searching..." : "Search Availability"}
      </button>
    </form>
  );
}
