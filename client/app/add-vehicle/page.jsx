"use client";

import { useMutation } from "@tanstack/react-query";
import api from "../../lib/axios";
import VehicleForm from "../../components/VehicleForm";
import { toast } from "react-hot-toast";
import { Truck } from "lucide-react";

export default function AddVehiclePage() {
  const mutation = useMutation({
    mutationFn: (newVehicle) => api.post("/vehicles", newVehicle),
    onSuccess: () => {
      toast.success("Vehicle added successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Error adding vehicle");
    },
  });

  const handleFormSubmit = (formData) => {
    mutation.mutate(formData);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center flex items-center justify-center gap-5">
        <Truck className="w-8 h-8 text-blue-600 animate-pulse" />
        Add Vehicle
      </h1>

      <VehicleForm
        onSubmit={handleFormSubmit}
        isSubmitting={mutation.isPending}
      />
    </div>
  );
}
