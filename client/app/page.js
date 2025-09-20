"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Truck, PlusCircle, Search, List } from "lucide-react";
import PageLoader from "../components/PageLoader";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNavigation = (href) => {
    setLoading(true);
    router.push(href);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center bg-gray-50 relative">
      {loading && <PageLoader />}

      <Truck className="w-20 h-20 text-blue-600 mb-4 animate-bounce" />
      <h1 className="text-4xl font-bold mb-4 text-gray-800">FleetLink</h1>
      <p className="mb-8 text-gray-600 max-w-xl">
        Manage and book logistics vehicles for your business with ease.
      </p>

      <div className="flex gap-6">
        <button
          onClick={() => handleNavigation("/add-vehicle")}
          className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <PlusCircle className="w-5 h-5" />
          Add Vehicle
        </button>

        <button
          onClick={() => handleNavigation("/search-book")}
          className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          <Search className="w-5 h-5" />
          Search & Book
        </button>

        <button
          onClick={() => handleNavigation("/vehicles-list")}
          className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          <List className="w-5 h-5" />
          Vehicles Overview
        </button>
        <button
          onClick={() => handleNavigation("/bookings")}
          className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <List className="w-5 h-5" />
          View & Cancel Bookings
        </button>

      </div>
    </div>
  );
}
