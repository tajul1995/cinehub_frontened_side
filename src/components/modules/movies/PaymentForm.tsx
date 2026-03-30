/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
// import { Movie } from "@/types";
import Image from "next/image";
import { Movie } from "./MovieDetails";

type Props = {
  movie: Movie;
  bookingId?: string ;
};

export default function PaymentForm({ movie, bookingId }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await fetch(
        `http://localhost:5000/api/v1/booking/initiate-payment/${bookingId}`,
        {
          method: "POST",
          credentials: "include", // IMPORTANT for auth cookies
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      console.log(data,'payment')

      if (!res.ok) {
        throw new Error(data?.message || "Payment failed");
      }

      setSuccess("Payment initiated successfully!");
      
      // If backend returns payment URL (Stripe etc.)
      if (data?.data.paymentUrl) {
        window.location.href = data?.data?.paymentUrl;
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-6 space-y-4">
      
      {/* Movie Info */}
      <div className="flex gap-4">
        <Image
          src={movie.poster}
          alt={movie.movieName}
          width={100}
          height={150}
          className="rounded-lg"
        />

        <div>
          <h2 className="text-lg font-bold">{movie.movieName}</h2>
          <p className="text-gray-500">Year: {movie.publishedYear}</p>
          <p className="text-gray-500">Duration: {movie.duration} min</p>
        </div>
      </div>

      {/* Price */}
      <div className="text-xl font-bold text-green-600">
        Price: ${movie.price}
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {/* Messages */}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
}