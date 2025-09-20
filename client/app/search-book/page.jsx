"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../lib/axios";
import Loader from "../../components/Loader";
import SearchForm from "../../components/SearchForm";
import VehicleList from "@/components/VehicleList";
import { toast } from "react-hot-toast";
import { Search } from "lucide-react";

export default function SearchBookPage() {
    const [searchParams, setSearchParams] = useState({
        capacityRequired: "",
        fromPincode: "",
        toPincode: "",
        startTime: "",
    });

    const [submitted, setSubmitted] = useState(false);

    // Search query
    const { data, isFetching, error, refetch } = useQuery({
        queryKey: ["availableVehicles", searchParams],
        queryFn: async () => {
            const res = await api.get("/vehicles/available", { params: searchParams });
            return res.data;
        },
        enabled: false, // run manually on button click
        onError: (err) => {
            toast.error(err.response?.data?.message || "Search failed");
        },
    });

    // Booking mutation
    const bookingMutation = useMutation({
        mutationFn: (bookingData) => api.post("/bookings", bookingData),
        onSuccess: () => toast.success("Booking confirmed!"),
        onError: (err) =>
            toast.error(err.response?.data?.message || "Booking failed"),
    });

    const handleChange = (e) => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSubmitted(true);
        refetch();
    };

    const handleBook = (vehicleId) => {
        const { fromPincode, toPincode, startTime } = searchParams;
        bookingMutation.mutate({
            vehicleId,
            fromPincode,
            toPincode,
            startTime,
            customerId: "CUST12345", // hardcoded for now
        });
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">

            <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center flex items-center justify-center gap-5">
                <Search className="w-8 h-8 text-green-600 animate-pulse" />
                Search & Book Vehicles
            </h1>
            <SearchForm
                searchParams={searchParams}
                onChange={handleChange}
                onSubmit={handleSearch}
                isSubmitting={isFetching}
            />

            {isFetching && <Loader />}
            {typeof window !== "undefined" && data?.availableVehicles?.length > 0 && (
                <VehicleList
                    vehicles={data.availableVehicles}
                    estimatedRideDurationHours={data.estimatedRideDurationHours}
                    onBook={handleBook}
                    isBooking={bookingMutation.isPending}
                />
            )}
        </div>
    );
}
