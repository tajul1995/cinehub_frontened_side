"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Movie } from "./MovieDetails";

export default function PaymentForm({
  movie,
  bookingId,
}: {
  movie: Movie;
  bookingId: string;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePayment = async () => {
    if (loading) return; 

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await fetch(
        `http://localhost:5000/api/v1/booking/${bookingId}`,
        {
          method: "PATCH",
          credentials: "include", 
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      console.log("PAYMENT RESPONSE:", data);

      if (!res.ok) {
        throw new Error(data?.message || "Payment failed for Admin ");
      }

      setSuccess("Payment successful! Redirecting...");

      // ✅ Redirect after success
      setTimeout(() => {
        router.replace("/dashboard/paymentHistory"); // better than push
      }, 1200);

    } catch (err: any) {
      console.error("PAYMENT ERROR:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-4 sm:p-6 space-y-4">

      {/* Movie Info */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Image
          src={movie.poster}
          alt={movie.movieName}
          width={100}
          height={150}
          className="rounded-lg w-full sm:w-[100px] object-cover"
        />

        <div>
          <h2 className="text-lg font-bold">{movie.movieName}</h2>
          <p className="text-gray-500 text-sm">
            Year: {movie.publishedYear}
          </p>
          <p className="text-gray-500 text-sm">
            Duration: {movie.duration} min
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="text-lg sm:text-xl font-bold text-green-600">
        Price: ${movie.price}
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm break-words">{error}</p>
      )}

      {/* Success */}
      {success && (
        <p className="text-green-500 text-sm">{success}</p>
      )}
    </div>
  );
}