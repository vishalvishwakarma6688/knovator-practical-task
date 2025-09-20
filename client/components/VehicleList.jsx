// "use client";

// import { Truck, Hash, Clock, Circle } from "lucide-react";

// export default function VehicleList({ vehicles, estimatedRideDurationHours, onBook, isBooking }) {
//   if (!vehicles?.length) return null;

//   return (
//     <div className="mt-6">
//       <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
//         Available Vehicles
//       </h2>
//       <ul className="space-y-4">
//         {vehicles.map((v) => (
//           <li
//             key={v._id}
//             className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 shadow-sm"
//           >
//             <div className="space-y-1">
//               <p className="text-lg font-semibold flex items-center gap-2">
//                 <Truck className="w-5 h-5 text-blue-600" /> {v.name}
//               </p>
//               <p className="flex items-center gap-2">
//                 <Hash className="w-4 h-4 text-green-600" /> Capacity: {v.capacityKg} Kg
//               </p>
//               <p className="flex items-center gap-2">
//                 <Circle className="w-4 h-4 text-gray-600" /> Tyres: {v.tyres}
//               </p>
//               <p className="flex items-center gap-2">
//                 <Clock className="w-4 h-4 text-purple-600" /> Estimated Ride Duration: {estimatedRideDurationHours} hours
//               </p>
//             </div>

//             <button
//               onClick={() => onBook(v._id)}
//               disabled={isBooking}
//               className="mt-3 md:mt-0 bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//             >
//               {isBooking ? "Booking..." : "Book Now"}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { Truck, Hash, Clock, Circle } from "lucide-react";

export default function VehicleList({ vehicles, estimatedRideDurationHours, onBook }) {
  const [bookingIds, setBookingIds] = useState([]); // track booked vehicles
  const [loadingIds, setLoadingIds] = useState([]); // track currently booking

  const handleBook = async (vehicleId) => {
    setLoadingIds((prev) => [...prev, vehicleId]);
    await onBook(vehicleId); // call parent booking function
    setLoadingIds((prev) => prev.filter((id) => id !== vehicleId));
    setBookingIds((prev) => [...prev, vehicleId]); // mark as booked
  };

  if (!vehicles?.length) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
        Available Vehicles
      </h2>
      <ul className="space-y-4">
        {vehicles.map((v) => {
          const isLoading = loadingIds.includes(v._id);
          const isBooked = bookingIds.includes(v._id) || v.isBooked; // also check backend booked status
          return (
            <li
              key={v._id}
              className={`border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 shadow-sm ${isBooked ? "bg-red-50 border-red-400" : ""
                }`}
            >
              <div className="space-y-1">
                <p className="text-lg font-semibold flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-600" /> {v.name}
                </p>
                <p className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-green-600" /> Capacity: {v.capacityKg} Kg
                </p>
                <p className="flex items-center gap-2">
                  <Circle className="w-4 h-4 text-gray-600" /> Tyres: {v.tyres}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-600" /> Estimated Ride Duration: {estimatedRideDurationHours} hours
                </p>
              </div>

              <button
                onClick={() => handleBook(v._id)}
                disabled={isLoading || isBooked}
                title={isBooked ? "You have booked it already" : "Click to book the vehicle"}
                className={`mt-3 md:mt-0 cursor-pointer px-4 py-2 rounded transition ${isBooked
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
              >
                {isBooked ? "Booked" : isLoading ? "Booking..." : "Book Now"}
              </button>

            </li>
          );
        })}
      </ul>
    </div>
  );
}
