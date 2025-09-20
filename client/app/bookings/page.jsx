"use client"

import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get("/bookings/get-bookings");
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      await api.delete(`/bookings/${id}`);
      toast.success("Booking cancelled");
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      toast.error("Failed to cancel booking");
    }
  };

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
      <ul className="space-y-4">
        {bookings.map((b) => (
          <li
            key={b._id}
            className="border p-4 rounded flex justify-between items-center bg-gray-50 shadow-sm"
          >
            <div>
              <p>Vehicle: {b.vehicle.name}</p>
              <p>From: {b.fromPincode}</p>
              <p>To: {b.toPincode}</p>
              <p>Start: {new Date(b.startTime).toLocaleString()}</p>
              <p>End: {new Date(b.endTime).toLocaleString()}</p>
            </div>
            <button
              onClick={() => handleCancel(b._id)}
              className="bg-red-600 cursor-pointer px-3 py-1 text-white rounded hover:bg-red-700"
            >
              Cancel
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
