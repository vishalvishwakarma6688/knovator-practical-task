// "use client";

// import { useQuery } from "@tanstack/react-query";
// import api from "../../lib/axios";
// import { FaTruck, FaClipboard } from "react-icons/fa";
// import Loader from "../../components/Loader";

// export default function VehiclesListPage() {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["vehicles"],
//     queryFn: async () => {
//       const res = await api.get("/vehicles/get-vehicles");
//       return res.data;
//     },
//   });

//   if (isLoading) return <Loader />;
//   if (error) return <p className="text-red-600">Error loading vehicles</p>;

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//       <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
//         <FaTruck className="w-6 h-6" /> Vehicles Overview
//       </h1>

//       <ul className="space-y-4">
//         {data?.length ? (
//           data.map((v) => (
//             <li
//               key={v._id}
//               className="border p-4 rounded flex justify-between items-center"
//             >
//               <div>
//                 <p><b>{v.name}</b></p>
//                 <p>Capacity: {v.capacityKg} Kg</p>
//                 <p>Tyres: {v.tyres}</p>
//                 <p>Type: {v.vehicleType}</p>
//                 <p>Fuel: {v.fuelType}</p>
//                 {v.isBooked && <p className="text-red-600 font-bold">Booked</p>}
//               </div>
//               <FaClipboard className="w-6 h-6 text-gray-600" />
//             </li>
//           ))
//         ) : (
//           <p className="text-gray-600">No vehicles found.</p>
//         )}
//       </ul>
//     </div>
//   );
// }


"use client";

import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axios";
import { Truck, ClipboardList } from "lucide-react";
import Loader from "../../components/Loader";

export default function VehiclesListPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const res = await api.get("/vehicles/get-vehicles"); // fetch all
      const vehicles = res.data;

      // Mark which vehicles are booked
      const bookingsRes = await api.get("/vehicles/get-vehicles?booked=true");
      const bookedIds = bookingsRes.data.map(v => v._id);

      return vehicles.map(v => ({ ...v, isBooked: bookedIds.includes(v._id) }));
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-600">Error loading vehicles</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Truck className="w-6 h-6" /> Vehicles Overview
      </h1>

      <ul className="space-y-4">
        {data?.length ? (
          data.map((v) => (
            <li
              key={v._id}
              className={`border p-4 rounded flex justify-between items-center ${
                v.isBooked ? "bg-red-50 border-red-400" : ""
              }`}
            >
              <div>
                <p><b>{v.name}</b></p>
                <p>Capacity: {v.capacityKg} Kg</p>
                <p>Tyres: {v.tyres}</p>
                <p>Type: {v.vehicleType}</p>
                <p>Fuel: {v.fuelType}</p>
                {v.isBooked && <p className="text-red-600 font-bold">Booked</p>}
              </div>
              <ClipboardList className="w-6 h-6 text-gray-600" />
            </li>
          ))
        ) : (
          <p className="text-gray-600">No vehicles found.</p>
        )}
      </ul>
    </div>
  );
}
